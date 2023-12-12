import { useTask } from "../contexts/taskContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import TaskDueDate from "../components/TaskDueDate";
import TaskLevels from "../components/TaskLevels";
import TaskSubtasks from "../components/TaskSubtasks";
import ProgressBar from "../components/ProgressBar";

const TaskDetails = () => {
  const { id } = useParams();
  const { completeSubtask, removeTask, repeatSubtasks, getTask, checkDueDate } =
    useTask();
  const task = getTask(id);

  if (!task) {
    return (
      <div>
        <h1>No task found!</h1>
        <Link to="/">Back</Link>
        <Link to="/task/new" className="border-2">
          Create a task
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center my-16">
      <div className="flex flex-col gap-7 max-w-[550px] w-full mx-auto">
        <Header heading={"Task Details"} task={task} />
        <div className="flex flex-col gap-7 p-6 rounded-3xl bg-white">
          <div className="flex items-center gap-2">
            <span
              className="w-[18px] h-[18px] rounded-full block"
              style={{ backgroundColor: checkDueDate(task.dueDate, false) }}
            ></span>
            <h1 className="font-bold text-xl">{task.title}</h1>
          </div>
          <TaskDueDate
            date={task.dueDate}
            time={task.dueTime}
            color={checkDueDate(task.dueDate, false)}
          />
          <TaskLevels category={"Priority"} level={task.priorityLevel} />
          <TaskLevels category={"Complexity"} level={task.complexityLevel} />
          <ProgressBar
            subtasks={task.subtasks}
            color={checkDueDate(task.dueDate, false)}
          />
        </div>
        <TaskSubtasks
          task={task}
          subtasks={task.subtasks}
          completeSubtask={completeSubtask}
        />
        <div className="flex flex-col gap-6">
          <button
            className="bg-[#0D99FF] rounded-[120px] flex justify-center gap-3 text-white py-[18px]"
            onClick={() => repeatSubtasks(task)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M1 4V10H7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23 20V14H17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.49 8.99995C19.9828 7.56674 19.1209 6.28536 17.9845 5.27537C16.8482 4.26539 15.4745 3.55972 13.9917 3.22421C12.5089 2.8887 10.9652 2.93429 9.50481 3.35673C8.04437 3.77916 6.71475 4.56467 5.64 5.63995L1 9.99995M23 14L18.36 18.36C17.2853 19.4352 15.9556 20.2207 14.4952 20.6432C13.0348 21.0656 11.4911 21.1112 10.0083 20.7757C8.52547 20.4402 7.1518 19.7345 6.01547 18.7245C4.87913 17.7145 4.01717 16.4332 3.51 15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            REPEAT TASKS
          </button>
          <button
            className="bg-[#FFE0DE] rounded-[120px] flex justify-center gap-3 py-[18px]"
            onClick={() => removeTask(task)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 6H5H21"
                stroke="#090003"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                stroke="#090003"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
