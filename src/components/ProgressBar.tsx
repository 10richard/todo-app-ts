import { useTask } from "../contexts/taskContext";

const ProgressBar = ({ subtasks, color }) => {
  const { getCompletedSubtasksPercentage } = useTask();
  const percentCompleted = `${getCompletedSubtasksPercentage(subtasks)}%`;

  return (
    <div>
      <div className="flex justify-between mb-1 w-full">
        <p>Task Complete</p>
        <p style={{ color: color }}>{percentCompleted}</p>
      </div>
      <div className="h-4 bg-[#F5F5F5] w-full block rounded-[60px] overflow-hidden">
        <div
          className="h-full block"
          style={{ width: percentCompleted, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
