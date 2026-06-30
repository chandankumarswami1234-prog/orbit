package orbit_backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import orbit_backend.entity.FileData;
import orbit_backend.repository.FileRepository;

@Service
public class FileService {

    private static final String UPLOAD_DIR = "uploads";

    @Autowired
    private FileRepository fileRepository;

    // ==========================
    // Upload File
    // ==========================

    public String uploadFile(MultipartFile file) throws IOException {

        // Create uploads folder if it doesn't exist
        Path uploadPath = Paths.get(UPLOAD_DIR);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // File location
        Path filePath = uploadPath.resolve(file.getOriginalFilename());

        // Copy file to uploads folder
        Files.copy(
                file.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING);

        // Save metadata in database
        FileData data = new FileData();

        data.setFileName(file.getOriginalFilename());
        data.setFileType(file.getContentType());
        data.setFileSize(file.getSize());
        data.setFilePath(filePath.toString());
        data.setUploadTime(LocalDateTime.now());

        fileRepository.save(data);

        return "File Uploaded Successfully";
    }

    // ==========================
    // Get All Files
    // ==========================

    public List<FileData> getAllFiles() {

        return fileRepository.findAll();

    }

    // ==========================
    // Get File By Id
    // ==========================

    public FileData getFile(Long id) {

        return fileRepository.findById(id).orElse(null);

    }

    // ==========================
    // Delete File
    // ==========================

    public String deleteFile(Long id) throws IOException {

        FileData data =
                fileRepository.findById(id).orElse(null);

        if (data == null) {

            return "File Not Found";

        }

        Files.deleteIfExists(Paths.get(data.getFilePath()));

        fileRepository.delete(data);

        return "File Deleted Successfully";
    }

}
