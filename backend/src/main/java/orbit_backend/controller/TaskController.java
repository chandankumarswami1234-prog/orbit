
package orbit_backend.controller;

import java.time.LocalDate;
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
import orbit_backend.entity.Task;
import orbit_backend.entity.User;
import orbit_backend.repository.ProjectRepository;
import orbit_backend.repository.TaskRepository;
import orbit_backend.repository.UserRepository;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public String createTask(@RequestBody Task task) {

        if (task.getProject() != null &&
                task.getProject().getId() != null) {

            Project project = projectRepository
                    .findById(task.getProject().getId())
                    .orElse(null);

            task.setProject(project);
        }

        if (task.getUser() != null &&
                task.getUser().getId() != null) {

            User user = userRepository
                    .findById(task.getUser().getId())
                    .orElse(null);

            task.setUser(user);
        }

        taskRepository.save(task);

        return "Task Created Successfully";
    }

    @GetMapping("/all")
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    @GetMapping("/count")
    public long getTaskCount() {
        return taskRepository.count();
    }

    @GetMapping("/todo/count")
    public long getTodoCount() {
        return taskRepository.findAll()
                .stream()
                .filter(task -> "TODO".equals(task.getStatus()))
                .count();
    }

    @GetMapping("/inprogress/count")
    public long getInProgressCount() {
        return taskRepository.findAll()
                .stream()
                .filter(task -> "IN_PROGRESS".equals(task.getStatus()))
                .count();
    }

    @GetMapping("/completed/count")
    public long getCompletedCount() {
        return taskRepository.findAll()
                .stream()
                .filter(task -> "COMPLETED".equals(task.getStatus()))
                .count();
    }

    @GetMapping("/today/count")
    public long getTodayCount() {

        LocalDate today = LocalDate.now();

        return taskRepository.findAll()
                .stream()
                .filter(task ->
                        task.getDueDate() != null
                        &&
                        task.getDueDate().equals(today))
                .count();
    }

    @GetMapping("/overdue/count")
    public long getOverdueCount() {

        LocalDate today = LocalDate.now();

        return taskRepository.findAll()
                .stream()
                .filter(task ->
                        task.getDueDate() != null
                        &&
                        task.getDueDate().isBefore(today)
                        &&
                        !"COMPLETED".equals(task.getStatus()))
                .count();
    }

    @PutMapping("/{id}")
    public String updateTask(
            @PathVariable Long id,
            @RequestBody Task updatedTask) {

        Task task = taskRepository.findById(id).orElse(null);

        if (task == null) {
            return "Task Not Found";
        }

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setPriority(updatedTask.getPriority());
        task.setDueDate(updatedTask.getDueDate());
        task.setStatus(updatedTask.getStatus());

        if (updatedTask.getProject() != null &&
                updatedTask.getProject().getId() != null) {

            Project project = projectRepository
                    .findById(updatedTask.getProject().getId())
                    .orElse(null);

            task.setProject(project);
        } else {
            task.setProject(null);
        }

        if (updatedTask.getUser() != null &&
                updatedTask.getUser().getId() != null) {

            User user = userRepository
                    .findById(updatedTask.getUser().getId())
                    .orElse(null);

            task.setUser(user);
        } else {
            task.setUser(null);
        }

        taskRepository.save(task);

        return "Task Updated Successfully";
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {

        if (!taskRepository.existsById(id)) {
            return "Task Not Found";
        }

        taskRepository.deleteById(id);

        return "Task Deleted Successfully";
    }
}

