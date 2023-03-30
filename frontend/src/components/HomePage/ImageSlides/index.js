import "./ImageSlides.css";
import { useEffect, useState } from "react";
import Slider from "react-slick";

// import "./style.css"
// import images from "./images"

const ImageSlides = () => {
  const images = [
    {
      id: 1,
      title: "Get in your music zone with ToneZone",
      class: "image-1-content",
    },
    {
      id: 2,
      body: "ToneZone is the place to share and discover music with your friends and collaborators.",
      class: "image-2-content",
    },
  ];

  //  const carouselStyle1 = {transform: 'translateX(0%)', transition: 'transform 0.6s ease-in-out 0s', width: '300%', display: "flex", overflow:'hidden', height: '100%'}
  //  const carouselStyle2 = {transform: 'translateX(-33%)', transition: 'transform 0.6s ease-in-out 0s', width: '300%', display: "flex", overflow:'hidden', height: '100%'}

  // const [carStyle, setCarStyle] = useState(carouselStyle1)

  // const carouselInterval = () => {
  //   setInterval(carouselCallBack, 1000, carouselStyle1, carouselStyle2)
  // }

  // const carouselCallBack = (carouselStyle1) => {

  // }
  // console.log(carouselInterval())
  // console.log(carStyle)

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <div className="image-container">
      <Slider {...settings}>
        {images.map((item) => (
          <div className={item.class}>
            <div className="image-1-title">{item.title}</div>
            <p className="image-1-tagline">{item.body}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlides;
