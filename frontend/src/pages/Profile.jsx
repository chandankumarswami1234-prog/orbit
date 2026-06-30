import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Profile() {
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await API.get("/auth/profile");

      setName(response.data.name || "");
      setEmail(response.data.email || "");
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    if (!name.trim()) {
      toast.warning("Name is required");
      return;
    }

    if (!email.trim()) {
      toast.warning("Email is required");
      return;
    }

    try {
      const response = await API.put("/auth/profile", {
        name,
        email,
      });

      toast.success(response.data);

      fetchProfile();
    } catch (error) {
      console.error(error);

      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("Unable to update profile");
      }
    }
  };

  const changePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.warning("Fill all password fields");
      return;
    }

    if (newPassword.length < 8) {
      toast.warning("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await API.put("/auth/change-password", {
        oldPassword,
        newPassword,
      });

      toast.success(response.data);

      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.error(error);

      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("Password change failed");
      }
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>User Profile</h1>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "25px",
          borderRadius: "10px",
          maxWidth: "600px",
          marginTop: "20px",
        }}
      >
        <h2>Profile Information</h2>

        <br />

        <label>Name</label>

        <br />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
          }}
        />

        <br />
        <br />

        <label>Email</label>

        <br />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
          }}
        />

        <br />
        <br />

        <button onClick={updateProfile}>
          Update Profile
        </button>
      </div>

      <br />

      <div
        style={{
          border: "1px solid #ddd",
          padding: "25px",
          borderRadius: "10px",
          maxWidth: "600px",
        }}
      >
        <h2>Change Password</h2>

        <br />

        <label>Current Password</label>

        <br />

        <input
          type="password"
          value={oldPassword}
          onChange={(e) =>
            setOldPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
          }}
        />

        <br />
        <br />

        <label>New Password</label>

        <br />

        <input
          type="password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
          }}
        />

        <br />
        <br />

        <button onClick={changePassword}>
          Change Password
        </button>
      </div>
    </div>
  );
}

export default Profile;