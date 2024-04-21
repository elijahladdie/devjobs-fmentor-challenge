import { useParams } from "react-router-dom";

import JobHero from "../components/JobHero/JobHero";
import JobInfo from "../components/JobInfo/JobInfo";
import JobFooter from "../components/JobFooter/JobFooter";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Job = () => {
  const { jobId } = useParams();
  const [selectedJob, setSelectedJob] = useState({});

  const fetchJobsData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/jobs/${jobId}`); // Adjust the API endpoint accordingly

      setSelectedJob(response.data.data);
    } catch (error) {
      toast.error("Error fetching jobs data")
      console.error("", error);
    }
  };
  useEffect(() => {
    fetchJobsData();
  }, []);


  return (
    <>
      <div className="job-page-container">
        <Toaster />
        <div className="float-container">
          <JobHero selectedJob={selectedJob} />
        </div>
        <JobInfo selectedJob={selectedJob} />
      </div>
      <JobFooter selectedJob={selectedJob} />
    </>
  );
};
export default Job;
