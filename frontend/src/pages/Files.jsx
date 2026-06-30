import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Files() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);

  // Fetch all uploaded files
  const fetchFiles = async () => {
    try {
      const response = await API.get("/file/all");
      setFiles(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load files");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Upload file
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

  // Delete file
  const deleteFile = async (id) => {
    try {
      const response = await API.delete(`/file/${id}`);

      toast.success(response.data);

      fetchFiles();
    } catch (error) {
      console.error(error);
      toast.error("Delete Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>File Manager</h1>

      <input
        id="fileInput"
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={uploadFile}>
        Upload File
      </button>

      <hr />

      <h2>Uploaded Files</h2>

      {files.length === 0 ? (
        <p>No Files Uploaded</p>
      ) : (
        files.map((file) => (
          <div
            key={file.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{file.fileName}</h3>

            <p>
              Size:{" "}
              {(file.fileSize / 1024).toFixed(2)} KB
            </p>

            <a
              href={`http://localhost:8080/file/download/${file.id}`}
              target="_blank"
              rel="noreferrer"
            >
              Download
            </a>

            {"   "}

            <button
              onClick={() => deleteFile(file.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Files;