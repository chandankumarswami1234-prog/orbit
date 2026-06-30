/*package orbit_backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String priority;
    private LocalDate dueDate;

    public Task() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }
} 
    */

package orbit_backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String title;
private String description;
private String priority;
private LocalDate dueDate;
private String status;

@ManyToOne
@JoinColumn(name = "project_id")
private Project project;

@ManyToOne
@JoinColumn(name = "user_id")
private User user;

public Task() {
}

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getTitle() {
    return title;
}

public void setTitle(String title) {
    this.title = title;
}

public String getDescription() {
    return description;
}

public void setDescription(String description) {
    this.description = description;
}

public String getPriority() {
    return priority;
}

public void setPriority(String priority) {
    this.priority = priority;
}

public LocalDate getDueDate() {
    return dueDate;
}

public void setDueDate(LocalDate dueDate) {
    this.dueDate = dueDate;
}

public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}

public Project getProject() {
    return project;
}

public void setProject(Project project) {
    this.project = project;
}

public User getUser() {
    return user;
}

public void setUser(User user) {
    this.user = user;
}


}
