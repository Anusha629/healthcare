export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
}

export async function sendNotification(
  title: string,
  options: NotificationOptions,
) {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  registration.active?.postMessage({
    type: "SHOW_NOTIFICATION",
    title,
    options,
  });
}
