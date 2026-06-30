package orbit_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import orbit_backend.entity.FileData;

@Repository
public interface FileRepository
        extends JpaRepository<FileData, Long> {

}