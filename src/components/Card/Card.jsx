/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Card = ({
  id,
  company,
  position,
  postedAt,
  contract,
  location,
  logo,
  logoBackground,
}) => {
  return (
    <Link to={`/job/${id}`} className="card-container">
      <figure
        className="logo-holder"
        style={{ backgroundColor: logoBackground }}
      >
        <img src={logo} alt={company} />
      </figure>
      <div className="card-header">
        {postedAt} &middot; {contract}
      </div>
      <h3>{position}</h3>
      <p className="company-name">{company}</p>
      <h4>{location}</h4>
    </Link>
  );
};

export default Card;
