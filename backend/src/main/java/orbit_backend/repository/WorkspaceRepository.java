package orbit_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import orbit_backend.entity.Workspace;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

}