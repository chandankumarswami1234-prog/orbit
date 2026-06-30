/*import { useEffect, useState } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("TODO");

  const [projectId, setProjectId] = useState("");
  const [userId, setUserId] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8080/task/all");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:8080/project/all");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("");
    setDueDate("");
    setStatus("TODO");
    setProjectId("");
    setUserId("");
    setEditingId(null);
  };

  const createTask = async () => {
    await fetch("http://localhost:8080/task/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        dueDate,
        status,
        project: projectId ? { id: Number(projectId) } : null,
        user: userId ? { id: Number(userId) } : null,
      }),
    });

    clearForm();
    fetchTasks();
  };

  const updateTask = async () => {
    await fetch(`http://localhost:8080/task/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        dueDate,
        status,
        project: projectId ? { id: Number(projectId) } : null,
        user: userId ? { id: Number(userId) } : null,
      }),
    });

    clearForm();
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:8080/task/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  const editTask = (task) => {
    setEditingId(task.id);
    setTitle(task.title || "");
    setDescription(task.description || "");
    setPriority(task.priority || "");
    setDueDate(task.dueDate || "");
    setStatus(task.status || "TODO");

    setProjectId(task.project ? task.project.id : "");
    setUserId(task.user ? task.user.id : "");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Management</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <br /><br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>

      <br /><br />

      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      >
        <option value="">Select Project</option>

        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>

      <br /><br />

      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      >
        <option value="">Assign User</option>

        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <br /><br />

      {editingId ? (
        <button onClick={updateTask}>
          Update Task
        </button>
      ) : (
        <button onClick={createTask}>
          Create Task
        </button>
      )}

      <hr />

      <input
        type="text"
        placeholder="Search Task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="ALL">ALL</option>
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>

      <hr />

      <h2>All Tasks</h2>

      {tasks
        .filter((task) =>
          (task.title || "")
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .filter((task) =>
          filterStatus === "ALL"
            ? true
            : task.status === filterStatus
        )
        .map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              <b>Priority:</b> {task.priority}
            </p>

            <p>
              <b>Status:</b> {task.status}
            </p>

            <p>
              <b>Project:</b>{" "}
              {task.project
                ? task.project.name
                : "No Project"}
            </p>

            <p>
              <b>Assigned To:</b>{" "}
              {task.user
                ? task.user.name
                : "Unassigned"}
            </p>

            <p>
              <b>Due Date:</b> {task.dueDate}
            </p>

            <button onClick={() => editTask(task)}>
              Edit
            </button>

            {" "}

            <button
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>

            <hr />
          </div>
        ))}
    </div>
  );
}

export default Tasks;

import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("TODO");

  const [projectId, setProjectId] = useState("");
  const [userId, setUserId] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await API.get("/task/all");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
     toast.error("Failed to load tasks");
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await API.get("/project/all");
      setProjects(response.data);
    } catch (error) {
      console.error(error);
     toast.error("Failed to load projects");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await API.get("/auth/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    }
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("");
    setDueDate("");
    setStatus("TODO");
    setProjectId("");
    setUserId("");
    setEditingId(null);
  };

    const createTask = async () => {
    if (!title.trim()) {
      alert("Please enter task title");
      return;
    }

    try {
      const response = await API.post("/task/create", {
        title,
        description,
        priority,
        dueDate,
        status,
        project: projectId ? { id: Number(projectId) } : null,
        user: userId ? { id: Number(userId) } : null,
      });

      toast.success(response.data);

      clearForm();
      fetchTasks();

    } catch (error) {
      console.error(error);

      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("Unable to connect to backend");
      }
    }
  };

  const updateTask = async () => {
    try {
      const response = await API.put(`/task/${editingId}`, {
        title,
        description,
        priority,
        dueDate,
        status,
        project: projectId ? { id: Number(projectId) } : null,
        user: userId ? { id: Number(userId) } : null,
      });

      toast.success(response.data);

      clearForm();
      fetchTasks();

    } catch (error) {
      console.error(error);

      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("Update failed");
      }
    }
  };

  const deleteTask = async (id) => {

    if (!window.confirm("Delete this task?")) return;

    try {

      const response = await API.delete(`/task/${id}`);

      alert(response.data);

      fetchTasks();

    } catch (error) {

      console.error(error);

      if (error.response) {
        toast.error(error.response.data);
      } else {
        alert("Delete failed");
      }
    }
  };

  const editTask = (task) => {

    setEditingId(task.id);

    setTitle(task.title || "");
    setDescription(task.description || "");
    setPriority(task.priority || "");
    setDueDate(task.dueDate || "");
    setStatus(task.status || "TODO");

    setProjectId(task.project ? task.project.id : "");
    setUserId(task.user ? task.user.id : "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

    return (
    <div style={{ padding: "20px" }}>
      <h1>Task Management</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <br /><br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>

      <br /><br />

      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      >
        <option value="">Select Project</option>

        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>

      <br /><br />

      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      >
        <option value="">Assign User</option>

        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <br /><br />

      {editingId ? (
        <button onClick={updateTask}>
          Update Task
        </button>
      ) : (
        <button onClick={createTask}>
          Create Task
        </button>
      )}

      {editingId && (
        <>
          {" "}
          <button onClick={clearForm}>
            Cancel
          </button>
        </>
      )}

      <hr />

      <input
        type="text"
        placeholder="Search Task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="ALL">ALL</option>
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>

      <hr />

      <h2>All Tasks</h2>

      {tasks
        .filter((task) =>
          (task.title || "")
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .filter((task) =>
          filterStatus === "ALL"
            ? true
            : task.status === filterStatus
        )
        .map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              <b>Priority:</b> {task.priority}
            </p>

            <p>
              <b>Status:</b> {task.status}
            </p>

            <p>
              <b>Project:</b>{" "}
              {task.project
                ? task.project.name
                : "No Project"}
            </p>

            <p>
              <b>Assigned To:</b>{" "}
              {task.user
                ? task.user.name
                : "Unassigned"}
            </p>

            <p>
              <b>Due Date:</b> {task.dueDate}
            </p>

            <button
              onClick={() => editTask(task)}
            >
              Edit
            </button>

            {" "}

            <button
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default Tasks;
*/
import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("TODO");

  const [projectId, setProjectId] = useState("");
  const [userId, setUserId] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {

      setLoading(true);

      const response = await API.get("/task/all");

      setTasks(response.data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load tasks");

    } finally {

      setLoading(false);

    }
  };

  const fetchProjects = async () => {

    try {

      const response = await API.get("/project/all");

      setProjects(response.data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load projects");

    }
  };

  const fetchUsers = async () => {

    try {

      const response = await API.get("/auth/users");

      setUsers(response.data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load users");

    }
  };

  const clearForm = () => {

    setTitle("");
    setDescription("");
    setPriority("");
    setDueDate("");
    setStatus("TODO");

    setProjectId("");
    setUserId("");

    setEditingId(null);

  };

  const createTask = async () => {

    if (!title.trim()) {

      toast.warning("Please enter task title");

      return;

    }

    try {

      setSaving(true);

      const response = await API.post("/task/create", {

        title,
        description,
        priority,
        dueDate,
        status,

        project: projectId
          ? { id: Number(projectId) }
          : null,

        user: userId
          ? { id: Number(userId) }
          : null,

      });

      toast.success(response.data);

      clearForm();

      fetchTasks();

    } catch (error) {

      console.error(error);

      if (error.response) {

        toast.error(error.response.data);

      } else {

        toast.error("Unable to connect to backend");

      }

    } finally {

      setSaving(false);

    }

  };

  const updateTask = async () => {

    if (!window.confirm("Update this task?")) return;

    try {

      setSaving(true);

      const response = await API.put(

        `/task/${editingId}`,

        {

          title,
          description,
          priority,
          dueDate,
          status,

          project: projectId
            ? { id: Number(projectId) }
            : null,

          user: userId
            ? { id: Number(userId) }
            : null,

        }

      );

      toast.success(response.data);

      clearForm();

      fetchTasks();

    } catch (error) {

      console.error(error);

      if (error.response) {

        toast.error(error.response.data);

      } else {

        toast.error("Update Failed");

      }

    } finally {

      setSaving(false);

    }

  };

  const deleteTask = async (id) => {

    if (!window.confirm("Delete this task?")) return;

    try {

      const response = await API.delete(`/task/${id}`);

      toast.success(response.data);

      fetchTasks();

    } catch (error) {

      console.error(error);

      if (error.response) {

        toast.error(error.response.data);

      } else {

        toast.error("Delete Failed");

      }

    }

  };

  const editTask = (task) => {

    setEditingId(task.id);

    setTitle(task.title || "");
    setDescription(task.description || "");
    setPriority(task.priority || "");
    setDueDate(task.dueDate || "");
    setStatus(task.status || "TODO");

    setProjectId(
      task.project
        ? task.project.id
        : ""
    );

    setUserId(
      task.user
        ? task.user.id
        : ""
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Task Management</h1>
            <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Task Description"
        rows="4"
        cols="50"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Priority (HIGH / MEDIUM / LOW)"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      />

      <br />
      <br />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <br />
      <br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>

      <br />
      <br />

      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      >
        <option value="">Select Project</option>

        {projects.map((project) => (
          <option
            key={project.id}
            value={project.id}
          >
            {project.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      >
        <option value="">Assign User</option>

        {users.map((user) => (
          <option
            key={user.id}
            value={user.id}
          >
            {user.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      {editingId ? (
        <>
          <button
            disabled={saving}
            onClick={updateTask}
          >
            {saving ? "Updating..." : "Update Task"}
          </button>

          {" "}

          <button
            onClick={clearForm}
            style={{
              marginLeft: "10px",
              background: "#6c757d",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          disabled={saving}
          onClick={createTask}
        >
          {saving ? "Creating..." : "Create Task"}
        </button>
      )}

      <hr />

      <input
        type="text"
        placeholder="Search Tasks..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <br />
      <br />

      <select
        value={filterStatus}
        onChange={(e) =>
          setFilterStatus(e.target.value)
        }
      >
        <option value="ALL">All Tasks</option>
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="COMPLETED">COMPLETED</option>
      </select>

      <hr />

      <h2>All Tasks</h2>
            {loading ? (
        <p>Loading Tasks...</p>
      ) : tasks
          .filter((task) =>
            (task.title || "")
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .filter((task) =>
            filterStatus === "ALL"
              ? true
              : task.status === filterStatus
          ).length === 0 ? (
        <p>No Tasks Found.</p>
      ) : (
        tasks
          .filter((task) =>
            (task.title || "")
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .filter((task) =>
            filterStatus === "ALL"
              ? true
              : task.status === filterStatus
          )
          .map((task) => (
            <div
              key={task.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <p>
                <strong>Priority:</strong>{" "}
                {task.priority}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {task.status}
              </p>

              <p>
                <strong>Project:</strong>{" "}
                {task.project
                  ? task.project.name
                  : "No Project"}
              </p>

              <p>
                <strong>Assigned To:</strong>{" "}
                {task.user
                  ? task.user.name
                  : "Unassigned"}
              </p>

              <p>
                <strong>Due Date:</strong>{" "}
                {task.dueDate}
              </p>

              <button
                style={{
                  background: "#0d6efd",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                onClick={() => editTask(task)}
              >
                Edit
              </button>

              <button
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          ))
      )}
    </div>
  );
}

export default Tasks;