import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const {
    userName: username,
    user_photoURL: userImage,
    review: reviewText,
  } = review;

  return (
    <div className="max-w-sm rounded-2xl bg-white p-6 shadow-md">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-teal-600 text-3xl mb-3" />

      {/* Text */}
      <p className="text-gray-600 leading-relaxed">{reviewText}</p>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-300 my-5"></div>

      {/* Profile */}
      <div className="flex items-center gap-3">
        <img
          src={userImage}
          className="w-10 h-10 bg-teal-700 rounded-full"
        ></img>
        <div>
          <h3 className="font-semibold text-teal-800">{username}</h3>
          <p className="text-gray-500 text-sm">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
