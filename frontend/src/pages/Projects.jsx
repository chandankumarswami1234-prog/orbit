import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

 const fetchProjects = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      "http://localhost:8080/project/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
    toast.error("Error: " + response.status);
      return;
    }

    const data = await response.json();
    setProjects(data);
  } catch (error) {
    console.error(error);
    toast.error("Cannot connect to backend");
  }
};

  const createProject = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/project/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: projectName,
          description: "",
        }),
      });

      console.log("Status:", response.status);

      const text = await response.text();
      console.log(text);

      if (response.ok) {
       toast.success(text);
        setProjectName("");
        fetchProjects();
      } else {
       toast.error("Error " + response.status + "\n" + text);
      }
    } catch (error) {
      console.error(error);
    toast.error ("Failed to connect to backend");
    }
  };

  const deleteProject = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:8080/project/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchProjects();
      } else {
        const text = await response.text();
        toast.error("Error " + response.status + "\n" + text);
      }
    } catch (error) {
      console.error(error);
     toast.error("Failed to connect to backend");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <div className="content">

          <h1>Projects</h1>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Enter Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            <button onClick={createProject}>
              Create Project
            </button>
          </div>

          <div className="cards">
            {projects.length === 0 ? (
              <p>No Projects Found</p>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="card">

                  <h3>{project.name}</h3>

                  <p>{project.description}</p>

                  <button
                    onClick={() => deleteProject(project.id)}
                  >
                    Delete
                  </button>

                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default Projects;