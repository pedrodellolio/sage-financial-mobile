import { Notification } from "@/models/notification";
export const getNotificationData = (notification: Notification) => {
  let title = "";
  let id = "";
  if (notification.transaction != null) {
    title = notification.transaction.title;
    id = notification.transaction.id;
  } else if (notification.budgetGoal != null) {
    title = notification.budgetGoal.label.title;
    id = notification.budgetGoal.id;
  }

  return {
    title,
    id,
  };
};
