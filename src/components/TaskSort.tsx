import { useState } from "react";

const TaskSort = ({ handleOpt, currentOpt }) => {
  const [toggle, setToggle] = useState(false);
  const sortOpts = {
    0: "Default",
    1: "Ascending Date",
    2: "Descending Date",
    3: "Ascending Complexity",
    4: "Descending Complexity",
    5: "Ascending Priority",
    6: "Descending Priority",
  };

  return (
    <div className="relative">
      <button
        className="flex justify-between w-[225px] py-3 px-12 bg-white rounded-[60px]"
        onClick={() => setToggle(!toggle)}
      >
        <span>Sort</span>
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
          {Object.values(sortOpts).map((opt, idx) => (
            <button
              key={idx}
              className="flex justify-between p-3"
              onClick={() => handleOpt(opt)}
            >
              <p className="text-xs">{opt}</p>
              <span
                className="h-[18px] w-[18px] rounded-full border"
                style={{
                  backgroundColor: currentOpt === opt ? "#0175FF" : "white",
                }}
              ></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskSort;
