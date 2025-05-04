import { NotificationType } from "@/components/buttons/notification-group-button";
import api from "./axios-config";
import { Notification } from "@/models/notification";

export async function postToken(token: string) {
  try {
    await api.post(`notifications/save-token`, token);
  } catch (error) {
    console.error("Error sending notifications token:", error);
    throw error;
  }
}

export async function getNotifications(): Promise<Notification[]> {
  try {
    const response = await api.get<Notification[]>(`notifications/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching labels:", error);
    throw error;
  }
}

export async function toggleNotification(
  transactionId: string,
  type: NotificationType
) {
  console.log(transactionId, type);
  try {
    return await api.put<Notification>(
      `notifications/toggle/${transactionId}`,
      {
        id: transactionId,
        type,
      }
    );
  } catch (error) {
    console.error("Error disabling notification:", error);
    throw error;
  }
}
