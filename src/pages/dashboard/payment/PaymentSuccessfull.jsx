import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecureInstance from "../../../hooks/useAxiosSecureInstance";

const PaymentSuccessfull = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const axiosSecureInstance = useAxiosSecureInstance();

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosSecureInstance
        .patch(`/payment-success?sessionId=${sessionId}`)
        .then((res) => {
          console.log(res.data);

          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecureInstance]);

  return (
    <div>
      <h2 className="text-center text-4xl text-green-600 mb-10">
        Payment is successful
      </h2>
      <p className="text-center text-xl">
        Transaction ID:{" "}
        <span className="font-semibold text-black">
          {paymentInfo?.transactionId}
        </span>
      </p>
      <p className="text-center text-xl">
        Tracking ID:{" "}
        <span className="font-semibold text-black">
          {paymentInfo?.trackingId}
        </span>
      </p>
    </div>
  );
};

export default PaymentSuccessfull;
