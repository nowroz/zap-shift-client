import { Outlet } from "react-router";
import Logo from "../components/logo/Logo";
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <>
      <div className="custom-container mx-auto min-h-[calc(100vh-40px)] grid grid-cols-2 grid-rows-5 ">
        <header className="col-start-1 row-start-1 bg-base-100 p-4">
          <Logo></Logo>
        </header>
        <main className="col-start-1 row-start-2 row-span-4 bg-base-100">
          <Outlet></Outlet>
        </main>
        <div className="col-start-2 row-start-1 row-span-5 bg-[#FAFDF0] flex items-center justify-center">
          <img src={authImage} alt="" className="" />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
