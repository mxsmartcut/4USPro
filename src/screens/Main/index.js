import React, { useContext, useState, useEffect } from "react";
import { translate } from "../../../i18n/src/locales";

import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import marker from "../../images/marker.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CardWithPhoto from "../../components/CardWithPhoto";
import styles from "./styles";
import Button from "../../components/Button";
import Modall from "../../components/Modal";
import StarRating from "react-native-star-rating";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import context from "../../contexts/mainContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { request, PERMISSIONS } from "react-native-permissions";
const Init = (navigation, route, setIndex) => {
  const { userData, setUserData } = useContext(context);
  const [image, setImage] = useState(userData.profile_pic);
  const [modall, setModall] = useState(false);
  const [loading, setLoading] = useState(false);
  // modal
  const [modalVisible, setModalVisible] = useState(false);

  function truncate(input, length) {
    if (input.length > length) {
      return input.substring(0, length) + "...";
    }
    return input;
  }

  const cameraImage = async () => {
    launchCamera({ mediaTypes: "photo", quality: 0.5 }, onReceiveImage);
  };

  const onReceiveImage = (result) => {
    console.log("fotenha: " + result);

    if (!result.didCancel) {
      setModall(false);
      uploadPhoto(result.assets[0]);
    }
  };

  const pickImage = async () => {
    launchImageLibrary({ mediaTypes: "photo", quality: 0.5 }, onReceiveImage);
  };

  useFocusEffect(() => {
    if (route.params) {
      setIndex(route.params.title == "MainSearch" ? 1 : 0);
    }
    console.log(route);
    route.params = undefined;
  });

  const uploadPhoto = async (image) => {
    setLoading(true);
    const filePath = image.uri.split("/");
    const fileName = filePath[filePath.length - 1];
    const userId = await AsyncStorage.getItem("userId");

    try {
      const response = await api.post(
        "/profilePic",
        {
          client_id: userId,
          file_name: fileName,
        },
        {
          headers: {
            Authorization: "Bearer " + (await AsyncStorage.getItem("jwtToken")),
          },
        }
      );

      console.log({
        headers: { "Content-Type": `image/${fileName.split(".")[1]}` },
      });

      const file = await fetch(image.uri);
      const blob = await file.blob();

      const imageData = new File([blob], fileName);

      await fetch(response.data.upload_url, {
        method: "PUT",
        body: imageData,
        headers: {
          "Content-Type": `image/${fileName.split(".")[1]}`,
        },
      });

      setLoading(false);
      setImage(response.data.pic_url);

      setUserData({ ...userData, profile_pic: response.data.pic_url });
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== 'web') {
  //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       const { status: cameraPer } = await ImagePicker.requestCameraPermissionsAsync();
  //       if (status !== 'granted' && cameraPer !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   })();
  // }, []);

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Modall
        close={() => setModall(false)}
        buttons={() => {
          return (
            <>
              <TouchableOpacity
                onPress={() => pickImage()}
                style={{
                  borderRadius: 10,
                  height: 50,
                  backgroundColor: "#d9413f",
                  marginBottom: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff" }}>Escolher foto da galeria</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => cameraImage()}
                style={{
                  borderRadius: 10,
                  height: 50,
                  backgroundColor: "#d9413f",
                  marginBottom: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff" }}>Tirar foto</Text>
              </TouchableOpacity>
            </>
          );
        }}
        enabled={modall}
      />
      <View style={[styles.container, { marginTop: 20 }]}>
        <View style={styles.professionalContainerBar}>
          <View style={styles.professionalBar}>
            {loading && (
              <View
                style={{
                  borderRadius: 80,
                  aspectRatio: 1,
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 70,
                  height: 70,
                  zIndex: 1000,
                  backgroundColor: "#000b",
                }}
              >
                <ActivityIndicator size={"65%"} color="#d9413f" />
              </View>
            )}
            <TouchableOpacity
              onPress={() => setModall(true)}
              style={styles.pictureProfessional}
            >
              {image ? (
                <>
                  <Image
                    style={{ flex: 1, width: 70, height: 70, borderRadius: 80 }}
                    source={{ uri: image }}
                  />
                </>
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="square-edit-outline"
                    size={25}
                    color="#bbb"
                  />
                  <Text
                    style={{ color: "#bbb", fontWeight: "bold", fontSize: 12 }}
                  >
                    Editar
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.professionalInfoContainer}>
              <Text style={styles.nameProfessional}>{userData.name}</Text>
              <View style={styles.rateContainer}>
                <StarRating
                  rating={userData.rating}
                  containerStyle={{ width: 125 }}
                  starSize={20}
                  emptyStarColor="#444"
                  fullStarColor="#FFCC00"
                />
                <Text style={styles.rateText}>
                  ({userData.comments_count} {translate("rating")})
                </Text>
              </View>

              <Text style={styles.professionProfessional}>
                {truncate(Object.keys(userData.categories).join("/"), 30)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.professionalInfoBar}>
          <View style={styles.professionalInfoSlot}>
            <View style={styles.greenIconSlot}>
              <FontAwesome name="dollar" size={30} color="#fff" />
            </View>
            <View>
              <Text style={styles.professionalInfoSlotBigText}>
                {translate("coin_unit")} {userData.earnings_month}
              </Text>
              <Text style={styles.professionalInfoSmallBigText}>
                {translate("your_earnings")}
              </Text>
            </View>
          </View>
          <View style={styles.professionalInfoSlot}>
            <View style={styles.blueIconSlot}>
              <MaterialIcons name="work" size={30} color="#fff" />
            </View>
            <View>
              <Text style={styles.professionalInfoSlotBigText}>
                {userData.jobs_did}
              </Text>
              <Text style={styles.professionalInfoSmallBigText}>
                {translate("jobs_did")}
              </Text>
            </View>
          </View>
          <View style={styles.professionalInfoSlot}>
            <View style={styles.redIconSlot}>
              <Ionicons name="ios-eye" size={30} color="#fff" />
            </View>
            <View>
              <Text style={styles.professionalInfoSlotBigText}>
                {userData.profile_views}
              </Text>
              <Text style={styles.professionalInfoSmallBigText}>
                {translate("profile_viewers")}
              </Text>
            </View>
          </View>
        </View>

        <Button
          onPress={() => navigation.navigate("Portifolio")}
          width={"45%"}
          height={60}
          style={{ marginTop: 30 }}
          text="Portifólio"
        />
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAwareScrollView>
  );
};
const Search = () => {
  const [locationS, setLocation] = useState(null);
  const [position, setPosition] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    request(
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    ).then((result) => {});
    Geolocation.getCurrentPosition((info) => console.log(info));
  }, []);

  const onRegionChange = (region) => {
    setLocation(region);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container, { marginTop: 20 }]}>
        {locationS && (
          <MapView
            initialRegion={{
              latitude: locationS.latitude,
              longitude: locationS.longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.04,
            }}
            onRegionChange={onRegionChange}
            style={{
              width: Dimensions.get("window").width,
              marginBottom: 20,
              height: Dimensions.get("window").width,
            }}
          >
            {position && (
              <Marker
                image={marker}
                coordinate={{
                  latitude: position.latitude,
                  longitude: position.longitude,
                }}
              />
            )}
          </MapView>
        )}
        {[].length > 0 ? (
          [].map((elm) => (
            <CardWithPhoto
              name="Marcela Rabello"
              day="Qua, 18 Abril, 10h30min"
              service="Cabelo"
              uri="https://www.clicsargent.org.uk/wp-content/uploads/2018/09/Daisy-Aug2018-770x433-Teensyoungadults-752x433.jpg"
              buttons={[
                {
                  title: "Detalhes",
                  color: "#33B5E5",
                  onClick: () => console.log("Excluir"),
                },
                {
                  title: "Aceitar",
                  color: "#00C851",
                  onClick: () => console.log(""),
                },
                {
                  title: "Recusar",
                  color: "#FF0000",
                  onClick: () => console.log(""),
                },
              ]}
            />
          ))
        ) : (
          <Text>{translate("no_services")}</Text>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

const Main = ({ navigation, route }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: translate("home") },
    { key: "second", title: translate("search_services") },
  ]);
  const initialLayout = { width: Dimensions.get("window").width };
  const renderScene = SceneMap({
    first: () => Init(navigation, route, setIndex),
    second: Search,
  });

  return (
    <TabView
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: "rgb(242, 242, 242)" }}
          labelStyle={{ color: "#999", fontWeight: "bold" }}
          indicatorStyle={{ backgroundColor: "#FC5E5B" }}
        />
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      sceneContainerStyle={{ backgroundColor: "#eee" }}
    />
  );
};

export default Main;
