import { createContext, useContext, useEffect, useState } from "react";

const notificationContext = createContext({
  notification: null,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

const NotificationContextProvider = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState();

  const showNotificationHandler = (notificationData) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "success")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  return (
    <notificationContext.Provider
      value={{
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
      }}
    >
      {children}
    </notificationContext.Provider>
  );
};

export default NotificationContextProvider;
export const useNotificationContext = () => {
  return useContext(notificationContext);
};
