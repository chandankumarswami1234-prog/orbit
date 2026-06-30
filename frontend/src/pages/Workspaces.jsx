import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Workspaces() {
  const [workspaces, setWorkspaces] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);

      const response = await API.get("/workspace/all");
      setWorkspaces(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load workspaces");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const createWorkspace = async () => {
    if (!name.trim()) {
      toast.warning("Workspace name is required");
      return;
    }

    if (!description.trim()) {
      toast.warning("Workspace description is required");
      return;
    }

    try {
      setSaving(true);

      const response = await API.post("/workspace/create", {
        name,
        description,
      });

      toast.success(response.data);

      clearForm();
      fetchWorkspaces();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create workspace");
    } finally {
      setSaving(false);
    }
  };

  const updateWorkspace = async () => {
    if (!window.confirm("Update this workspace?")) return;

    try {
      setSaving(true);

      const response = await API.put(`/workspace/${editingId}`, {
        name,
        description,
      });

      toast.success(response.data);

      clearForm();
      fetchWorkspaces();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update workspace");
    } finally {
      setSaving(false);
    }
  };

  const deleteWorkspace = async (id) => {
    if (!window.confirm("Delete this workspace?")) return;

    try {
      const response = await API.delete(`/workspace/${id}`);

      toast.success(response.data);

      fetchWorkspaces();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete workspace");
    }
  };

  const editWorkspace = (workspace) => {
    setEditingId(workspace.id);
    setName(workspace.name || "");
    setDescription(workspace.description || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Workspace Management</h1>

      <input
        type="text"
        placeholder="Workspace Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Workspace Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      {editingId ? (
        <>
          <button
            disabled={saving}
            onClick={updateWorkspace}
          >
            {saving ? "Updating..." : "Update Workspace"}
          </button>

          {" "}

          <button
            onClick={clearForm}
            style={{
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
          onClick={createWorkspace}
        >
          {saving ? "Creating..." : "Create Workspace"}
        </button>
      )}

      <hr />

      <h2>All Workspaces</h2>

      {loading ? (
        <p>Loading Workspaces...</p>
      ) : workspaces.length === 0 ? (
        <p>No Workspaces Found.</p>
      ) : (
        workspaces.map((workspace) => (
          <div
            key={workspace.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{workspace.name}</h3>

            <p>{workspace.description}</p>

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
              onClick={() => editWorkspace(workspace)}
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
              onClick={() => deleteWorkspace(workspace.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Workspaces;