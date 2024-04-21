/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const JobInfo = ({ selectedJob }) => {
  // destructure
  const {
    position,
    description,
    location,
    postedAt,
    contract,
    apply,
    requirements,
    roles,
  } = selectedJob;

  return (
    <div className="job-info-container">
      {/* job info header */}
      <div className="job-info-header">
        <div className="tags-wrapper">
          <p className="contract-info">
            {postedAt} &middot; {contract}
          </p>
          <h1>{position}</h1>
          <h4>{location}</h4>
        </div>
        <Link
          to={apply}
          className="btn"
          target="_blank"
          rel="noreferrer"
          aria-label="button"
        >
          apply now
        </Link>
      </div>

      {/* Job description */}
      <p className="job-description-txt body-txt">{description}</p>

    
    
      {/* Requirements */}
      <div className="requirements-wrapper">
        <h3>Requirements</h3>
        {requirements?.map((role, index) => (
          <span key={index}>
            <p className="body-txt">{role.content}</p>
            <ol className="list body-txt">
              {role.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ol>
          </span>
        ))}
      </div>

      {/* Role / Tasks */}
      <div className="tasks-wrapper">
        <h3>What You Will Do</h3>
        {roles?.map((role, index) => (
          <span key={index}>
            <p className="body-txt">{role.content}</p>
            <ol className="list body-txt">
              {role.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ol>
          </span>
        ))}
      </div>

    </div>
  );
};

export default JobInfo;
