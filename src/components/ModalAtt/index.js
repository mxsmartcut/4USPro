import React, { useEffect, useState } from "react";
import { View, Modal, Text, Image, Linking } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../Button";
import styles from "./styles";

const ModalAtt = () => {
  const BackendVersion = 1;

  const [compatible, setCompatible] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post(
        "https://api.4usapp.com/admin/backendVersion",
        {
          version: BackendVersion,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${await AsyncStorage.getItem("jwtToken")}`,
        //   },
        // }
      );

      setCompatible(data.compatible);
      console.log(compatible);
    };
    fetchData();
  }, []);

  if (compatible) {
    return null;
  } else {
    return (
      <>
        <Modal style={styles.modalBackground}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require("../../images/logo.png")}
            />

            <Text style={styles.text}>
              Você está com uma versão desatualizada incompatível. Clique no
              botão abaixo para atualizar.
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                text="Atualizar"
                onPress={() => {
                  Linking.openURL(
                    "https://play.google.com/store/apps/details?id=com.fouruspro.professional&hl=en_IN&gl=US"
                  );
                }}
              />
            </View>
          </View>
        </Modal>
      </>
    );
  }
};

export default ModalAtt;
