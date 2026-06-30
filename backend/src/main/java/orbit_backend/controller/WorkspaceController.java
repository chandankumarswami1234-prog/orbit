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

import orbit_backend.entity.Workspace;
import orbit_backend.repository.WorkspaceRepository;

@RestController
@RequestMapping("/workspace")
public class WorkspaceController {

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @PostMapping("/create")
    public String createWorkspace(@RequestBody Workspace workspace) {
        workspaceRepository.save(workspace);
        return "Workspace Created Successfully";
    }

    @GetMapping("/all")
    public List<Workspace> getAllWorkspaces() {
        return workspaceRepository.findAll();
    }

    @GetMapping("/{id}")
    public Workspace getWorkspaceById(@PathVariable Long id) {
        return workspaceRepository.findById(id).orElse(null);
    }
    @GetMapping("/count")
public long getWorkspaceCount() {
    return workspaceRepository.count();
}

    @PutMapping("/{id}")
    public String updateWorkspace(@PathVariable Long id,
                                  @RequestBody Workspace updatedWorkspace) {

        Workspace workspace =
                workspaceRepository.findById(id).orElse(null);

        if (workspace == null) {
            return "Workspace Not Found";
        }

        workspace.setName(updatedWorkspace.getName());
        workspace.setDescription(updatedWorkspace.getDescription());

        workspaceRepository.save(workspace);

        return "Workspace Updated Successfully";
    }

    @DeleteMapping("/{id}")
    public String deleteWorkspace(@PathVariable Long id) {

        if (!workspaceRepository.existsById(id)) {
            return "Workspace Not Found";
        }

        workspaceRepository.deleteById(id);

        return "Workspace Deleted Successfully";
    }
}