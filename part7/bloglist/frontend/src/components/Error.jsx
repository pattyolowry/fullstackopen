import { useSelector } from "react-redux";
import { Alert } from '@mui/material'

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

  return (
    <Alert severity="error">
      {error}
    </Alert>
  )
};

export default Error;
