import React, { createContext, useContext, useEffect, useState } from "react";
import { uid } from "uid";
import { useNavigate } from "react-router-dom";
import moment from "moment";

interface TaskData {
  title: string;
  isCompleted: boolean;
  priorityLevel: number;
  complexityLevel: number;
  dueDate: string;
  dueTime: string;
  subtasks: SubtaskData[];
  tags: string[];
  id: string;
}

interface SubtaskData {
  subtask: string;
  isCompleted: boolean;
  id: string;
}

type TaskContextProps = {
  tasks: TaskData[];
  addTask: (task: TaskData) => void;
  editTask: (task: TaskData, updatedTask: TaskData) => void;
  completeTask: (task: TaskData) => void;
  completeSubtask: (task: TaskData, subtask: SubtaskData) => void;
  repeatSubtasks: (task: TaskData) => void;
  removeTask: (task: TaskData) => void;
  getTask: (id: string) => TaskData | undefined;
  checkDueDate: (dueDate: string, lightColor: boolean) => string;
  getCompletedSubtasksPercentage: (subtasks: SubtaskData[]) => string;
  getTaskTags: () => string[];
  sortTasks: (tasks: TaskData[], sort: string[]) => TaskData[];
};

export const TaskContext = createContext<TaskContextProps | undefined>(
  undefined
);

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const storedTasksRaw = localStorage.getItem("tasks");
  const storedTasks: TaskData[] = storedTasksRaw
    ? JSON.parse(storedTasksRaw)
    : [];
  const [tasks, setTasks] = useState<TaskData[]>(storedTasks);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = ({
    title,
    priorityLevel,
    complexityLevel,
    dueDate,
    dueTime,
    subtasks,
    tags,
  }: TaskData) => {
    const newTasks = [
      ...tasks,
      {
        title,
        isCompleted: false,
        priorityLevel: priorityLevel,
        complexityLevel: complexityLevel,
        dueDate: dueDate,
        dueTime: dueTime,
        subtasks: subtasks,
        tags: tags,
        id: uid(),
      },
    ];
    setTasks(newTasks);
    navigate("/");
  };

  const editTask = (
    task: TaskData,
    {
      title,
      priorityLevel,
      complexityLevel,
      dueDate,
      dueTime,
      subtasks,
      tags,
    }: TaskData
  ) => {
    setTasks((tasks: TaskData[]) =>
      tasks.map((t) =>
        t.id === task.id
          ? {
              ...t,
              title,
              priorityLevel: priorityLevel,
              complexityLevel: complexityLevel,
              dueDate: dueDate,
              dueTime: dueTime,
              subtasks: subtasks,
              tags: tags,
            }
          : t
      )
    );
    navigate("/");
  };

  const completeTask = (task: TaskData) => {
    setTasks((tasks: TaskData[]) =>
      tasks.map((t) =>
        t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  const completeSubtask = (task: TaskData, subtask: SubtaskData) => {
    const newTasks = tasks.map((t: TaskData) => {
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

  const repeatSubtasks = (task: TaskData) => {
    const newTasks: TaskData[] = tasks.map((t) => {
      if (t.id === task.id) {
        const subtasks = t.subtasks.map(
          (s: SubtaskData) => s && { ...s, isCompleted: false }
        );
        return { ...t, subtasks };
      }
      return t;
    });
    setTasks(newTasks);
  };

  const removeTask = (task: TaskData) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
    navigate("/");
  };

  const getTask = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  const checkDueDate = (dueDate: string, lightColor: boolean) => {
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

  const getCompletedSubtasksPercentage = (subtasks: SubtaskData[]) => {
    if (subtasks === undefined || subtasks.length == 0) return "0";

    const completedCount = subtasks.filter(
      (s) => s.isCompleted === true
    ).length;

    return `${Math.floor((completedCount / subtasks.length) * 100)}`;
  };

  const getTaskTags = () => {
    const uniqueTags = tasks
      .filter((t: TaskData) => t.tags)
      .map((t: TaskData) => t.tags)
      .flat();
    return [...new Set(uniqueTags)];
  };

  const sortTasks = (tasks: TaskData[], sort: string[]) => {
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
