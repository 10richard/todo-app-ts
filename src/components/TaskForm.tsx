import { useState } from "react";
import { useTask } from "../contexts/taskContext";
import { Link } from "react-router-dom";
import { uid } from "uid";
import FormLevelsContainer from "./FormLevelsContainer";
import FormInputContainer from "./FormInputContainer";
import FormSubtasks from "./FormSubtasks";
import FormDueDate from "./FormDueDate";

const TaskForm = ({ heading, task }) => {
  const [title, setTitle] = useState(!task ? "" : task.title);
  const [priority, setPriority] = useState(!task ? 0 : task.priorityLevel);
  const [complexity, setComplexity] = useState(
    !task ? 0 : task.complexityLevel
  );
  const [dueDate, setDueDate] = useState(!task ? "" : task.dueDate);
  const [dueTime, setDueTime] = useState(
    !task || task.dueTime === "" ? "00:00" : task.dueTime
  );
  const [subtasks, setSubtasks] = useState(!task ? [] : task.subtasks);
  const [tags, setTags] = useState(!task ? [] : task.tags);

  const { addTask, editTask } = useTask();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    !task
      ? addTask(title, priority, complexity, dueDate, dueTime, subtasks, tags)
      : editTask(
          task,
          title,
          priority,
          complexity,
          dueDate,
          dueTime,
          subtasks,
          tags
        );
  };

  const handlePriorityLevel = (val) => {
    setPriority(val);
  };

  const handleComplexityLevel = (val) => {
    setComplexity(val);
  };

  const handleAddSubtask = (subtask) => {
    if (!subtask) return;

    const newSubtasks = [
      ...subtasks,
      { subtask: subtask, isCompleted: false, id: uid() },
    ];
    setSubtasks(newSubtasks);
  };

  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter((s) => s.id !== id));
  };

  const handleEditSubtask = (id, value) => {
    setSubtasks((subtasks) =>
      subtasks.map((s) => (s.id === id ? { subtask: value } : s))
    );
  };

  const handleTags = (val) => {
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
          handleEdit={handleEditSubtask}
          handleRemove={handleRemoveSubtask}
        />
        <FormInputContainer
          heading={"Subtasks"}
          value={!tags ? "" : tags.join(", ")}
          handleChange={handleTags}
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
