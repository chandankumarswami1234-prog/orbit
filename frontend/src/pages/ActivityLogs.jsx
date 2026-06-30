import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchLogs = async () => {
    try {
      setLoading(true);

      const response = await API.get("/activity/all");

      setLogs(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load activity logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const deleteLog = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this activity log?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/activity/${id}`);

      toast.success("Activity Log Deleted Successfully");

      fetchLogs();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete activity log");
    }
  };

  const filteredLogs = logs.filter((log) =>
    (log.action || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "25px",
        maxWidth: "1100px",
        margin: "auto",
      }}
    >
      <h1>Activity Logs</h1>

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
          placeholder="Search Activity..."
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
          onClick={fetchLogs}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Refresh
        </button>
      </div>

      <hr />

      {loading ? (
        <h3>Loading Activity Logs...</h3>
      ) : filteredLogs.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "gray",
          }}
        >
          <h3>No Activity Logs Found</h3>
        </div>
      ) : (
        filteredLogs.map((log) => (
          <div
            key={log.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              background: "#fff",
            }}
          >
            <h3>{log.action}</h3>

            <p>
              <b>Timestamp:</b>{" "}
              {log.timestamp
                ? new Date(log.timestamp).toLocaleString()
                : "N/A"}
            </p>

            <button
              onClick={() => deleteLog(log.id)}
              style={{
                backgroundColor: "#dc3545",
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

export default ActivityLogs;