/* eslint-disable react/prop-types */
import Card from "../Card/Card";

const JobsList = ({ jobs }) => {
 
  return (
    <section className="jobs-list-container">
      {jobs?.map((item) => {
        return <Card key={item.id} {...item} />;
      })}
    </section>
  );
};

export default JobsList;
