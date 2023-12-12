const TaskTagsInput = ({ opt, handleChange }) => {
  return (
    <label className="flex justify-between p-3 text-xs">
      {opt}
      <input
        type="checkbox"
        onChange={() => handleChange(opt)}
        className="flex justify-between p-3"
      />
    </label>
  );
};

export default TaskTagsInput;
