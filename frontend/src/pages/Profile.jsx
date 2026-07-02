import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { toast } from "react-toastify";

function Profile() {
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [lastUpdated, setLastUpdated] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await API.get("/auth/profile");

      setName(response.data.name || "");
      setEmail(response.data.email || "");

      setLastUpdated(new Date().toLocaleString());
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
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.warning("Please fill all password fields");
      return;
    }

    if (newPassword.length < 8) {
      toast.warning(
        "Password must be at least 8 characters"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    try {
      const response = await API.put(
        "/auth/change-password",
        {
          oldPassword,
          newPassword,
        }
      );

      toast.success(response.data);

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
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
      <>
        <Navbar />

        <div className="container">
          <Sidebar />

          <div className="content">
            <h2>Loading Profile...</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">

          <h1>User Profile</h1>

          <div className="card">

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  background: "#0d6efd",
                  color: "white",
                  fontSize: "34px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {name
                  ? name.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <div>
                <h2>{name || "User"}</h2>

                <p>{email}</p>

                <small>
                  Last Updated : {lastUpdated}
                </small>
              </div>
            </div>

            <hr />

            <h2>Profile Information</h2>

            <br />

            <label>Name</label>

            <br />

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
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
              onChange={(e) =>
                setEmail(e.target.value)
              }
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

            <button
              style={{
                marginLeft: "10px",
              }}
              onClick={fetchProfile}
            >
              Refresh
            </button>

          </div>

          <br />

          <div className="card">

            <h2>Change Password</h2>

            <br />

                        <label>Current Password</label>

            <br />

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <input
                type={
                  showOldPassword
                    ? "text"
                    : "password"
                }
                value={oldPassword}
                onChange={(e) =>
                  setOldPassword(e.target.value)
                }
                style={{
                  flex: 1,
                  padding: "10px",
                }}
              />

              <button
                onClick={() =>
                  setShowOldPassword(
                    !showOldPassword
                  )
                }
              >
                {showOldPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>

            <label>New Password</label>

            <br />

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <input
                type={
                  showNewPassword
                    ? "text"
                    : "password"
                }
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                style={{
                  flex: 1,
                  padding: "10px",
                }}
              />

              <button
                onClick={() =>
                  setShowNewPassword(
                    !showNewPassword
                  )
                }
              >
                {showNewPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>

            <label>Confirm New Password</label>

            <br />

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                style={{
                  flex: 1,
                  padding: "10px",
                }}
              />

              <button
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>

            <button
              onClick={changePassword}
            >
              Change Password
            </button>

            <button
              style={{
                marginLeft: "10px",
                background: "#dc3545",
                color: "white",
              }}
              onClick={() => {
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
              }}
            >
              Clear
            </button>

          </div>

          <br />

          <div className="card">
            <h2>Account Information</h2>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Name
                  </td>

                  <td>{name}</td>
                </tr>

                <tr>
                  <td
                    style={{
                      padding: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </td>

                  <td>{email}</td>
                </tr>

                <tr>
                  <td
                    style={{
                      padding: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Status
                  </td>

                  <td
                    style={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    Active
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      padding: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Last Updated
                  </td>

                  <td>{lastUpdated}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}

export default Profile;