import React from "react";
import { View, Modal, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";

const Modall = ({ enabled, close, buttons }) => {
  return (
    <>
      {enabled && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              backgroundColor: "#00000055",
            }}
          >
            <View
              style={{
                borderRadius: 15,
                width: "90%",
                backgroundColor: "#fff",
                alignSelf: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
                padding: 15,
                paddingTop: 35,
              }}
            >
              <TouchableOpacity
                style={{ position: "absolute", right: 15, top: 5 }}
                onPress={() => close && close()}
              >
                <AntDesign name="close" size={22} color="#d9413f" />
              </TouchableOpacity>
              {buttons()}
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default Modall;
