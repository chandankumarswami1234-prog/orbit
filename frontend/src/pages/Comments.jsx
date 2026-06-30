import { useEffect, useState } from "react";
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmDelete) return;

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
    <div
      style={{
        padding: "25px",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      <h1>Comments</h1>

      <input
        type="text"
        placeholder="Write Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <br />
      <br />

      <select
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
        }}
      >
        <option value="">Select Task</option>

        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>

      <br />
      <br />

      <button
        onClick={createComment}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Add Comment
      </button>

      <hr />

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
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={fetchComments}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <h3>Loading Comments...</h3>
      ) : filteredComments.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: "gray",
            padding: "30px",
          }}
        >
          <h3>No Comments Found</h3>
        </div>
      ) : (
        filteredComments.map((comment) => (
          <div
            key={comment.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "15px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <p>
              <strong>Comment:</strong> {comment.text}
            </p>

            <p>
              <strong>Task:</strong>{" "}
              {comment.task ? comment.task.title : "No Task"}
            </p>

            <button
              onClick={() => deleteComment(comment.id)}
              style={{
                background: "#dc3545",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Comments;