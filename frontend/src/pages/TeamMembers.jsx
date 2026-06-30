import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function TeamMembers() {
  const [members, setMembers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);

  const [teamId, setTeamId] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMembers();
    fetchTeams();
    fetchUsers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);

      const response = await API.get("/team-member/all");
      setMembers(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await API.get("/team/all");
      setTeams(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load teams");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await API.get("/auth/all");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    }
  };

  const clearForm = () => {
    setTeamId("");
    setUserId("");
    setRole("");
  };

  const addMember = async () => {
    if (!teamId || !userId || !role) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      setSaving(true);

      const response = await API.post("/team-member/create", {
        role,
        team: {
          id: Number(teamId),
        },
        user: {
          id: Number(userId),
        },
      });

      toast.success(response.data);

      clearForm();
      fetchMembers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add member");
    } finally {
      setSaving(false);
    }
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Delete this team member?")) return;

    try {
      const response = await API.delete(`/team-member/${id}`);

      toast.success(response.data);

      fetchMembers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete member");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Team Members</h1>

      <select
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
      >
        <option value="">Select Team</option>

        {teams.map((team) => (
          <option
            key={team.id}
            value={team.id}
          >
            {team.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      >
        <option value="">Select User</option>

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

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">Select Role</option>

        <option value="ADMIN">
          ADMIN
        </option>

        <option value="MEMBER">
          MEMBER
        </option>
      </select>

      <br />
      <br />

      <button
        disabled={saving}
        onClick={addMember}
      >
        {saving ? "Adding..." : "Add Member"}
      </button>

      <hr />

      <h2>All Team Members</h2>

      {loading ? (
        <p>Loading Team Members...</p>
      ) : members.length === 0 ? (
        <p>No Team Members Found.</p>
      ) : (
        members.map((member) => (
          <div
            key={member.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>
              Team: {member.team?.name}
            </h3>

            <p>
              <strong>User:</strong>{" "}
              {member.user?.name}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {member.role}
            </p>

            <button
              style={{
                background: "#dc3545",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => deleteMember(member.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TeamMembers;