// import React from "react";
import "./Notifications.css";

const notificationCard = ({ notification }) => {
  const {  title, message, timestamp, type } = notification;

  const formattedDate = new Date(timestamp).toLocaleDateString();
  const formattedTime = new Date(timestamp).toLocaleTimeString();

  return (
    <div className="noti-card">
      <div className="noti-datetime">
        <div>{formattedDate}</div>
        <div>{formattedTime}</div>
      </div>
      <div className="noti-title">
        <h1>{title}</h1>
      </div>

      <div className="noti-content">
        <p>{message}</p>
      </div>

      {type && <div className="noti-type">Type: {type}</div>}
    </div>
  );
};

export default notificationCard;
