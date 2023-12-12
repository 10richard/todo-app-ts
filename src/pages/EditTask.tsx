import TaskForm from "../components/TaskForm";
import { useParams } from "react-router-dom";
import { useTask } from "../contexts/taskContext";

const EditTask = () => {
  const { id } = useParams();
  const { getTask } = useTask();
  const task = getTask(id);

  return (
    <div className="flex flex-col items-center">
      <TaskForm heading={"Edit Task"} task={task} />
    </div>
  );
};

export default EditTask;
