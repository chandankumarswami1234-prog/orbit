package orbit_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import orbit_backend.entity.ActivityLog;

public interface ActivityLogRepository
        extends JpaRepository<ActivityLog, Long> {

}