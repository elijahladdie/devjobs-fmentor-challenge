import JobsList from "../components/JobsList/JobsList";
import Filters from "../components/Filters/Filters";

import { useGlobalContext } from "../context";

const Home = () => {
  const { jobs, setJobs, jobsData, showLoadBtn, setShowLoadBtn } =
    useGlobalContext();

  // Load More BTN functions
  const showMore = () => {
    setJobs(jobsData);
    setShowLoadBtn(false);
  };

  return (
    <div className="homepage">
      <Filters setJobs={setJobs} setShowLoadBtn={setShowLoadBtn} />
      <JobsList jobs={jobs} />

      {showLoadBtn && (
        <button onClick={showMore} className="btn load-btn" type="button">
          load more
        </button>
      )}
    </div>
  );
};

export default Home;
