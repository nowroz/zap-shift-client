import { NavLink } from "react-router";
import useAuthContext from "../../../hooks/useAuthContext";

const NavigationLink = ({ navPath }) => {
  const { user } = useAuthContext();

  return (
    <li
      className={`${navPath.isPrivate && (user || "hidden")} font-medium text-[#606060]`}
    >
      <NavLink to={navPath.path}>{navPath.name}</NavLink>
    </li>
  );
};

export default NavigationLink;
