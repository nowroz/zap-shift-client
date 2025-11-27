import { useForm } from "react-hook-form";
import useAuthContext from "../../../hooks/useAuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../socialLogin/SocialLogin";

const Login = () => {
  const { signInUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const redirection = location.state?.redirection ?? "/";
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential.user);
        navigate(redirection);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <section>
      <form onSubmit={handleSubmit(handleLogin)} className="p-10">
        <fieldset className="fieldset">
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
            {...register("password", { required: true })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Enter password.</p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <p>
            New to ZapShift?{" "}
            <Link
              to="/register"
              state={{ redirection: redirection }}
              className="text-blue-600"
            >
              Register
            </Link>{" "}
          </p>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
      <SocialLogin redirection={redirection}></SocialLogin>
    </section>
  );
};

export default Login;
