import { StyleSheet } from "react-native";
import { Theme } from "./constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 20,
    paddingTop: 60,
    gap: 28,
  },
  outlineButton: {
    borderWidth: 1,
    padding: 12,
    borderRadius: Theme.radius.lg,
    borderColor: Theme.colors.secondary,
    backgroundColor: undefined,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Theme.colors.primary,
  },
  chipButton: {
    borderRadius: 1000,
    backgroundColor: Theme.colors.bgSecondary,
    padding: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 8,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    color: Theme.colors.white,
  },
  errorInput: {
    borderColor: "red",
  },
  text: {
    color: Theme.colors.white,
    fontSize: Theme.typography.md,
    fontWeight: 400,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    padding: 20,
    // backgroundColor: Theme.colors.bgPrimary, // Adjust if needed
    alignItems: "center",
  },
  pressableWithIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
