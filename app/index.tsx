import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import usePushNotifications from "@/hooks/use-notifications";
import * as Notifications from "expo-notifications";

type Props = {};

export default function Index({}: Props) {
  usePushNotifications();
  // useEffect(() => {
  //   Notifications.cancelAllScheduledNotificationsAsync();
  // }, []);
  return <Redirect href={"/(app)/(home)"} />;
}