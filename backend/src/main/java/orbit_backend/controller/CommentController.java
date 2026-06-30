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

import orbit_backend.entity.Comment;
import orbit_backend.entity.Task;
import orbit_backend.repository.CommentRepository;
import orbit_backend.repository.TaskRepository;

@RestController
@RequestMapping("/comment")
@CrossOrigin("*")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping("/create")
    public String createComment(
            @RequestBody Comment comment) {

        if (comment.getTask() != null &&
                comment.getTask().getId() != null) {

            Task task = taskRepository
                    .findById(comment.getTask().getId())
                    .orElse(null);

            comment.setTask(task);
        }

        commentRepository.save(comment);

        return "Comment Created";
    }

    @GetMapping("/all")
    public List<Comment> getAllComments() {

        return commentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Comment getCommentById(
            @PathVariable Long id) {

        return commentRepository
                .findById(id)
                .orElse(null);
    }

    @GetMapping("/count")
    public long getCommentCount() {

        return commentRepository.count();
    }

    @PutMapping("/{id}")
    public String updateComment(
            @PathVariable Long id,
            @RequestBody Comment updatedComment) {

        Comment comment = commentRepository
                .findById(id)
                .orElse(null);

        if (comment == null) {
            return "Comment Not Found";
        }

        comment.setText(updatedComment.getText());

        if (updatedComment.getTask() != null &&
                updatedComment.getTask().getId() != null) {

            Task task = taskRepository
                    .findById(updatedComment.getTask().getId())
                    .orElse(null);

            comment.setTask(task);
        } else {
            comment.setTask(null);
        }

        commentRepository.save(comment);

        return "Comment Updated Successfully";
    }

    @DeleteMapping("/{id}")
    public String deleteComment(
            @PathVariable Long id) {

        if (!commentRepository.existsById(id)) {
            return "Comment Not Found";
        }

        commentRepository.deleteById(id);

        return "Comment Deleted Successfully";
    }
}