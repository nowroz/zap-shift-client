// Import Swiper styles
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import amazonImg from "../../../assets/brands/amazon.png";
import casioImg from "../../../assets/brands/casio.png";
import moonstarImg from "../../../assets/brands/moonstar.png";
import randstadImg from "../../../assets/brands/randstad.png";
import starImg from "../../../assets/brands/star.png";
import startPeopleImg from "../../../assets/brands/start_people.png";

const brandImages = [
  amazonImg,
  casioImg,
  moonstarImg,
  randstadImg,
  starImg,
  startPeopleImg,
];

const Brands = () => {
  return (
    <Swiper
      slidesPerView={4}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="custom-container mx-auto my-20"
    >
      {brandImages.map((brand, index) => (
        <SwiperSlide key={index}>
          <img src={brand} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;
