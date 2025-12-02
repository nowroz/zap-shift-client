import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../../../hooks/useAuthContext";
import useAxiosSecureInstance from "../../../hooks/useAxiosSecureInstance";
import { IoPencil, IoTrashOutline } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuthContext();
  const axiosSecureInstance = useAxiosSecureInstance();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(
        `/parcels?senderEmail=${user?.email}`,
      );

      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    // do something
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecureInstance
          .delete(`/parcels/${id}`)
          .then((res) => {
            console.log(res.data);

            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your parcel has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error(error.message);
          });
      }
    });
  };

  const handlePayment = async (parcel) => {
    const res = await axiosSecureInstance.post("/checkout-session", parcel);

    window.location.assign(res.data.url);
  };

  return (
    <section>
      <h2 className="text-center text-4xl font-bold mb-10">My Parcels</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Delivery Cost</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.deliveryCost}</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-grenn-500">Paid</span>
                  ) : (
                    <button
                      onClick={() => {
                        handlePayment(parcel);
                      }}
                      className="btn btn-xs btn-primary"
                    >
                      Pay Now
                    </button>
                  )}
                </td>
                <td>pending</td>
                <td className="space-x-2">
                  <button className="btn btn-xs btn-outline">
                    <HiMagnifyingGlass></HiMagnifyingGlass>
                  </button>
                  <button className="btn btn-xs btn-outline">
                    <IoPencil></IoPencil>
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-xs btn-error btn-outline"
                  >
                    <IoTrashOutline></IoTrashOutline>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
    </section>
  );
};

export default MyParcels;
