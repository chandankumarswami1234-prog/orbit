package orbit_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import orbit_backend.entity.ActivityLog;
import orbit_backend.repository.ActivityLogRepository;

@RestController
@RequestMapping("/activity")
@CrossOrigin("*")
public class ActivityLogController {

    @Autowired
    private ActivityLogRepository repository;

    @GetMapping("/all")
    public List<ActivityLog> getAll() {
        return repository.findAll();
    }

    @PostMapping("/create")
    public ActivityLog create(
            @RequestBody ActivityLog log) {

        return repository.save(log);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id) {

        repository.deleteById(id);
    }

    @GetMapping("/count")
    public long count() {
        return repository.count();
    }
}
