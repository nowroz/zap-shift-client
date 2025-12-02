import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAuthContext from "../../../hooks/useAuthContext";
import useAxiosSecureInstance from "../../../hooks/useAxiosSecureInstance";

const Payment = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const axiosSecureInstance = useAxiosSecureInstance();

  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcel", id, user?.email],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(`/parcels/${id}`);

      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = { ...parcel };

    const res = await axiosSecureInstance.post(
      "/create-checkout-session",
      paymentInfo,
    );

    console.log(res.data);
    window.location.href = res.data.url;
  };

  return (
    <section>
      <h2 className="text-center text-4xl font-bold mb-10">
        {parcel?.parcelName}
      </h2>
      <p className="text-center text-lg mb-4">
        Please pay {"\u09f3"}
        {parcel?.deliveryCost}
      </p>
      <button onClick={handlePayment} className="btn btn-primary block mx-auto">
        Pay
      </button>
    </section>
  );
};

export default Payment;
