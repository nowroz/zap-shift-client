import Banner from "./banner/Banner";
import Brands from "./brands/Brands";
import Reviews from "./reviews/Reviews";

const reviewsPromise = fetch(`/reviews.json`).then((res) => res.json());

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Brands></Brands>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </>
  );
};

export default Home;
