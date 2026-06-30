package orbit_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import orbit_backend.entity.Notification;
import orbit_backend.repository.NotificationRepository;

@RestController
@RequestMapping("/notification")
@CrossOrigin("*")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @PostMapping("/create")
    public Notification createNotification(
            @RequestBody Notification notification) {

        return notificationRepository.save(notification);
    }

    @GetMapping("/all")
    public List<Notification> getAllNotifications() {

        return notificationRepository.findAll();
    }

    @GetMapping("/unread")
    public List<Notification> getUnreadNotifications() {

        return notificationRepository.findByReadStatusFalse();
    }

    @GetMapping("/count")
    public long getUnreadCount() {

        return notificationRepository.countByReadStatusFalse();
    }

    @PutMapping("/read/{id}")
    public String markAsRead(@PathVariable Long id) {

        Notification notification =
                notificationRepository.findById(id)
                        .orElse(null);

        if (notification == null) {
            return "Notification Not Found";
        }

        notification.setReadStatus(true);

        notificationRepository.save(notification);

        return "Notification Marked As Read";
    }

    @DeleteMapping("/{id}")
    public String deleteNotification(
            @PathVariable Long id) {

        notificationRepository.deleteById(id);

        return "Notification Deleted";
    }
}