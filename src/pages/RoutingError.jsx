import { useRouteError } from "react-router-dom";

const RoutingError = () => {
  const error = useRouteError();
  //   console.log(error);

  return (
    <div className="error-page">
      <h3>Sorry... there seems to be an error</h3>
      <p className="error-text">
        {error.status} - {error.statusText}
      </p>
    </div>
  );
};

export default RoutingError;
