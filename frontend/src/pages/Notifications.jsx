import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await API.get("/notification/all");
      setNotifications(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const clearForm = () => {
    setTitle("");
    setMessage("");
  };

  const createNotification = async () => {
    if (!title.trim() || !message.trim()) {
      toast.warning("Fill all fields");
      return;
    }

    try {
      await API.post("/notification/create", {
        title,
        message,
      });

      clearForm();
      fetchNotifications();

      toast.success("Notification Created Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create notification");
    }
  };

  const markAsRead = async (id) => {
    try {
      await API.put(`/notification/read/${id}`);

      fetchNotifications();

      toast.success("Notification marked as read");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update notification");
    }
  };

  const deleteNotification = async (id) => {
    if (!window.confirm("Delete this notification?")) {
      return;
    }

    try {
      await API.delete(`/notification/${id}`);

      fetchNotifications();

      toast.success("Notification Deleted Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete notification");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notifications</h1>

      <button
        onClick={fetchNotifications}
        style={{
          marginBottom: "20px",
          padding: "8px 15px",
          cursor: "pointer",
        }}
      >
        Refresh
      </button>

      <br />

      <input
        type="text"
        placeholder="Notification Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "300px",
          padding: "8px",
        }}
      />

      <br />
      <br />

      <textarea
        placeholder="Notification Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="4"
        cols="45"
        style={{
          padding: "8px",
        }}
      />

      <br />
      <br />

      <button
        onClick={createNotification}
        style={{
          background: "#198754",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Create Notification
      </button>

      <hr />

      <h2>All Notifications</h2>

      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p>No Notifications Found.</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{notification.title}</h3>

            <p>{notification.message}</p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: notification.readStatus
                    ? "green"
                    : "red",
                  fontWeight: "bold",
                }}
              >
                {notification.readStatus
                  ? "Read"
                  : "Unread"}
              </span>
            </p>

            {!notification.readStatus && (
              <button
                onClick={() =>
                  markAsRead(notification.id)
                }
                style={{
                  background: "#0d6efd",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Mark as Read
              </button>
            )}

            <button
              onClick={() =>
                deleteNotification(notification.id)
              }
              style={{
                marginLeft: "10px",
                background: "#dc3545",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
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

export default Notifications;