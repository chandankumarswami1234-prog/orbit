import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { toast } from "react-toastify";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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
    if (!title.trim()) {
      toast.warning("Enter notification title");
      return;
    }

    if (!message.trim()) {
      toast.warning("Enter notification message");
      return;
    }

    try {
      const response = await API.post("/notification/create", {
        title,
        message,
      });

      toast.success(response.data);

      clearForm();

      fetchNotifications();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create notification");
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await API.put(`/notification/read/${id}`);

      toast.success(response.data);

      fetchNotifications();
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark notification");
    }
  };

  const deleteNotification = async (id) => {
    if (!window.confirm("Delete this notification?")) return;

    try {
      const response = await API.delete(`/notification/${id}`);

      toast.success(response.data);

      fetchNotifications();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const filteredNotifications = notifications.filter((notification) =>
    (
      notification.title +
      " " +
      notification.message
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">

          <h1>Notifications</h1>

          <div className="card">

            <h2>Create Notification</h2>

            <input
              type="text"
              placeholder="Notification Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
              }}
            />

            <textarea
              placeholder="Notification Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
              }}
            />

            <button onClick={createNotification}>
              Create Notification
            </button>

          </div>

          <br />

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <input
              type="text"
              placeholder="Search Notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
              }}
            />

            <button onClick={fetchNotifications}>
              Refresh
            </button>
          </div>

          {loading ? (
            <h2>Loading Notifications...</h2>
          ) : filteredNotifications.length === 0 ? (
            <div className="card">
              <h3>No Notifications Found</h3>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className="card"
                style={{ marginBottom: "20px" }}
              >
                <h3>{notification.title}</h3>

                <p>{notification.message}</p>

                <p>
                  <strong>Status : </strong>

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

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  {!notification.readStatus && (
                    <button
                      onClick={() =>
                        markAsRead(notification.id)
                      }
                    >
                      Mark as Read
                    </button>
                  )}

                  <button
                    style={{
                      background: "#dc3545",
                      color: "white",
                    }}
                    onClick={() =>
                      deleteNotification(notification.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </>
  );
}

export default Notifications;