import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { toast } from "react-toastify";

function Comments() {
  const [comments, setComments] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [text, setText] = useState("");
  const [taskId, setTaskId] = useState("");

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);

      const response = await API.get("/comment/all");
      setComments(response.data);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await API.get("/task/all");
      setTasks(response.data);

    } catch (error) {
      console.error(error);
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchComments();
    fetchTasks();
  }, []);

  const createComment = async () => {

    if (!text.trim()) {
      toast.error("Comment is required");
      return;
    }

    try {

      const response = await API.post("/comment/create", {
        text,
        task: taskId ? { id: Number(taskId) } : null,
      });

      toast.success(response.data);

      setText("");
      setTaskId("");

      fetchComments();

    } catch (error) {
      console.error(error);
      toast.error("Failed to create comment");
    }
  };

  const deleteComment = async (id) => {

    if (!window.confirm("Delete this comment?")) return;

    try {

      const response = await API.delete(`/comment/${id}`);

      toast.success(response.data);

      fetchComments();

    } catch (error) {
      console.error(error);
      toast.error("Failed to delete comment");
    }
  };

  const filteredComments = comments.filter((comment) =>
    (comment.text || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container">

        <Sidebar />

        <div className="content">

          <h1>Comments</h1>

          <div className="card">

            <input
              type="text"
              placeholder="Write Comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
              }}
            />

            <select
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              <option value="">Select Task</option>

              {tasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </select>

            <button onClick={createComment}>
              Add Comment
            </button>

          </div>

          <br />

          <div className="card">

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <input
                type="text"
                placeholder="Search Comments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                }}
              />

              <button onClick={fetchComments}>
                Refresh
              </button>
            </div>

            {loading ? (
              <h3>Loading Comments...</h3>
            ) : filteredComments.length === 0 ? (
              <h3>No Comments Found</h3>
            ) : (
              filteredComments.map((comment) => (
                <div
                  key={comment.id}
                  className="card"
                  style={{ marginBottom: "15px" }}
                >
                  <h3>Comment</h3>

                  <p>
                    <strong>Text:</strong> {comment.text}
                  </p>

                  <p>
                    <strong>Task:</strong>{" "}
                    {comment.task
                      ? comment.task.title
                      : "No Task"}
                  </p>

                  <button
                    onClick={() => deleteComment(comment.id)}
                  >
                    Delete
                  </button>

                </div>
              ))
            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default Comments;