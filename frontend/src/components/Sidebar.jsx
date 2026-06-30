import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Menu</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
       <li>
  <Link to="/dashboard">Dashboard</Link>
</li>

        <li>
          <Link to="/projects">Projects</Link>
        </li>

        <li>
          <Link to="/tasks">Tasks</Link>
        </li>

       <li> <Link to="/profile">
    <button>Profile</button>
</Link></li>

<li>
    <Link to="/files">Files</Link>
</li>

        <li>
          <Link to="/workspaces">Workspaces</Link>
        </li>

        <li>
          <Link to="/comments">Comments</Link>
        </li>

        <li>
          <Link to="/teams">Teams</Link>
        </li>

        <li>
  <Link to="/team-members">
    Team Members
  </Link>
</li>

<li>
  <Link to="/activity-logs">
    Activity Logs
  </Link>
</li>

<li>
  <Link to="/notifications">
    Notifications
  </Link>
</li>


      </ul>
    </div>
  );
}

export default Sidebar;
