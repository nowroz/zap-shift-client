import { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <section className="custom-container mx-auto my-20">
      <h3 className="text-5xl text-center font-bold mb-10">Reviews</h3>
      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={30}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 100,
          scale: 0.75,
          modifier: 1,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard review={review}></ReviewCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
