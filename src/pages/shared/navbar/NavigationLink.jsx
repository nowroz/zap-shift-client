import { NavLink } from "react-router";

const NavigationLink = ({ navPath }) => {
  return (
    <li className="font-medium text-[#606060]">
      <NavLink to={navPath.path}>{navPath.name}</NavLink>
    </li>
  );
};

export default NavigationLink;
