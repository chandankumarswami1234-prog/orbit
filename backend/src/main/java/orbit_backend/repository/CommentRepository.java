package orbit_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import orbit_backend.entity.Comment;

public interface CommentRepository
        extends JpaRepository<Comment, Long> {
}