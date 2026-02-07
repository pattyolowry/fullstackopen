import { useSelector } from "react-redux";

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

  return <div style={notificationStyle}>{notification}</div>;
};

export default Notification;
