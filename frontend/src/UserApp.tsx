import { useEffect } from "react";
import DashboardLayout from "./components/layout/DashboardLayout";
import { socket } from "./socket";
import { notify } from "./utils/helper";
import type { Notification } from "./types/notification.type";
import { queryClient } from "./App";
import { TaskEvent } from "./types/task.type";

function UserApp() {
 useEffect(() => {
  if (!socket.connected) {
    socket.connect();
  }


  const onNewNotification = (data: Notification) => {
    notify({ title: data.title, message: data.message });
    queryClient.invalidateQueries({ queryKey: ["getNotifications"] });
    queryClient.invalidateQueries({
      queryKey: ["getUserNotificationsMetadata"],
    });
  };


  socket.on("new-notification", onNewNotification);
  Object.values(TaskEvent).forEach((event) => {
    socket.on(event, invalidateTasks);
  });

  function invalidateTasks() {
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  }

  return () => {
  
    socket.off("new-notification", onNewNotification);
    Object.values(TaskEvent).forEach((event) => {
      socket.off(event, invalidateTasks);
    });

    // ❗ Do NOT disconnect unless this is app-level cleanup
    socket.disconnect();
  };
}, []);

  return (
    <>
      <DashboardLayout />
    </>
  );
}

export default UserApp;
