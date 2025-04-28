package bridgeStone.Gallery.controller;

import bridgeStone.Gallery.model.Video;
import bridgeStone.Gallery.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class VideoController {

    @Autowired
    private VideoService videoService;


    @PostMapping("/upload")
    public ResponseEntity<String> uploadVideo(@RequestParam("file") MultipartFile file,
                                              @RequestParam("title") String title,
                                              @RequestParam("description") String description) {
        ResponseEntity<String> response = videoService.saveVideo(file, title, description);

        System.out.println("Response from service: " + response.getBody());
        return response;
    }
    @GetMapping("/getAllId")
    public List<Long> getVideos(){
        List<Long> allIds=videoService.getAllVideoIds();
        System.out.println((allIds));
        return allIds;
    }
    @GetMapping("/getAllVideo")
    public List<Video> getAllVideos(){
        return videoService.getAllVideos();
    }
}
