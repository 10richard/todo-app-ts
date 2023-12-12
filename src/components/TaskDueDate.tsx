import moment from "moment";

const TaskDueDate = ({ date, time, color }) => {
  if (!date) return <p>Due Date: </p>;

  const parseDueDate = new Date(`${date}:${time}`);
  const dueTime = parseDueDate.toLocaleTimeString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <p>
      Due Date:{" "}
      <span style={{ color: color }}>
        {moment(date).format("MMMM Do YYYY")}, {dueTime}
      </span>
    </p>
  );
};

export default TaskDueDate;
