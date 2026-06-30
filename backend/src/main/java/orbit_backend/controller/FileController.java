package orbit_backend.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import orbit_backend.entity.FileData;
import orbit_backend.service.FileService;

@RestController
@RequestMapping("/file")
@CrossOrigin("*")
public class FileController {

    @Autowired
    private FileService fileService;

    // ==========================
    // Upload File
    // ==========================

    @PostMapping("/upload")
    public String uploadFile(
            @RequestParam("file") MultipartFile file)
            throws IOException {

        return fileService.uploadFile(file);

    }

    // ==========================
    // Get All Files
    // ==========================

    @GetMapping("/all")
    public List<FileData> getAllFiles() {

        return fileService.getAllFiles();

    }

    // ==========================
    // Download File
    // ==========================

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable Long id)
            throws IOException {

        FileData data = fileService.getFile(id);

        if (data == null) {
            return ResponseEntity.notFound().build();
        }

        File file = new File(data.getFilePath());

        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(file);

        String contentType =
                Files.probeContentType(file.toPath());

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getName() + "\"")
                .body(resource);
    }

    // ==========================
    // Delete File
    // ==========================

    @DeleteMapping("/{id}")
    public String deleteFile(
            @PathVariable Long id)
            throws IOException {

        return fileService.deleteFile(id);

    }

}