import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import API from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

const fetchProjects = async () => {
  try {
    const response = await API.get("/project/all");
    setProjects(response.data);
  } catch (error) {
    console.error(error);
    toast.error("Cannot connect to backend");
  }
};

  const createProject = async () => {
  try {
    const response = await API.post("/project/create", {
      name: projectName,
      description: "",
    });

    toast.success(response.data);

    setProjectName("");

    fetchProjects();

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data || "Failed to create project"
    );
  }
};

 const deleteProject = async (id) => {
  try {
    await API.delete(`/project/${id}`);

    toast.success("Project Deleted");

    fetchProjects();

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data || "Delete Failed"
    );
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