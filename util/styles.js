import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  app: {
    marginHorizontal: 0,
    minWidth: "100%",
    maxWidth: 500,
    position: "relative",
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "#343434"
  },
  logo: {
    height: 80,
    width: 80,
    bottom: 0,
    right: 0,
    position: "absolute",
    opacity: 0.25,
    zIndex: 50
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 16,
    textAlign: "center"
  },
  text: {
    lineHeight: 1.5,
    fontSize: 13,
    marginVertical: 16,
    textAlign: "center"
  },
  link: {
    color: "#1B95E0"
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    width: 100,
    height: 100
  }
});
