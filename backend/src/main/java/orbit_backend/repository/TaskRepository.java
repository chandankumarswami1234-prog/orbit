package orbit_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import orbit_backend.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}