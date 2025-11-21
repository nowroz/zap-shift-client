import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import banner1Img from "../../../assets/banner/banner1.png";
import banner2Img from "../../../assets/banner/banner2.png";
import banner3Img from "../../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <section className="custom-container mx-auto mt-10 mb-20 rounded-4xl">
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div>
          <img src={banner1Img} />
        </div>
        <div>
          <img src={banner2Img} />
        </div>
        <div>
          <img src={banner3Img} />
        </div>
      </Carousel>{" "}
    </section>
  );
};

export default Banner;
