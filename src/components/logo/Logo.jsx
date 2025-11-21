import logoImg from "../../assets/logo.png";
const Logo = ({ darkMode }) => {
  return (
    <div className="flex items-end">
      <img src={logoImg} alt="" className="-mr-4" />
      <h3 className={`text-3xl font-extrabold ${darkMode && "text-white"}`}>
        ZapShift
      </h3>
    </div>
  );
};

export default Logo;
