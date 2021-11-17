import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: "#000",
  },
  container: {
    alignItems: "center",
    flex: 1,
    height: "100%",
  },

  image: {
    width: 130,
    height: 130,
    resizeMode: "contain",
  },

  text: {
    textAlign: "center",
    marginTop: 40,
    fontFamily: "FaturaLT",
    fontSize: 18,
    lineHeight: 30,
  },

  buttonContainer: {
    height: "60%",
    justifyContent: "center",
  },
});

export default styles;
