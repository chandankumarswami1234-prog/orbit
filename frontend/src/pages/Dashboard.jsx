/*import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import DashboardChart from "../components/DashboardChart";

function Dashboard() {
  const [taskCount, setTaskCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [workspaceCount, setWorkspaceCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const [completedCount, setCompletedCount] = useState(0);
  const [todoCount, setTodoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/task/count")
      .then((res) => res.text())
      .then((data) => setTaskCount(Number(data)));

    fetch("http://localhost:8080/project/count")
      .then((res) => res.text())
      .then((data) => setProjectCount(Number(data)));

    fetch("http://localhost:8080/workspace/count")
      .then((res) => res.text())
      .then((data) => setWorkspaceCount(Number(data)));

    fetch("http://localhost:8080/auth/count")
      .then((res) => res.text())
      .then((data) => setUserCount(Number(data)));

    fetch("http://localhost:8080/task/completed/count")
      .then((res) => res.text())
      .then((data) => setCompletedCount(Number(data)));

    fetch("http://localhost:8080/task/todo/count")
      .then((res) => res.text())
      .then((data) => setTodoCount(Number(data)));

    fetch("http://localhost:8080/task/inprogress/count")
      .then((res) => res.text())
      .then((data) => setInProgressCount(Number(data)));

    fetch("http://localhost:8080/task/overdue/count")
      .then((res) => res.text())
      .then((data) => setOverdueCount(Number(data)));

    fetch("http://localhost:8080/task/today/count")
      .then((res) => res.text())
      .then((data) => setTodayCount(Number(data)));
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">
          <h1>Orbit Dashboard</h1>

          <br />

          <Link to="/projects">
            <button>Projects</button>
          </Link>

          <Link to="/tasks">
            <button style={{ marginLeft: "10px" }}>
              Tasks
            </button>
          </Link>

          <Link to="/workspaces">
            <button style={{ marginLeft: "10px" }}>
              Workspaces
            </button>
          </Link>

          <Link to="/comments">
            <button style={{ marginLeft: "10px" }}>
              Comments
            </button>
          </Link>

          <br />
          <br />

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
            }}
          >
            <div className="card">
              <h3>Total Tasks</h3>
              <h1>{taskCount}</h1>
            </div>

            <div className="card">
              <h3>Total Projects</h3>
              <h1>{projectCount}</h1>
            </div>

            <div className="card">
              <h3>Total Workspaces</h3>
              <h1>{workspaceCount}</h1>
            </div>

            <div className="card">
              <h3>Total Users</h3>
              <h1>{userCount}</h1>
            </div>

            <div className="card">
              <h3>TODO Tasks</h3>
              <h1>{todoCount}</h1>
            </div>

            <div className="card">
              <h3>In Progress</h3>
              <h1>{inProgressCount}</h1>
            </div>

            <div className="card">
              <h3>Completed Tasks</h3>
              <h1>{completedCount}</h1>
            </div>

            <div className="card">
              <h3>Overdue Tasks</h3>
              <h1>{overdueCount}</h1>
            </div>

            <div className="card">
              <h3>Due Today</h3>
              <h1>{todayCount}</h1>
            </div>
          </div>

          <br />

          <div className="card">
            <h2>Project Progress</h2>

            <p>
              Completed Tasks: {completedCount} / {taskCount}
            </p>

            <progress
              value={completedCount}
              max={taskCount || 1}
              style={{
                width: "100%",
                height: "25px",
              }}
            />
          </div>

          <br />

          <div
            className="card"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h2>Task Analytics</h2>

            <DashboardChart
              todo={todoCount}
              inProgress={inProgressCount}
              completed={completedCount}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;*/
/*
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import DashboardChart from "../components/DashboardChart";

function Dashboard() {
  const [taskCount, setTaskCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [workspaceCount, setWorkspaceCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const [completedCount, setCompletedCount] = useState(0);
  const [todoCount, setTodoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [teamCount, setTeamCount] =
  useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/task/count")
      .then((res) => res.text())
      .then((data) => setTaskCount(Number(data)));

    fetch("http://localhost:8080/project/count")
      .then((res) => res.text())
      .then((data) => setProjectCount(Number(data)));

    fetch("http://localhost:8080/workspace/count")
      .then((res) => res.text())
      .then((data) => setWorkspaceCount(Number(data)));

    fetch("http://localhost:8080/auth/count")
      .then((res) => res.text())
      .then((data) => setUserCount(Number(data)));

    fetch("http://localhost:8080/task/completed/count")
      .then((res) => res.text())
      .then((data) => setCompletedCount(Number(data)));

    fetch("http://localhost:8080/task/todo/count")
      .then((res) => res.text())
      .then((data) => setTodoCount(Number(data)));

    fetch("http://localhost:8080/task/inprogress/count")
      .then((res) => res.text())
      .then((data) => setInProgressCount(Number(data)));

    fetch("http://localhost:8080/task/overdue/count")
      .then((res) => res.text())
      .then((data) => setOverdueCount(Number(data)));

    fetch("http://localhost:8080/task/today/count")
      .then((res) => res.text())
      .then((data) => setTodayCount(Number(data)));

      fetch("http://localhost:8080/team/count")
  .then((res) => res.text())
  .then((data) => setTeamCount(Number(data)));
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">
          <h1>Orbit Dashboard</h1>

          <br />

          <Link to="/projects">
            <button>Projects</button>
          </Link>

          <Link to="/tasks">
            <button style={{ marginLeft: "10px" }}>
              Tasks
            </button>
          </Link>

          <Link to="/workspaces">
            <button style={{ marginLeft: "10px" }}>
              Workspaces
            </button>
          </Link>

          <Link to="/comments">
            <button style={{ marginLeft: "10px" }}>
              Comments
            </button>
          </Link>

          <br />
          <br />

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
            }}
          >
            <div className="card">
              <h3>Total Tasks</h3>
              <h1>{taskCount}</h1>
            </div>

            <div className="card">
              <h3>Total Projects</h3>
              <h1>{projectCount}</h1>
            </div>

            <div className="card">
              <h3>Total Workspaces</h3>
              <h1>{workspaceCount}</h1>
            </div>

            <div className="card">
              <h3>Total Users</h3>
              <h1>{userCount}</h1>
            </div>

            <div className="card">
              <h3>TODO Tasks</h3>
              <h1>{todoCount}</h1>
            </div>

            <div className="card">
              <h3>In Progress</h3>
              <h1>{inProgressCount}</h1>
            </div>

            <div className="card">
              <h3>Completed Tasks</h3>
              <h1>{completedCount}</h1>
            </div>

            <div className="card">
              <h3>Overdue Tasks</h3>
              <h1>{overdueCount}</h1>
            </div>

            <div className="card">
              <h3>Due Today</h3>
              <h1>{todayCount}</h1>
            </div>
          </div>

<div className="card">
  <h3>Total Teams</h3>
  <h1>{teamCount}</h1>
</div>


          <br />

          <div className="card">
            <h2>Project Progress</h2>

            <p>
              Completed Tasks: {completedCount} / {taskCount}
            </p>

            <progress
              value={completedCount}
              max={taskCount || 1}
              style={{
                width: "100%",
                height: "25px",
              }}
            />
          </div>

          <br />

          <div
            className="card"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              <h2>Task Analytics</h2>

              <DashboardChart
                todo={todoCount}
                inProgress={inProgressCount}
                completed={completedCount}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;*/

/*

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import DashboardChart from "../components/DashboardChart";

function Dashboard() {
  const [taskCount, setTaskCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [workspaceCount, setWorkspaceCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const [completedCount, setCompletedCount] = useState(0);
  const [todoCount, setTodoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [notificationCount, setNotificationCount] =
  useState(0);
  const [activityCount, setActivityCount] =
  useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/task/count")
      .then((res) => res.text())
      .then((data) => setTaskCount(Number(data)));

    fetch("http://localhost:8080/project/count")
      .then((res) => res.text())
      .then((data) => setProjectCount(Number(data)));

    fetch("http://localhost:8080/workspace/count")
      .then((res) => res.text())
      .then((data) => setWorkspaceCount(Number(data)));

    fetch("http://localhost:8080/auth/count")
      .then((res) => res.text())
      .then((data) => setUserCount(Number(data)));

    fetch("http://localhost:8080/task/completed/count")
      .then((res) => res.text())
      .then((data) => setCompletedCount(Number(data)));

    fetch("http://localhost:8080/task/todo/count")
      .then((res) => res.text())
      .then((data) => setTodoCount(Number(data)));

    fetch("http://localhost:8080/task/inprogress/count")
      .then((res) => res.text())
      .then((data) => setInProgressCount(Number(data)));

    fetch("http://localhost:8080/task/overdue/count")
      .then((res) => res.text())
      .then((data) => setOverdueCount(Number(data)));

    fetch("http://localhost:8080/task/today/count")
      .then((res) => res.text())
      .then((data) => setTodayCount(Number(data)));

    fetch("http://localhost:8080/team/count")
      .then((res) => res.text())
      .then((data) => setTeamCount(Number(data)));

      fetch(
  "http://localhost:8080/notification/count"
)
  .then((res) => res.text())
  .then((data) =>
    setNotificationCount(Number(data))
  );

  fetch("http://localhost:8080/activity/count")
  .then((res) => res.text())
  .then((data) =>
    setActivityCount(Number(data))
  );

  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">
          <h1>Orbit Dashboard</h1>

          <br />

          <Link to="/projects">
            <button>Projects</button>
          </Link>

          <Link to="/tasks">
            <button style={{ marginLeft: "10px" }}>
              Tasks
            </button>
          </Link>

          <Link to="/workspaces">
            <button style={{ marginLeft: "10px" }}>
              Workspaces
            </button>
          </Link>

          <Link to="/comments">
            <button style={{ marginLeft: "10px" }}>
              Comments
            </button>
          </Link>

          <Link to="/teams">
            <button style={{ marginLeft: "10px" }}>
              Teams
            </button>
          </Link>

          
<Link to="/activity-logs">
  <button
    style={{ marginLeft: "10px" }}
  >
    Activity Logs
  </button>
</Link>


          <Link to="/notifications">
  <button
    style={{
      marginLeft: "10px",
    }}
  >
    Notifications
  </button>
</Link>



          <br />
          <br />

         <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    width: "100%"
  }}
>


  
           <div className="card">
              <h3>Total Tasks</h3>
              <h1>{taskCount}</h1>
            </div>

            <div className="card">
              <h3>Total Projects</h3>
              <h1>{projectCount}</h1>
            </div>

            <div className="card">
              <h3>Total Workspaces</h3>
              <h1>{workspaceCount}</h1>
            </div>

            <div className="card">
              <h3>Total Users</h3>
              <h1>{userCount}</h1>
            </div>

            <div className="card">
              <h3>Total Teams</h3>
              <h1>{teamCount}</h1>
            </div>

            <div className="card">
              <h3>TODO Tasks</h3>
              <h1>{todoCount}</h1>
            </div>

            <div className="card">
              <h3>In Progress</h3>
              <h1>{inProgressCount}</h1>
            </div>

            <div className="card">
              <h3>Completed Tasks</h3>
              <h1>{completedCount}</h1>
            </div>

            <div className="card">
              <h3>Overdue Tasks</h3>
              <h1>{overdueCount}</h1>
            </div>

            <div className="card">
              <h3>Due Today</h3>
              <h1>{todayCount}</h1>
            </div>
          </div>

          <br />

          <div className="card">
            <h2>Project Progress</h2>

            <p>
              Completed Tasks: {completedCount} / {taskCount}
            </p>

            <progress
              value={completedCount}
              max={taskCount || 1}
              style={{
                width: "100%",
                height: "25px",
              }}
            />
          </div>

          <div className="card">
  <h3>Notifications</h3>
  <h1>{notificationCount}</h1>
</div>

<div className="card">
  <h3>Activity Logs</h3>
  <h1>{activityCount}</h1>
</div>

          <br />

          <div
            className="card"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h2>Task Analytics</h2>

            <DashboardChart
              todo={todoCount}
              inProgress={inProgressCount}
              completed={completedCount}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;  */


/*
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import DashboardChart from "../components/DashboardChart";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [taskCount, setTaskCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [workspaceCount, setWorkspaceCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const [completedCount, setCompletedCount] = useState(0);
  const [todoCount, setTodoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);

  const [teamCount, setTeamCount] = useState(0);
  const [notificationCount, setNotificationCount] =
    useState(0);
  const [activityCount, setActivityCount] =
    useState(0);
    const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/task/count")
      .then((res) => res.text())
      .then((data) => setTaskCount(Number(data)));

    fetch("http://localhost:8080/project/count")
      .then((res) => res.text())
      .then((data) => setProjectCount(Number(data)));

    fetch("http://localhost:8080/workspace/count")
      .then((res) => res.text())
      .then((data) =>
        setWorkspaceCount(Number(data))
      );

    fetch("http://localhost:8080/auth/count")
      .then((res) => res.text())
      .then((data) => setUserCount(Number(data)));

    fetch("http://localhost:8080/team/count")
      .then((res) => res.text())
      .then((data) => setTeamCount(Number(data)));

    fetch(
      "http://localhost:8080/task/completed/count"
    )
      .then((res) => res.text())
      .then((data) =>
        setCompletedCount(Number(data))
      );

    fetch("http://localhost:8080/task/todo/count")
      .then((res) => res.text())
      .then((data) => setTodoCount(Number(data)));

    fetch(
      "http://localhost:8080/task/inprogress/count"
    )
      .then((res) => res.text())
      .then((data) =>
        setInProgressCount(Number(data))
      );

    fetch(
      "http://localhost:8080/task/overdue/count"
    )
      .then((res) => res.text())
      .then((data) =>
        setOverdueCount(Number(data))
      );

    fetch("http://localhost:8080/task/today/count")
      .then((res) => res.text())
      .then((data) =>
        setTodayCount(Number(data))
      );

    fetch(
      "http://localhost:8080/notification/count"
    )
      .then((res) => res.text())
      .then((data) =>
        setNotificationCount(Number(data))
      );

    fetch("http://localhost:8080/activity/count")
      .then((res) => res.text())
      .then((data) =>
        setActivityCount(Number(data))
      );
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">
          <h1 className="dashboard-title">
            Orbit Dashboard
          </h1>

          <div className="dashboard-actions">
            <Link to="/projects">
              <button>Projects</button>
            </Link>

            <Link to="/tasks">
              <button>Tasks</button>
            </Link>

            <Link to="/workspaces">
              <button>Workspaces</button>
            </Link>

            <Link to="/comments">
              <button>Comments</button>
            </Link>

            <Link to="/teams">
              <button>Teams</button>
            </Link>

            <Link to="/activity-logs">
              <button>Activity Logs</button>
            </Link>

            <Link to="/notifications">
              <button>Notifications</button>
            </Link>
          </div>

         
          */
/*
          <div className="stats-grid">
            <div className="card">
              <h3>Total Tasks</h3>
              <h1>{taskCount}</h1>
            </div>

            <div className="card">
              <h3>Total Projects</h3>
              <h1>{projectCount}</h1>
            </div>

            <div className="card">
              <h3>Total Users</h3>
              <h1>{userCount}</h1>
            </div>

            <div className="card">
              <h3>Total Teams</h3>
              <h1>{teamCount}</h1>
            </div>
          </div>

        
          */
/*
          <div className="stats-grid">
            <div className="card">
              <h3>TODO Tasks</h3>
              <h1>{todoCount}</h1>
            </div>

            <div className="card">
              <h3>In Progress</h3>
              <h1>{inProgressCount}</h1>
            </div>

            <div className="card">
              <h3>Completed</h3>
              <h1>{completedCount}</h1>
            </div>

            <div className="card">
              <h3>Overdue</h3>
              <h1>{overdueCount}</h1>
            </div>
          </div>

         

          <div className="stats-grid">
            <div className="card">
              <h3>Total Workspaces</h3>
              <h1>{workspaceCount}</h1>
            </div>

            <div className="card">
              <h3>Due Today</h3>
              <h1>{todayCount}</h1>
            </div>
          </div>

        

          <div className="card progress-card">
            <h2>Project Progress</h2>

            <p>
              {completedCount} Completed out of{" "}
              {taskCount} Tasks
            </p>

            <progress
              value={completedCount}
              max={taskCount || 1}
            />
          </div>

          

          <div className="stats-grid">
            <div className="card">
              <h3>Notifications</h3>
              <h1>{notificationCount}</h1>
            </div>

            <div className="card">
              <h3>Activity Logs</h3>
              <h1>{activityCount}</h1>
            </div>
          </div>

          

          <div className="card analytics-card">
            <h2>Task Analytics</h2>

            <DashboardChart
              todo={todoCount}
              inProgress={inProgressCount}
              completed={completedCount}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
*/



/*import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import DashboardChart from "../components/DashboardChart";
import API from "../services/api";
import { toast } from "react-toastify";






function Dashboard() {
  const navigate = useNavigate();

  const [taskCount, setTaskCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [workspaceCount, setWorkspaceCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const [completedCount, setCompletedCount] = useState(0);
  const [todoCount, setTodoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);

  const [teamCount, setTeamCount] = useState(0);
  const [notificationCount, setNotificationCount] =
    useState(0);
  const [activityCount, setActivityCount] =
    useState(0);
    const [loading, setLoading] = useState(true);
const [lastUpdated, setLastUpdated] = useState("");


 useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
    return;
  }

  const loadDashboard = async () => {
    try {
      const [
        task,
        project,
        workspace,
        users,
        team,
        completed,
        todo,
        progress,
        overdue,
        today,
        notification,
        activity,
      ] = await Promise.all([
        API.get("/task/count"),
        API.get("/project/count"),
        API.get("/workspace/count"),
        API.get("/auth/count"),
        API.get("/team/count"),
        API.get("/task/completed/count"),
        API.get("/task/todo/count"),
        API.get("/task/inprogress/count"),
        API.get("/task/overdue/count"),
        API.get("/task/today/count"),
        API.get("/notification/count"),
        API.get("/activity/count"),
      ]);


      setLoading(true);
      setTaskCount(Number(task.data));
      setProjectCount(Number(project.data));
      setWorkspaceCount(Number(workspace.data));
      setUserCount(Number(users.data));
      setTeamCount(Number(team.data));

      setCompletedCount(Number(completed.data));
      setTodoCount(Number(todo.data));
      setInProgressCount(Number(progress.data));
      setOverdueCount(Number(overdue.data));
      setTodayCount(Number(today.data));

      setNotificationCount(Number(notification.data));
      setActivityCount(Number(activity.data));

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  loadDashboard();
}, [navigate]);

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">
          <h1 className="dashboard-title">
            Orbit Dashboard
          </h1>

          <div className="dashboard-actions">
            <Link to="/projects">
              <button>Projects</button>
            </Link>

            <Link to="/tasks">
              <button>Tasks</button>
            </Link>

            <Link to="/workspaces">
              <button>Workspaces</button>
            </Link>

            <Link to="/comments">
              <button>Comments</button>
            </Link>

            <Link to="/teams">
              <button>Teams</button>
            </Link>

            <Link to="/activity-logs">
              <button>Activity Logs</button>
            </Link>

            <Link to="/notifications">
              <button>Notifications</button>
            </Link>
          </div>


          

          <div className="stats-grid">
            <div className="card">
              <h3>Total Tasks</h3>
              <h1>{taskCount}</h1>
            </div>

            <div className="card">
              <h3>Total Projects</h3>
              <h1>{projectCount}</h1>
            </div>

            <div className="card">
              <h3>Total Users</h3>
              <h1>{userCount}</h1>
            </div>

            <div className="card">
              <h3>Total Teams</h3>
              <h1>{teamCount}</h1>
            </div>
          </div>

          <div className="stats-grid">
            <div className="card">
              <h3>TODO Tasks</h3>
              <h1>{todoCount}</h1>
            </div>

            <div className="card">
              <h3>In Progress</h3>
              <h1>{inProgressCount}</h1>
            </div>

            <div className="card">
              <h3>Completed</h3>
              <h1>{completedCount}</h1>
            </div>

            <div className="card">
              <h3>Overdue</h3>
              <h1>{overdueCount}</h1>
            </div>
          </div>

          <div className="stats-grid">
            <div className="card">
              <h3>Total Workspaces</h3>
              <h1>{workspaceCount}</h1>
            </div>

            <div className="card">
              <h3>Due Today</h3>
              <h1>{todayCount}</h1>
            </div>
          </div>

          <div className="card progress-card">
            <h2>Project Progress</h2>

            <p>
              {completedCount} Completed out of{" "}
              {taskCount} Tasks
            </p>

            <progress
              value={completedCount}
              max={taskCount || 1}
            />
          </div>

          <div className="stats-grid">
            <div className="card">
              <h3>Notifications</h3>
              <h1>{notificationCount}</h1>
            </div>

            <div className="card">
              <h3>Activity Logs</h3>
              <h1>{activityCount}</h1>
            </div>
          </div>

          <div className="card analytics-card">
            <h2>Task Analytics</h2>

            <DashboardChart
              todo={todoCount}
              inProgress={inProgressCount}
              completed={completedCount}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
*/
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import DashboardChart from "../components/DashboardChart";
import API from "../services/api";
import { toast } from "react-toastify";


function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const [taskCount, setTaskCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [workspaceCount, setWorkspaceCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const [completedCount, setCompletedCount] = useState(0);
  const [todoCount, setTodoCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);

  const [teamCount, setTeamCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [activityCount, setActivityCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [
          task,
          project,
          workspace,
          users,
          team,
          completed,
          todo,
          progress,
          overdue,
          today,
          notification,
          activity,
        ] = await Promise.all([
          API.get("/task/count"),
          API.get("/project/count"),
          API.get("/workspace/count"),
          API.get("/auth/count"),
          API.get("/team/count"),
          API.get("/task/completed/count"),
          API.get("/task/todo/count"),
          API.get("/task/inprogress/count"),
          API.get("/task/overdue/count"),
          API.get("/task/today/count"),
          API.get("/notification/count"),
          API.get("/activity/count"),
        ]);

        setTaskCount(Number(task.data));
        setProjectCount(Number(project.data));
        setWorkspaceCount(Number(workspace.data));
        setUserCount(Number(users.data));
        setTeamCount(Number(team.data));

        setCompletedCount(Number(completed.data));
        setTodoCount(Number(todo.data));
        setInProgressCount(Number(progress.data));
        setOverdueCount(Number(overdue.data));
        setTodayCount(Number(today.data));

        setNotificationCount(Number(notification.data));
        setActivityCount(Number(activity.data));

        setLastUpdated(new Date().toLocaleTimeString());
      } catch (error) {
        console.error(error);

        toast.error("Failed to load dashboard");

        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          localStorage.removeItem("token");
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();

    const interval = setInterval(loadDashboard, 30000);

    return () => clearInterval(interval);
  }, [navigate]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <Sidebar />
          <div className="content">
            <h2>Loading Dashboard...</h2>
          </div>
        </div>
      </>
    );
  }

  const completion =
    taskCount === 0
      ? 0
      : Math.round((completedCount / taskCount) * 100);

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">

          <h1 className="dashboard-title">
            Orbit Dashboard
          </h1>

          <div className="card">
            <h2>Welcome to Orbit 🚀</h2>

            <p>
              Manage projects, teams and tasks from one place.
            </p>

            <p>
              Last Updated :
              <strong> {lastUpdated}</strong>
            </p>

            <button
              onClick={() => window.location.reload()}
            >
              Refresh Dashboard
            </button>
          </div>

                    <br />
          <br />

         <div className="dashboard-actions">

  <Link to="/projects">
    <button>Projects</button>
  </Link>

  <Link to="/tasks">
    <button>Tasks</button>
  </Link>

  <Link to="/workspaces">
    <button>Workspaces</button>
  </Link>

  <Link to="/files">
    <button>Files</button>
  </Link>

  <Link to="/comments">
    <button>Comments</button>
  </Link>

  <Link to="/teams">
    <button>Teams</button>
  </Link>

  <Link to="/team-members">
    <button>Team Members</button>
  </Link>

  <Link to="/notifications">
    <button>Notifications</button>
  </Link>

  <Link to="/activity-logs">
    <button>Activity Logs</button>
  </Link>

  <Link to="/profile">
    <button>Profile</button>
  </Link>

</div>
        

          <div className="stats-grid">
            <div className="card">
              <h3>Total Tasks</h3>
              <h1>{taskCount}</h1>
            </div>

            <div className="card">
              <h3>Total Projects</h3>
              <h1>{projectCount}</h1>
            </div>

            <div className="card">
              <h3>Total Users</h3>
              <h1>{userCount}</h1>
            </div>

            <div className="card">
              <h3>Total Teams</h3>
              <h1>{teamCount}</h1>
            </div>
          </div>

          <div className="stats-grid">
            <div className="card">
              <h3>TODO Tasks</h3>
              <h1>{todoCount}</h1>
            </div>

            <div className="card">
              <h3>In Progress</h3>
              <h1>{inProgressCount}</h1>
            </div>

            <div className="card">
              <h3>Completed</h3>
              <h1>{completedCount}</h1>
            </div>

            <div className="card">
              <h3>Overdue</h3>
              <h1>{overdueCount}</h1>
            </div>
          </div>

          <div className="stats-grid">
            <div className="card">
              <h3>Total Workspaces</h3>
              <h1>{workspaceCount}</h1>
            </div>

            <div className="card">
              <h3>Due Today</h3>
              <h1>{todayCount}</h1>
            </div>

            <div className="card">
              <h3>Notifications</h3>
              <h1>{notificationCount}</h1>
            </div>

            <div className="card">
              <h3>Activity Logs</h3>
              <h1>{activityCount}</h1>
            </div>
          </div>

          <div className="card progress-card">
            <h2>Project Progress</h2>

            <p>
              {completedCount} Completed out of {taskCount} Tasks
            </p>

            <h3>{completion}% Completed</h3>

            <progress
              value={completedCount}
              max={taskCount || 1}
              style={{
                width: "100%",
                height: "22px",
              }}
            />
          </div>

          <div className="card analytics-card">
            <h2>Task Analytics</h2>

            <DashboardChart
              todo={todoCount}
              inProgress={inProgressCount}
              completed={completedCount}
            />
          </div>
                  </div>
      </div>
    </>
  );
}

export default Dashboard;