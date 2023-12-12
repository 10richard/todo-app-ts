const TaskTags = ({ tags, color }) => {
  return (
    <>
      <div className="flex gap-1">
        {tags?.map((t, idx) => (
          <p
            key={idx}
            style={{ backgroundColor: color }}
            className={`text-xs p-[6px] rounded-2xl`}
          >
            {t}
          </p>
        ))}
      </div>
    </>
  );
};

export default TaskTags;
