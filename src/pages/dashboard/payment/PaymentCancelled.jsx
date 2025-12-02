import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center text-4xl text-red-600 mb-10">
        Payment is cancelled. Please try again.
      </h2>
      <Link to="/dashboard/my-parcels" className="btn btn-primary">
        Try Again
      </Link>
    </div>
  );
};

export default PaymentCancelled;
