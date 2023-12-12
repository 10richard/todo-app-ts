import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";
import { TaskProvider } from "./contexts/taskContext";

function App() {
  return (
    <Router>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/task/new" element={<NewTask />} />
          <Route path="/task/edit/:id" element={<EditTask />} />
        </Routes>
      </TaskProvider>
    </Router>
  );
}

export default App;
