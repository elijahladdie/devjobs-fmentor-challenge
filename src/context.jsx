/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";

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

  const fetchJobsData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/jobs/`); // Adjust the API endpoint accordingly
   
      const filterIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const filteredJobs = response.data.data.filter((job) =>
        filterIndexes.includes(job.id)
      );
      setJobs(filteredJobs);
    } catch (error) {
      console.error("Error fetching jobs data:", error);
    }
  };
  useEffect(() => {
    fetchJobsData();
  }, []);
  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        jobs,
        setJobs,
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
