import { useTask } from "../contexts/taskContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import Task from "../components/Task";
import SearchBar from "../components/SearchBar";
import TaskSort from "../components/TaskSort";
import TaskTagsFilter from "../components/TaskTagsFilter";

const Tasks = () => {
  const { tasks, getTaskTags, sortTasks } = useTask();
  const [search, setSearch] = useState("");
  const [sortOpt, setSortOpt] = useState("Default");
  const [filteredTags, setFilteredTags] = useState([]);

  const tagOpts = getTaskTags();

  const filterTaskByTag = (task) => {
    if (filteredTags === undefined || filteredTags.length == 0) return true;

    return task.tags.some((tag) => filteredTags.includes(tag));
  };

  const filteredTasks = sortTasks(
    tasks
      ?.filter((t) => t.title.includes(search))
      .filter((t) => filterTaskByTag(t)),
    sortOpt.split(" ")
  );

  return (
    <div className="flex flex-col items-center gap-5 my-16">
      <SearchBar handleSearch={setSearch} />
      <div className="flex gap-14">
        <TaskSort handleOpt={setSortOpt} currentOpt={sortOpt} />
        <TaskTagsFilter
          opts={tagOpts}
          setTags={setFilteredTags}
          filteredTags={filteredTags}
        />
      </div>
      {filteredTasks?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
      <Link
        to="/task/new"
        className="text-white text-lg text-center leading-[60px] bg-[#0A99FE] w-[192px] h-[60px] rounded-[90px]"
      >
        + Add New Task
      </Link>
    </div>
  );
};

export default Tasks;
