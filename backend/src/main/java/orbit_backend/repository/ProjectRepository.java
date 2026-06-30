package orbit_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import orbit_backend.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}