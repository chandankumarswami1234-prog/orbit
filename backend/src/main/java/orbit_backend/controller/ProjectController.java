package orbit_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import orbit_backend.entity.Project;
import orbit_backend.repository.ProjectRepository;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/create")
    public String createProject(@RequestBody Project project) {
        projectRepository.save(project);
        return "Project Created Successfully";
    }

    @GetMapping("/all")
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id).orElse(null);
    }
@GetMapping("/count")
public long getProjectCount() {
    return projectRepository.count();
}
    @PutMapping("/{id}")
    public String updateProject(@PathVariable Long id,
                                @RequestBody Project updatedProject) {

        Project project =
                projectRepository.findById(id).orElse(null);

        if (project == null) {
            return "Project Not Found";
        }

        project.setName(updatedProject.getName());
        project.setDescription(updatedProject.getDescription());

        projectRepository.save(project);

        return "Project Updated Successfully";
    }

    @DeleteMapping("/{id}")
    public String deleteProject(@PathVariable Long id) {

        if (!projectRepository.existsById(id)) {
            return "Project Not Found";
        }

        projectRepository.deleteById(id);

        return "Project Deleted Successfully";
    }
}