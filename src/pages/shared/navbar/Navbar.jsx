import { MdArrowOutward } from "react-icons/md";
import Logo from "../../../components/logo/Logo";
import navPaths from "../../../navPaths/navPaths";
import NavigationLink from "./NavigationLink";
import { Link } from "react-router";

const Navbar = () => {
  const navLinks = navPaths.map((navPath) => (
    <NavigationLink key={navPath.id} navPath={navPath}></NavigationLink>
  ));

  return (
    <nav className="custom-container mx-auto p-5 bg-base-100 rounded-2xl grid grid-cols-4">
      <Link to="/">
        <Logo></Logo>
      </Link>
      <ul className="col-span-2 flex justify-center items-center gap-8">
        {navLinks}
      </ul>
      <div className="flex justify-end items-center gap-2">
        <button className="btn btn-secondary">Sign In</button>
        <button className="btn btn-primary">Sign Up</button>
        <button className="bg-[#1f1f1f] p-3 rounded-full">
          <MdArrowOutward color="#caeb66" size={18}></MdArrowOutward>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
