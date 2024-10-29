import { SiGithub, SiLinkedin } from "react-icons/si";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1c231f] py-5">
      <div className="container flex flex-wrap gap-5 justify-between items-center">
        <p className="font-semibold text-base md:text-lg text-white">
          @Tourista 202/5 <span className="text-primaryColor">Jahid</span>, All
          rights reserved
        </p>
        <div className="flex gap-4">
          <Link
            target="_blanc"
            className="text-secondaryColor text-lg"
            to="https://github.com/jahid-sourav"
          >
            <SiGithub />
          </Link>
          <Link
            target="_blanc"
            className="text-secondaryColor text-lg"
            to="https://www.linkedin.com/in/devjahidulislam"
          >
            <SiLinkedin />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
