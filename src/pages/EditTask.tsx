import TaskForm from "../components/TaskForm";
import { useParams } from "react-router-dom";
import { useTask } from "../contexts/taskContext";

const EditTask = () => {
  const { id } = useParams<string>();
  const { getTask } = useTask();
  const task = id ? getTask(id) : null;

  return (
    <div className="flex flex-col items-center">
      <TaskForm heading={"Edit Task"} task={task} />
    </div>
  );
};

export default EditTask;
