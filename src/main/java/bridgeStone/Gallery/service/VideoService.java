package bridgeStone.Gallery.service;

import bridgeStone.Gallery.model.Video;
import bridgeStone.Gallery.repository.IVideoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VideoService {

    private static final Logger logger = LoggerFactory.getLogger(VideoService.class);

    @Autowired
    private IVideoRepo videoRepository;


    @Value("${video.upload.dir:D:/Videos/}")
    private String uploadDir;

    private static final long MAX_FILE_SIZE = 15 * 1024 * 1024;

    public ResponseEntity<String> saveVideo(MultipartFile file, String title, String description) {
        try {
            if (file.getSize() > MAX_FILE_SIZE) {
                return new ResponseEntity<>("File size exceeds the maximum allowed size of 15MB", HttpStatus.BAD_REQUEST);
            }

            Path uploadPath = Paths.get(uploadDir);
            File videoDirectory = new File(uploadDir);

            if (!videoDirectory.exists()) {
                videoDirectory.mkdirs();
            }
              int num=0;

            String fileName = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")) + "_" +num+" "+ file.getOriginalFilename();
             num++;
            Path filePath = uploadPath.resolve(fileName);


            File videoFile = new File(filePath.toString());
            try (FileOutputStream fos = new FileOutputStream(videoFile)) {
                fos.write(file.getBytes());
            }

            // Create video object to save metadata
            Video video = new Video();
            video.setTitle(title);
            video.setDescription(description);
            video.setFilePath(filePath.toString());


            Video savedVideo = videoRepository.save(video);

            logger.info("Video saved successfully with ID: {}", savedVideo.getId());
            String ttle=video.getTitle();
            System.out.println(ttle+" "+"this is the title to testttttt");


            return new ResponseEntity<>("Success" , HttpStatus.OK);
        } catch (IOException e) {
            // Log error
            logger.error("Error saving the file: ", e);
            return new ResponseEntity<>("Error saving the file: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            // Log unexpected error
            logger.error("Unexpected error occurred: ", e);
            return new ResponseEntity<>("Unexpected error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<Long> getAllVideoIds() {
        List<Video> videos = (List<Video>) videoRepository.findAll();
        return videos.stream()
                .filter(video -> {
                    String filePath = video.getFilePath();
                    if (filePath == null || filePath.isBlank()) {
                        System.out.println("Skipping because filePath is null or blank for video id: " + video.getId());
                        return false;
                    }
                    File file = new File(filePath);
                    System.out.println("Checking file: " + filePath + " -> exists: " + file.exists());
                    return file.exists() && file.isFile();
                })
                .map(Video::getId)
                .collect(Collectors.toList());
    }

    public List<Video> getAllVideos() {
        List<Video> allVideos = (List<Video>) videoRepository.findAll();
        List<Long> existingVideoIds = allVideos.stream()
                .filter(video -> {
                    String filePath = video.getFilePath();
                    if (filePath == null || filePath.isBlank()) {
                        System.out.println("Skipping video id: " + video.getId() + " due to null/blank file path.");
                        return false;
                    }
                    File file = new File(filePath);
                    boolean exists = file.exists() && file.isFile();
                    System.out.println("Checking file: " + filePath + " -> exists: " + exists);
                    return exists;
                })
                .map(Video::getId)
                .collect(Collectors.toList());
        return (List<Video>) videoRepository.findAllById(existingVideoIds);
    }

}
