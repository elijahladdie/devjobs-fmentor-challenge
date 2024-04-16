import { useParams } from "react-router-dom";
import jobsData from "../assets/api/data.json";

import JobHero from "../components/JobHero/JobHero";
import JobInfo from "../components/JobInfo/JobInfo";
import JobFooter from "../components/JobFooter/JobFooter";

const Job = () => {
  const { jobId } = useParams();
  const selectedJob = jobsData.find((job) => job.id == jobId);

  return (
    <>
      <div className="job-page-container">
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
