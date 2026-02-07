import { useSelector } from "react-redux";

const Error = () => {

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const error = useSelector((state) => state.error);
  if (error === null) {
    return null;
  }

  return <div style={errorStyle}>{error}</div>;
};

export default Error;
