const TaskSubtasks = ({ task, subtasks, completeSubtask }) => {
  return (
    <div>
      <h1 className="text-lg mb-3">Subtasks checklist:</h1>
      <div className="flex flex-col gap-5">
        {subtasks.map((s, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-white rounded-[90px] pl-6 pr-4 py-2.5 w-full"
          >
            <p>{s.subtask}</p>
            <button
              className="bg-[#DEECF6] p-[10px] rounded-full"
              style={{ backgroundColor: s.isCompleted ? "#0A99FE" : "#DEECF6" }}
              onClick={() => completeSubtask(task, s)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={s.isCompleted ? "white" : "black"}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskSubtasks;
