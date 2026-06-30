/*import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Workspaces from "./pages/Workspaces";
import Tasks from "./pages/Tasks";
import Comments from "./pages/Comments";
import Team from "./pages/Teams";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/workspaces" element={<Workspaces />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;*/

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Workspaces from "./pages/Workspaces";
import Tasks from "./pages/Tasks";
import Comments from "./pages/Comments";
import Team from "./pages/Teams";
import TeamMembers from "./pages/TeamMembers";
import Notifications from "./pages/Notifications";
import ActivityLogs from "./pages/ActivityLogs";
import Profile from "./pages/Profile";
import Files from "./pages/Files";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


<Route
  path="/profile"
  element={<Profile />}
/>

<Route
  path="/files"
  element={<Files />}
/>

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/workspaces"
          element={<Workspaces />}
        />

        <Route
          path="/tasks"
          element={<Tasks />}
        />

        <Route
          path="/comments"
          element={<Comments />}
        />

       <Route path="/teams" element={<Team />} />
       <Route
  path="/team-members"
  element={<TeamMembers />}
/>

<Route
  path="/activity-logs"
  element={<ActivityLogs />}
/>

<Route
  path="/notifications"
  element={<Notifications />}
/>



      </Routes>
    </BrowserRouter>
  );
}

export default App;