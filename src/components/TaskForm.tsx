import { useState } from "react";
import { useTask } from "../contexts/taskContext";
import { Link } from "react-router-dom";
import { uid } from "uid";
import FormLevelsContainer from "./FormLevelsContainer";
import FormInputContainer from "./FormInputContainer";
import FormSubtasks from "./FormSubtasks";
import FormDueDate from "./FormDueDate";

interface TaskData {
  title: string;
  isCompleted: boolean;
  priorityLevel: number;
  complexityLevel: number;
  dueDate: string;
  dueTime: string;
  subtasks: { subtask: string; isCompleted: boolean; id: string }[];
  tags: string[];
  id: string;
}

interface SubtaskData {
  subtask: string;
  isCompleted: boolean;
  id: string;
}

interface TaskFormProps {
  heading: string;
  task?: TaskData | null;
}

const TaskForm = ({ heading, task }: TaskFormProps) => {
  const [title, setTitle] = useState<string>(!task ? "" : task.title);
  const [priority, setPriority] = useState<number>(
    !task ? 0 : task.priorityLevel
  );
  const [complexity, setComplexity] = useState<number>(
    !task ? 0 : task.complexityLevel
  );
  const [dueDate, setDueDate] = useState<string>(!task ? "" : task.dueDate);
  const [dueTime, setDueTime] = useState<string>(
    !task || task.dueTime === "" ? "00:00" : task.dueTime
  );
  const [subtasks, setSubtasks] = useState<SubtaskData[]>(
    !task ? [] : task.subtasks
  );
  const [tags, setTags] = useState<string[]>(!task ? [] : task.tags);

  const { addTask, editTask } = useTask();

  const handleSubmit = () => {
    if (!title) return;

    const taskData: TaskData = {
      title,
      priorityLevel: priority,
      complexityLevel: complexity,
      dueDate,
      dueTime,
      subtasks,
      tags,
      isCompleted: false,
      id: uid(),
    };

    !task ? addTask(taskData) : editTask(task, taskData);
  };

  const handlePriorityLevel = (val: number) => {
    setPriority(val);
  };

  const handleComplexityLevel = (val: number) => {
    setComplexity(val);
  };

  const handleAddSubtask = (subtask: string) => {
    if (!subtask) return;

    const newSubtasks = [
      ...subtasks,
      { subtask: subtask, isCompleted: false, id: uid() },
    ];
    setSubtasks(newSubtasks);
  };

  const handleRemoveSubtask = (id: string) => {
    setSubtasks(subtasks.filter((s) => s.id !== id));
  };

  const handleEditSubtask = (id: string, value: string) => {
    setSubtasks((subtasks) =>
      subtasks.map((s) => (s.id === id ? { ...s, subtask: value } : s))
    );
  };

  const handleTags = (val: string[]) => {
    setTags(val.toString().split(", "));
  };

  return (
    <div className="max-w-[600px] w-5/6 flex flex-col items-center my-16">
      <div className="flex justify-center items-center mb-7 w-full relative">
        <Link to="/" className="bg-white p-3 rounded-full absolute left-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
        <h1 className="text-2xl mx-auto">{heading}</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-8"
      >
        <FormInputContainer
          heading={"Task Name"}
          value={title}
          handleChange={setTitle}
          placeholder={"Name of task..."}
        />
        <FormLevelsContainer
          category={"Select Priority Level"}
          handleChange={handlePriorityLevel}
          value={priority}
        />
        <FormLevelsContainer
          category={"Select Complexity Level"}
          handleChange={handleComplexityLevel}
          value={complexity}
        />
        <FormDueDate
          date={dueDate}
          handleDate={setDueDate}
          time={dueTime}
          handleTime={setDueTime}
        />
        <FormSubtasks
          subtasks={subtasks}
          handleAdd={handleAddSubtask}
          handleEdit={(id, value) => handleEditSubtask(id, value)}
          handleRemove={handleRemoveSubtask}
        />
        <FormInputContainer
          heading={"Subtasks"}
          value={!tags ? "" : tags.join(", ")}
          handleChange={(val) => handleTags(val.split(", "))}
          placeholder={"Tag1, Tag2, Tag3, ..."}
        />
        <button
          type="submit"
          className="text-white text-lg text-center leading-[60px] bg-[#0A99FE] w-[192px] h-[60px] rounded-[90px]"
        >
          Save Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
