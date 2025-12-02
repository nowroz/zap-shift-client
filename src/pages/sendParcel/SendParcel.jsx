import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecureInstance from "../../hooks/useAxiosSecureInstance";
import useAuthContext from "../../hooks/useAuthContext";

const SendParcel = () => {
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const serviceCenters = useLoaderData();
  const senderDivision = useWatch({ control, name: "senderDivision" });
  const receiverDivision = useWatch({ control, name: "receiverDivision" });

  const axiosSecureInstance = useAxiosSecureInstance();

  const navigate = useNavigate();

  let divisions = new Set(serviceCenters.map((center) => center.region));
  divisions = [...divisions];

  const handleFormSubmit = (data) => {
    const { parcelType, parcelWeight, senderDistrict, receiverDistrict } = data;

    const isSameDistrict = senderDistrict === receiverDistrict;
    const isDocument = parcelType === "document";
    const isEqualToOrUnder3KG = parcelWeight <= 3;

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (isEqualToOrUnder3KG) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        cost = (isSameDistrict ? 0 : 40) + parcelWeight * 40;
      }
    }

    data.paymentStatus = "pending";
    data.senderName = user?.displayName;
    data.senderEmail = user?.email;
    data.deliveryCost = cost;
    data.parcelWeight = Number(parcelWeight);

    Swal.fire({
      title: "Delivery Cost",
      text: `You will be charged \u09F3${cost} for the delivery fee. Do you accept?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I accept",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecureInstance
          .post("/parcels", data)
          .then((result) => {
            console.log(result.data);

            if (result.data.insertedId) {
              navigate(`/dashboard/my-parcels`);
            }
          })
          .catch((error) => {
            console.error(error.message);
          });
      }
    });
  };

  const getDistrictsByDivision = (division) => {
    const matchedServiceCenters = serviceCenters.filter(
      (center) => center.region === division,
    );

    const districts = [
      ...matchedServiceCenters.map((center) => center.district),
    ];

    return districts;
  };

  getDistrictsByDivision("Dhaka");
  return (
    <section className="custom-container mx-auto mt-10 mb-20">
      <h2 className="text-6xl font-bold mb-10">Send Parcel</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="">
        {/* parcel type */}
        <div className="mb-10 flex items-center gap-24">
          <div className="space-x-2">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              id="document"
              defaultChecked
              className="radio radio-primary"
            />
            <label htmlFor="document">Document</label>
          </div>
          <div className="space-x-2">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              id="non-document"
              className="radio radio-primary"
            />
            <label htmlFor="non-document">Non-document</label>
          </div>
        </div>

        {/* parcel info */}
        <div className="mb-10">
          <fieldset className="fieldset grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="parcel-name">
                Parcel Name
              </label>
              <input
                {...register("parcelName")}
                type="text"
                id="parcel-name"
                className="input w-full"
                placeholder="Parcel Name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="parcel-weight">
                Parcel Weigth (KG)
              </label>
              <input
                {...register("parcelWeight")}
                type="number"
                id="parcel-weight"
                defaultValue={0}
                className="input w-full"
                placeholder="Parcel Weight (KG)"
              />
            </div>
          </fieldset>
        </div>

        <div className="grid grid-cols-2 gap-10 mb-10">
          <fieldset className="fieldset space-y-3">
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="sender-name">
                Sender Name
              </label>
              <input
                {...register("senderName")}
                type="text"
                id="sender-name"
                defaultValue={user?.displayName}
                className="input w-full"
                placeholder="Sender Name"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="sender-email">
                Sender Email
              </label>
              <input
                {...register("senderEmail")}
                type="email"
                id="sender-email"
                defaultValue={user?.email}
                className="input w-full"
                placeholder="Sender Email"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="sender-division">
                Sender Division
              </label>
              <select
                {...register("senderDivision")}
                id="sender-division"
                defaultValue="Select division"
                className="select w-full"
              >
                <option disabled={true}>Select division</option>
                {divisions.map((division) => (
                  <option key={division}>{division}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="sender-district">
                Sender Disctrict
              </label>
              <select
                {...register("senderDistrict")}
                id="sender-district"
                defaultValue="Select district"
                className="select w-full"
              >
                <option disabled={true}>Select district</option>
                {getDistrictsByDivision(senderDivision).map((district) => (
                  <option key={district}>{district}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="sender-address">
                Sender Address
              </label>
              <input
                {...register("senderAddress")}
                type="text"
                id="sender-address"
                className="input w-full"
                placeholder="Sender Address"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="sender-number">
                Sender Phone No.
              </label>
              <input
                {...register("senderPhoneNumber")}
                type="text"
                id="sender-number"
                className="input w-full"
                placeholder="Sender Phone No."
              />
            </div>
          </fieldset>
          <fieldset className="fieldset space-y-3">
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="receiver-name">
                Receiver Name
              </label>
              <input
                {...register("receiverName")}
                type="text"
                id="receiver-name"
                className="input w-full"
                placeholder="Receiver Name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="receiver-email">
                Receiver Email
              </label>
              <input
                {...register("receiverEmail")}
                type="email"
                id="receiver-email"
                className="input w-full"
                placeholder="Receiver Email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="receiver-division">
                Receiver Division
              </label>
              <select
                {...register("receiverDivision")}
                id="receiver-division"
                defaultValue="Select division"
                className="select w-full"
              >
                <option disabled={true}>Select division</option>
                {divisions.map((division) => (
                  <option key={division}>{division}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="receiver-district">
                Receiver Disctrict
              </label>
              <select
                {...register("receiverDistrict")}
                id="receiver-district"
                defaultValue="Select district"
                className="select w-full"
              >
                <option disabled={true}>Select district</option>
                {getDistrictsByDivision(receiverDivision).map((district) => (
                  <option key={district}>{district}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="receiver-address">
                Receiver Address
              </label>
              <input
                {...register("receiverAddress")}
                type="text"
                id="receiver-address"
                className="input w-full"
                placeholder="Receiver Address"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="receiver-number">
                Receiver Phone No.
              </label>
              <input
                {...register("receiverPhoneNumber")}
                type="text"
                id="receiver-number"
                className="input w-full"
                placeholder="Receiver Phone No."
              />
            </div>
          </fieldset>
        </div>

        <input
          type="submit"
          value="Proceed to Confirm Booking"
          className="btn btn-primary text-primary-content"
        />
      </form>
    </section>
  );
};

export default SendParcel;
