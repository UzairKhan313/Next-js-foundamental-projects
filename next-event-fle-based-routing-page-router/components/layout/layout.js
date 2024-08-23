import { Fragment } from "react";
import MainHeader from "./main-header";
import Notification from "../../components/ui/notification";
import { useNotificationContext } from "../../store/notificatinContext";

const Layout = ({ children }) => {
  const { notification: activeNotification } = useNotificationContext();
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
