package orbit_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import orbit_backend.entity.Team;

public interface TeamRepository
        extends JpaRepository<Team, Long> {

}