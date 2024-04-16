/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import jobsData from "./assets/api/data.json";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // ---- Global States
  const [theme, setTheme] = useState("light-theme");
  const [jobs, setJobs] = useState([]);
  const [showLoadBtn, setShowLoadBtn] = useState(true);

  // ---- Global Functions
  const toggleTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
      return;
    }
    setTheme("light-theme");
  };

  // Filter array for partial rendering
  const initialDataLoad = () => {
    const filterIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const filteredJobs = jobsData.filter((job) =>
      filterIndexes.includes(job.id)
    );
    setJobs(filteredJobs);
  };

  //   Invoke initial load
  useEffect(() => {
    initialDataLoad();
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        jobs,
        setJobs,
        jobsData,
        showLoadBtn,
        setShowLoadBtn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
