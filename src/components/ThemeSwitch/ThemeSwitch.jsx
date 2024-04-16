import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useGlobalContext } from "../../context";

const ThemeSwitch = () => {
  const { toggleTheme } = useGlobalContext();

  return (
    <label className="toggle">
      <span className="toggle-label">
        <MdLightMode />
      </span>
      <input
        onClick={toggleTheme}
        className="toggle-checkbox"
        type="checkbox"
      />
      <div className="toggle-switch"></div>
      <span className="toggle-label">
        <MdDarkMode />
      </span>
    </label>
  );
};

export default ThemeSwitch;
