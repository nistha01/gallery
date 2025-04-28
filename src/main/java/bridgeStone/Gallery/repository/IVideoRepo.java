package bridgeStone.Gallery.repository;

import bridgeStone.Gallery.model.Video;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IVideoRepo extends CrudRepository<Video,Long> {
    @Query("SELECT v.id FROM Video v")
    List<Long> findAllVideoIds();
}
