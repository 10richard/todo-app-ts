import { useState } from "react";
import TaskTagsInput from "./TaskTagsInput";

const TaskTagsFilter = ({ opts, setTags, filteredTags }) => {
  const [toggle, setToggle] = useState(false);

  const handleChange = (opt) => {
    let newTags = [];
    if (filteredTags.includes(opt)) {
      newTags = filteredTags.filter((t) => t !== opt);
    } else {
      newTags = [...filteredTags, opt];
    }
    setTags(newTags);
  };

  return (
    <div className="relative">
      <button
        className="flex justify-between w-[225px] py-3 px-12 bg-white rounded-[60px]"
        onClick={() => setToggle(!toggle)}
      >
        <span>Filter</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 duration-300 ${toggle ? "rotate-180" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <div className={`${toggle ? "" : "hidden"}`}>
        <div className="flex flex-col w-full rounded-2xl shadow-md absolute z-40 bg-white">
          {opts.map((opt, idx) => (
            <TaskTagsInput
              key={idx}
              opt={opt}
              handleChange={handleChange}
              filteredTags={filteredTags}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskTagsFilter;
