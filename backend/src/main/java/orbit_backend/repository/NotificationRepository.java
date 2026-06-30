package orbit_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import orbit_backend.entity.Notification;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    List<Notification> findByReadStatusFalse();

    long countByReadStatusFalse();
}