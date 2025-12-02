import { useForm } from "react-hook-form";
import useAuthContext from "../../../hooks/useAuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../socialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const { createUser, updateUserProfile } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const redirection = location.state?.redirection ?? "/";

  const navigate = useNavigate();

  const handleRegistration = (data) => {
    const profilePicture = data.photo[0];
    const displayName = data.name;

    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        const formData = new FormData();
        formData.append("image", profilePicture);

        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageHost}`,
            formData,
          )
          .then((res) => {
            updateUserProfile(displayName, res.data.data.url)
              .then(() => {
                console.log("Profile updated.");
                navigate(redirection);
              })
              .catch((error) => {
                console.error(error.message);
              });
          });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <section>
      <form onSubmit={handleSubmit(handleRegistration)} className="p-10">
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Enter your name.</p>
          )}
          <label className="label">Photo</label>
          <input type="file" {...register("photo")} className="file-input" />
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Enter your email address.</p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])\S+$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Enter password.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be at least 6 characters.
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must contain at least 1 uppercase letter, at least 1
              lowercase letter, at least 1 digit, at least 1 special character,
              and no whitespaces.
            </p>
          )}
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>{" "}
      </form>
      <SocialLogin></SocialLogin>
    </section>
  );
};

export default Register;
