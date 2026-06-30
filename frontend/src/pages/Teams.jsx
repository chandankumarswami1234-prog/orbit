import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Teams() {
  const [teams, setTeams] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);

      const response = await API.get("/team/all");

      setTeams(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const createTeam = async () => {
    if (!name.trim()) {
      toast.warning("Team name is required");
      return;
    }

    try {
      setSaving(true);

      const response = await API.post("/team/create", {
        name,
        description,
      });

      toast.success(response.data);

      clearForm();
      fetchTeams();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create team");
    } finally {
      setSaving(false);
    }
  };

  const updateTeam = async () => {
    if (!window.confirm("Update this team?")) return;

    try {
      setSaving(true);

      const response = await API.put(`/team/${editingId}`, {
        name,
        description,
      });

      toast.success(response.data);

      clearForm();
      fetchTeams();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update team");
    } finally {
      setSaving(false);
    }
  };

  const deleteTeam = async (id) => {
    if (!window.confirm("Delete this team?")) return;

    try {
      const response = await API.delete(`/team/${id}`);

      toast.success(response.data);

      fetchTeams();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete team");
    }
  };

  const editTeam = (team) => {
    setEditingId(team.id);
    setName(team.name || "");
    setDescription(team.description || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Team Management</h1>

      <input
        type="text"
        placeholder="Team Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Team Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      {editingId ? (
        <>
          <button
            disabled={saving}
            onClick={updateTeam}
          >
            {saving ? "Updating..." : "Update Team"}
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
          onClick={createTeam}
        >
          {saving ? "Creating..." : "Create Team"}
        </button>
      )}

      <hr />

      <h2>All Teams</h2>

      {loading ? (
        <p>Loading Teams...</p>
      ) : teams.length === 0 ? (
        <p>No Teams Found.</p>
      ) : (
        teams.map((team) => (
          <div
            key={team.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{team.name}</h3>

            <p>{team.description}</p>

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
              onClick={() => editTeam(team)}
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
              onClick={() => deleteTeam(team.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Teams;