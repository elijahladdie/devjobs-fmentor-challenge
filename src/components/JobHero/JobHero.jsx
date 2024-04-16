/* eslint-disable react/prop-types */
const JobHero = ({ selectedJob }) => {
  // destructure
  const { company, logo, logoBackground, website } = selectedJob;

  return (
    <div className="hero">
      {/* Img */}
      <figure
        className="hero-img-holder"
        style={{ backgroundColor: logoBackground }}
      >
        <img src={logo} alt="logo" />
      </figure>

      {/* Hero info */}
      <div className="hero-info-wrapper">
        <div className="gen-wrapper">
          <h2>{company}</h2>
          <div className="url-txt">{`${company}.com`}</div>
        </div>
        <a
          href={website}
          className="btn btn-invert"
          target="_blank"
          rel="noreferrer"
          aria-label="button"
        >
          company site
        </a>
      </div>
    </div>
  );
};

export default JobHero;
