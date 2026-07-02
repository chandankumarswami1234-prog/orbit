import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
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
    if (!window.confirm("Delete this activity log?")) return;

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
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">

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
              }}
            />

            <button onClick={fetchLogs}>
              Refresh
            </button>
          </div>

          {loading ? (
            <h3>Loading Activity Logs...</h3>
          ) : filteredLogs.length === 0 ? (
            <h3>No Activity Logs Found</h3>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="card"
                style={{ marginBottom: "20px" }}
              >
                <h3>{log.action}</h3>

                <p>
                  <strong>Timestamp:</strong>{" "}
                  {log.timestamp
                    ? new Date(log.timestamp).toLocaleString()
                    : "N/A"}
                </p>

                <button
                  onClick={() => deleteLog(log.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}

        </div>
      </div>
    </>
  );
}

export default ActivityLogs;