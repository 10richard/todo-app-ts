const FormLevelsContainer = ({ category, handleChange, value }) => {
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg">{category}</h1>
      <div className="flex gap-5">
        {levels.map((level, idx) => (
          <button
            key={idx}
            className={`flex items-center justify-center w-[30px] h-[30px] p-2 rounded-full ${
              value === level
                ? "bg-[#0D99FF] text-white"
                : "bg-[#0d99ff1a] bg-opacity-10"
            }`}
            type="button"
            onClick={() => handleChange(level)}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormLevelsContainer;
