import TaskForm from "../components/TaskForm";

const NewTask = () => {
  return (
    <div className="flex flex-col items-center">
      <TaskForm heading={"Add New Task"} />
    </div>
  );
};

export default NewTask;
