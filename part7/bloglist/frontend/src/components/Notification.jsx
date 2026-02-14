import { useSelector } from "react-redux";
import { Alert } from '@mui/material'

const Notification = () => {

  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const notification = useSelector((state) => state.notification);
  if (notification === null) {
    return null;
  }

  return (
    <Alert severity="success">
      {notification}
    </Alert>
  )
};

export default Notification;
