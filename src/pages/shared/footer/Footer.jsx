import { Link } from "react-router";
import Logo from "../../../components/logo/Logo";
import linkedinIcon from "../../../assets/linkedin-icon.png";
import xIcon from "../../../assets/x-icon.png";
import facebookIcon from "../../../assets/facebook-icon.png";
import youtubeIcon from "../../../assets/youtube-icon.png";

const Footer = () => {
  return (
    <section className="custom-container mx-auto mt-40 mb-8 py-20 bg-[#0B0B0B] rounded-4xl flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <Logo darkMode={true}></Logo>
        <p className="w-[70%] text-center text-[#DADADA]">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.{" "}
        </p>
      </div>
      <hr className="w-[90%] border-dashed border-[#03464D]" />
      <ul className="flex justify-center gap-9">
        <Link className="font-medium text-[#DADADA]">Services</Link>
        <Link className="font-medium text-[#DADADA]">Coverage</Link>
        <Link className="font-medium text-[#DADADA]">About Us</Link>
        <Link className="font-medium text-[#DADADA]">Pricing</Link>
        <Link className="font-medium text-[#DADADA]">Blog</Link>
        <Link className="font-medium text-[#DADADA]">Contact</Link>
      </ul>
      <hr className="w-[90%] border-dashed border-[#03464D]" />
      <ul className="flex justify-center gap-6">
        <li>
          <a href="https://www.linkedin.com">
            <img src={linkedinIcon} alt="LinkedIn logo" />
          </a>
        </li>
        <li>
          <a href="https://x.com">
            <img src={xIcon} alt="X logo" />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com">
            <img src={facebookIcon} alt="Facebook logo" />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com">
            <img src={youtubeIcon} alt="YouTube icon" />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Footer;
