import React, { useState,useEffect } from 'react';
import axios from 'axios';
const Notification = ({adminId}) => {
    const [notifications, setNotifications] = useState([]);

    // Fetch notifications when the component mounts
    useEffect(() => {
        const fetchNotifications = async () => {
          try {
            
            const userId = adminId;  
            const role = 'admin';  
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
      

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Notifications</h1>
      <ul className="list-disc pl-6 space-y-4">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`flex items-center justify-between p-3 rounded-lg h-28 text-lg shadow-xl cursor-pointer ${
              notification.read ? 'bg-gray-200' : 'bg-white'
            } hover:bg-gray-100 transition duration-300 ease-in-out`}
            onClick={() => markAsRead(notification.id)}
          >
            <span
              className={`text-gray-700 text-lg  ${
                notification.read ? '' : ''
              }`}
            >
              {notification.message}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
