package bridgeStone.Gallery.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String filePath;

    private String hostedLink;

    public void setFilePath(String filePath1) {
        filePath=filePath1;
    }

    public void setDescription(String description1) {
        description=description1;
    }

    public void setTitle(String title1) {
      title=title1;
    }

    public Long getId() {
        return id;
    }
    public  String getTitle(){
        return title;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setHostedLink(String s) {
        hostedLink=s;
    }
}
