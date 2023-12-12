import { createContext, useContext, useEffect, useState } from "react";
import { uid } from "uid";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const TaskContext = createContext();

export function useTask() {
  return useContext(TaskContext);
}

export const TaskProvider = ({ children }) => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(storedTasks);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, priority, complexity, date, time, subtasks, tags) => {
    const newTasks = [
      ...tasks,
      {
        title,
        isCompleted: false,
        priorityLevel: priority,
        complexityLevel: complexity,
        dueDate: date,
        dueTime: time,
        subtasks: subtasks,
        tags: tags,
        id: uid(),
      },
    ];
    setTasks(newTasks);
    navigate("/");
  };

  const editTask = (
    task,
    title,
    priority,
    complexity,
    date,
    time,
    subtasks,
    tags
  ) => {
    setTasks((tasks) =>
      tasks.map((t) =>
        t.id === task.id
          ? {
              ...t,
              title,
              priorityLevel: priority,
              complexityLevel: complexity,
              dueDate: date,
              dueTime: time,
              subtasks: subtasks,
              tags: tags,
            }
          : t
      )
    );
    navigate("/");
  };

  const completeTask = (task) => {
    setTasks((tasks) =>
      tasks.map((t) =>
        t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  const completeSubtask = (task, subtask) => {
    const newTasks = tasks.map((t) => {
      if (t.id === task.id) {
        const subtasks = t.subtasks.map((s) =>
          s.id === subtask.id ? { ...s, isCompleted: !s.isCompleted } : s
        );
        return { ...t, subtasks };
      }
      return t;
    });
    setTasks(newTasks);
  };

  const repeatSubtasks = (task) => {
    const newTasks = tasks.map((t) => {
      if (t.id === task.id) {
        const subtasks = t.subtasks.map((s) =>
          s ? { ...s, isCompleted: false } : ""
        );
        return { ...t, subtasks };
      }
      return t;
    });
    setTasks(newTasks);
  };

  const removeTask = (task) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
    navigate("/");
  };

  const getTask = (id) => {
    return tasks.find((task) => task.id === id);
  };

  const checkDueDate = (dueDate, lightColor) => {
    const taskDueDate = moment(dueDate, "YYYY-MM-DD");
    const currentDate = moment();
    const difference = taskDueDate.diff(currentDate, "days");

    if (difference <= 0) {
      return lightColor ? "#FFECEB" : "#FF4034";
    } else if (difference <= 3) {
      return lightColor ? "#FFF2E9" : "#FE7E08";
    }
    return lightColor ? "#D6EAFF" : "#51AEFF";
  };

  const getCompletedSubtasksPercentage = (subtasks) => {
    if (subtasks === undefined || subtasks.length == 0) return "0";

    const completedCount = subtasks.filter(
      (s) => s.isCompleted === true
    ).length;

    return `${Math.floor((completedCount / subtasks.length) * 100)}`;
  };

  const getTaskTags = () => {
    const uniqueTags = tasks
      .filter((t) => t.tags)
      .map((t) => t.tags)
      .flat();
    return [...new Set(uniqueTags)];
  };

  const sortTasks = (tasks, sort) => {
    let sortOrder = tasks;

    if (sort[1] === "Date") {
      sortOrder = tasks.sort(
        (a, b) => Date.parse(b.dueDate) - Date.parse(a.dueDate)
      );
    } else if (sort[1] === "Priority") {
      sortOrder = tasks.sort((a, b) => b.priorityLevel - a.priorityLevel);
    } else if (sort[1] === "Complexity") {
      sortOrder = tasks.sort((a, b) => b.complexityLevel - a.complexityLevel);
    }

    sort[0] === "Ascending" ? sortOrder : sortOrder.reverse();
    return sortOrder;
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        completeTask,
        completeSubtask,
        repeatSubtasks,
        removeTask,
        getTask,
        checkDueDate,
        getCompletedSubtasksPercentage,
        getTaskTags,
        sortTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
