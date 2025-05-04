import { Theme } from "@/constants/theme";
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";

/*
  1. Create the config
*/
export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: Theme.colors.bgSecondary,
        borderLeftColor: "red",
      }}
      text1Style={{
        fontSize: 17,
        color: Theme.colors.white,
      }}
      text2Style={{
        fontSize: 15,
        color: Theme.colors.secondary,
      }}
    />
  ),
};
