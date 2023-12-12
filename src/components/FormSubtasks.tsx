import { useState } from "react";

const FormSubtasks = ({ subtasks, handleAdd, handleEdit, handleRemove }) => {
  const [subtask, setSubtask] = useState("");

  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="text-lg">Add Subtasks</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Add subtask..."
          onChange={(e) => setSubtask(e.target.value)}
          className="bg-white border border-[#E2E2E2] rounded-[90px] px-6 py-4 w-full"
        />
        <button
          className="absolute right-3 top-[15%] bg-[#0A99FE] p-2 rounded-full"
          onClick={() => handleAdd(subtask)}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <div>
        {subtasks?.map((s, idx) => (
          <div key={idx} className="relative my-2">
            <input
              type="text"
              className="bg-white rounded-[90px] px-6 py-4 w-full"
              defaultValue={s.subtask}
              onChange={(e) => handleEdit(s.id, e.target.value)}
            />
            <button
              className="absolute right-3 top-[15%] bg-[#F97B7A] p-2 rounded-full"
              onClick={() => handleRemove(s.id)}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormSubtasks;
