import "./Notifications.css";
import NotificationCard from "./notificationCard";
import { useState, useEffect } from "react";
import axios from "axios";
// import React from "react";

const Notifications = ({ supervisorId }) => {
  const [notifications, setNotifications] = useState([]);

    // Fetch notifications when the component mounts
    useEffect(() => {
        const fetchNotifications = async () => {
          try {
            
            const userId = supervisorId;  
            const role = 'supervisor';  
            const response = await axios.get('http://localhost:5000/api/admin/notifications', {
              params: {
                userId,  // Pass userId as query parameter
                role,    // Pass role as query parameter
              }
            });
            setNotifications(response.data.notifications);
          } catch (error) {
            console.error('Error fetching notifications', error);
          }
        };
      
        fetchNotifications();
      }, []);

  return (
    <div className="notifications-container">
      <h1 className="notifications-title">Your Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        notifications.map((notification) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
          />
        ))
      )}
    </div>
  );
};

export default Notifications;
