import { StyleSheet } from "react-native";
import { Theme } from "./constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingInline: 20,
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
  addButton: {
    backgroundColor: Theme.colors.secondary,
    borderRadius: 1000,
    padding: 8,
    marginRight: 8,
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
    minWidth: 120,
  },
  errorInput: {
    borderColor: "red",
  },
  headerText: {
    color: Theme.colors.white,
    fontWeight: 600,
    fontSize: Theme.typography.xl,
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
    alignItems: "center",
  },
  pressableWithIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  divider: {
    borderWidth: 0.5,
    width: 1,
    height: "100%",
    borderColor: Theme.colors.bgSecondary,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
    backgroundColor: Theme.colors.bgSecondary,
    borderRadius: Theme.radius.lg,
    padding: 12,
    paddingInline: 18,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay background
  },
  bottomSheet: {
    width: "100%",
    backgroundColor: Theme.colors.white,
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 1,
    borderColor: Theme.colors.bgSecondary,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Theme.colors.primary,
    borderRadius: 5,
    alignItems: "center",
  },
});
