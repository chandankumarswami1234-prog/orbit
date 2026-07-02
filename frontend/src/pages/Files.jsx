import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { toast } from "react-toastify";

function Files() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchFiles = async () => {
    try {
      setLoading(true);

      const response = await API.get("/file/all");

      setFiles(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const uploadFile = async () => {
    if (!selectedFile) {
      toast.warning("Please choose a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await API.post(
        "/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data);

      setSelectedFile(null);

      document.getElementById("fileInput").value = "";

      fetchFiles();
    } catch (error) {
      console.error(error);
      toast.error("Upload Failed");
    }
  };

  const deleteFile = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this file?"
    );

    if (!confirmDelete) return;

    try {
      const response = await API.delete(`/file/${id}`);

      toast.success(response.data);

      fetchFiles();
    } catch (error) {
      console.error(error);
      toast.error("Delete Failed");
    }
  };

  const filteredFiles = files.filter((file) =>
    (file.fileName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">

          <h1>File Manager</h1>

          <div className="card">

            <input
              id="fileInput"
              type="file"
              onChange={(e) =>
                setSelectedFile(e.target.files[0])
              }
            />

            <br />
            <br />

            <button onClick={uploadFile}>
              Upload File
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
              placeholder="Search Files..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />

            <button onClick={fetchFiles}>
              Refresh
            </button>
          </div>

          <hr />

          {loading ? (
            <h3>Loading Files...</h3>
          ) : filteredFiles.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "gray",
                padding: "30px",
              }}
            >
              <h3>No Files Uploaded</h3>
            </div>
          ) : (
            filteredFiles.map((file) => (
              <div
                key={file.id}
                className="card"
                style={{
                  marginBottom: "15px",
                }}
              >
                <h3>{file.fileName}</h3>

                <p>
                  <strong>Size:</strong>{" "}
                  {(file.fileSize / 1024).toFixed(2)}
                  {" "}KB
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <a
                    href={`${API.defaults.baseURL}/file/download/${file.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button>
                      Download
                    </button>
                  </a>

                  <button
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                    }}
                    onClick={() =>
                      deleteFile(file.id)
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

export default Files;