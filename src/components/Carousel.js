import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Carousel.css'; // Your CSS already correctly styles everything
import AddVideo from './AddVideo';

const Carousel = () => {
  const swiperRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [liked, setLiked] = useState([]);
  const [videos, setVideos] = useState([]); 

  // Fetch videos
  useEffect(() => {
    fetch('http://localhost:8080/getAllVideo', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('API did not return an array');
      }
      const paths = data.map(video => {
        let path = video.filePath.trim();
        path = path.replace(/^D:\\Videos\\/, 'http://localhost:8080/videos/');
        return path;
      }).filter(path => path !== "");
      setVideos(paths);
    })
    .catch(error => {
      console.error('Error fetching videos:', error);
    });
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeIndex]);

  const toggleLike = (index) => {
    setLiked((prevLiked) => {
      const updatedLikes = [...prevLiked];
      updatedLikes[index] = !updatedLikes[index]; 
      return updatedLikes;
    });
  };

  return (
    <div className="carousel-container">
      <AddVideo />
      <Swiper
        modules={[EffectCoverflow, Navigation, Autoplay]}
        effect="coverflow"
        grabCursor={false}
        centeredSlides={true}
        slidesPerView={2.2}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 10,
          stretch: 20,
          depth: 200,
          modifier: 1.2,
          slideShadows: false,
        }}
        pagination={{ clickable: false }}
        navigation
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        style={{ overflow: 'visible' }}
      >
        {videos.map((videoSrc, index) => (
          <SwiperSlide key={index}>
            <div className="video-wrapper">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={videoSrc}
                className="slide-video"
                muted
                playsInline
              />
              {activeIndex === index && (
                <div className="like-button-container">
                  <span
                    className={`heart-icon ${liked[index] ? 'liked' : ''}`}
                    onDoubleClick={() => toggleLike(index)} 
                  >
                    {liked[index] ? '❤️' : '🤍'} 
                  </span>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="arrow-button left" onClick={() => swiperRef.current?.slidePrev()}>&#8592;</button>
      <button className="arrow-button right" onClick={() => swiperRef.current?.slideNext()}>&#8594;</button>
    </div>
  );
};

export default Carousel;
