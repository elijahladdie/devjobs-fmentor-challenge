/* eslint-disable react/prop-types */
const JobFooter = ({ selectedJob }) => {
  // destructure
  const { position, apply } = selectedJob;

  return (
    <footer>
      <div className="gen-wrapper">
        <h3>{position}</h3>
        <p className="founder">so digital inc.</p>
      </div>

      <a
        href={apply}
        className="btn"
        target="_blank"
        rel="noreferrer"
        aria-label="button"
      >
        apply now
      </a>
    </footer>
  );
};

export default JobFooter;
