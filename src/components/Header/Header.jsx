import devjobsLogo from "../../assets/devjobs-logo.svg";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to={"/"} aria-label="home">
        <img src={devjobsLogo} className="devjobs-logo" alt="devjobs logo" />
      </Link>
      <ThemeSwitch />
    </header>
  );
};

export default Header;
