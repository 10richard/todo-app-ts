import { Link } from "react-router-dom";
import { useTask } from "../contexts/taskContext";
import TaskTags from "./TaskTags";
import TaskLevels from "./TaskLevels";
import TaskDueDate from "./TaskDueDate";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Task = ({ task }) => {
  const { completeTask, checkDueDate, getCompletedSubtasksPercentage } =
    useTask();
  const normalColor = checkDueDate(task.dueDate, false);
  const lightColor = checkDueDate(task.dueDate, true);
  const percentCompleted = getCompletedSubtasksPercentage(task.subtasks);

  return (
    <div
      className={`flex flex-col rounded-2xl relative max-w-[500px] w-5/6 ${
        task.isCompleted ? "bg-[#E1EBF6]" : "bg-white"
      }`}
    >
      <Link to={`/task/${task.id}`} className="flex flex-col gap-3 px-3 py-5">
        <div className="flex items-center gap-2">
          <span
            className="w-[18px] h-[18px] rounded-full block"
            style={{ backgroundColor: normalColor }}
          ></span>
          <h1 className="font-semibold">{task.title}</h1>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <TaskDueDate
            date={task.dueDate}
            time={task.dueTime}
            color={normalColor}
          />
          <TaskLevels category={"Priority"} level={task.priorityLevel} />
          <TaskLevels category={"Complexity"} level={task.complexityLevel} />
        </div>
        <TaskTags tags={task.tags} color={lightColor} />
      </Link>
      <div className="flex gap-5 absolute top-5 right-5 z-20">
        <Link
          to={`/task/edit/${task.id}`}
          className="p-2 rounded-full"
          style={{ backgroundColor: lightColor }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </Link>
        <button
          onClick={() => completeTask(task)}
          className="p-2 rounded-full"
          style={{ backgroundColor: lightColor }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </button>
      </div>
      <div className="absolute right-8 bottom-10 w-11 h-11">
        <CircularProgressbar
          value={percentCompleted}
          text={`${percentCompleted}%`}
          styles={{
            path: {
              stroke: normalColor,
            },
            trail: {
              stroke: lightColor,
            },
            text: {
              fill: normalColor,
              fontSize: "25px",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Task;
