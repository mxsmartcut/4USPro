import React, { useContext, useState, useEffect, useRef } from "react";
import { translate } from "../../../i18n/src/locales";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Modal,
} from "react-native";
import Modall from "../../components/Modal";

import Video from "react-native-video";
import VideoPlayer from "react-native-video-controls";
import Icon from "react-native-vector-icons/FontAwesome5";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import api from "../../services/api";
import styles from "./styles";
import context from "../../contexts/mainContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import defaultThumb from "../../images/defaultThumb.jpeg";
import Picker from "../../components/Picker";
import Button from "../../components/Button";

import { request, PERMISSIONS } from "react-native-permissions";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const Portifolio = ({ navigation }) => {
  const { userData, setUserData, setLoad } = useContext(context);
  const [selectedSpecialties, setSelectedSpecialties] = useState("");
  const [modal, setModal] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [videoThumb, setVideoThumb] = useState(
    userData.portfolio_video.thumbnail
      ? userData.portfolio_video.thumbnail + "?key=" + Math.random()
      : defaultThumb
  );
  const [video, setVideo] = useState(
    userData.portfolio_video.video + "?key=" + Math.random()
  );

  const [videoIsLoaded, setVideoIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggleResizeModeOnFullscreen] = useState(true);
  const [tapAnywhereToPause] = useState(true);
  const [currentPlaybackTime] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0.1);
  const [paused, setPaused] = useState(true);
  const [overlay, setOverlay] = useState(false);

  const videoRef = useRef();

  const uploadThumb = async (image) => {
    setLoading(true);
    const filePath = image.uri.split("/");
    const fileName = filePath[filePath.length - 1];
    const userId = await AsyncStorage.getItem("userId");

    try {
      const response = await api.post(
        "/portfolioVideo",
        {
          client_id: userId,
          file_name: fileName,
          video_name: ".mp4",
        },
        {
          headers: {
            Authorization: "Bearer " + (await AsyncStorage.getItem("jwtToken")),
          },
        }
      );

      const file = await fetch(image.uri);
      const blob = await file.blob();

      const imageData = new File([blob], fileName);

      await fetch(response.data["thumbnail"].upload_url, {
        method: "PUT",
        body: imageData,
        headers: {
          "Content-Type": `image/${fileName.split(".")[1]}`,
        },
      });

      setVideoThumb(
        "https://image.freepik.com/free-photo/grey-paper-texture_1253-25.jpg"
      );

      const newData = { ...userData };

      newData.portfolio_video.thumbnail =
        response.data["thumbnail"].url + "?key=" + Math.random();
      setUserData(newData);
      setVideoThumb(response.data["thumbnail"].url + "?key=" + Math.random());
      setLoading(false);

      console.log("thumb" + response.data["thumbnail"].url);
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  const uploadVideo = async (image) => {
    setLoading(true);
    const filePath = image.uri.split("/");
    const fileName = filePath[filePath.length - 1];
    const userId = await AsyncStorage.getItem("userId");

    try {
      const response = await api.post(
        "/portfolioVideo",
        {
          client_id: userId,
          file_name: ".jpg",
          video_name: fileName,
        },
        {
          headers: {
            Authorization: "Bearer " + (await AsyncStorage.getItem("jwtToken")),
          },
        }
      );

      const file = await fetch(image.uri);
      const blob = await file.blob();

      const imageData = new File([blob], fileName);

      await fetch(response.data["video"].upload_url, {
        method: "PUT",
        body: imageData,
        headers: {
          "Content-Type": `video/${fileName.split(".")[1]}`,
        },
      });

      setVideo(false);

      setTimeout(
        () => setVideo(response.data["video"].url + "?key=" + Math.random()),
        500
      );
      console.log(response.data["video"].url);
      setLoading(false);

      const newData = { ...userData };
      newData.portfolio_video.video =
        response.data["video"].url + "?key=" + Math.random();
      setUserData(newData);
    } catch (err) {
      console.log(err);
    }
  };

  // const pickThumb = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     aspect: [16, 9],
  //     quality: 0.9,
  //     allowsEditing: true,
  //   });
  const onReceiveImg = (result) => {
    console.log(result);

    if (!result.didCancel) {
      setModal(false);
      uploadThumb(result.assets[0]);
    }
  };

  const pickThumb = async () => {
    launchImageLibrary({ mediaTypes: "photo", quality: 0.9 }, onReceiveImg);
  };

  const addNewCategory = async (sub, cat) => {
    const userId = await AsyncStorage.getItem("userId");
    try {
      const newUserData = { ...userData };
      if (!Array.isArray(newUserData.categories[cat])) {
        newUserData.categories[cat] = [];
      }

      const index = newUserData.categories[cat].indexOf(sub);

      if (index > -1) {
        newUserData.categories[cat].splice(index, 1);
      } else {
        newUserData.categories[cat].push(sub);
      }
      console.log(index);
      console.log(newUserData.categories[cat]);
      setUserData(newUserData);

      console.log({ client_id: userId, sub_category: sub, category: cat });
      await api.post(
        "/toggleServicesUser",
        { client_id: userId, sub_category: sub, category: cat },
        {
          headers: {
            Authorization: "Bearer " + (await AsyncStorage.getItem("jwtToken")),
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onReceiveVideo = async (result) => {
    if (!result.didCancel) {
      setModal(false);
      uploadVideo(result.assets[0]);
    }
  };
  const pickVideo = async () => {
    launchImageLibrary({ mediaType: "video" }, onReceiveVideo);
  };

  const getCategories = async () => {
    setLoad(true);
    try {
      const userId = await AsyncStorage.getItem("userId");
      // console.log(userId, await AsyncStorage.getItem('jwtToken'))

      const { data } = await api.post(
        "/listServices",
        { client_id: userId, region: translate("region") },
        {
          headers: {
            Authorization: "Bearer " + (await AsyncStorage.getItem("jwtToken")),
          },
        }
      );
      console.log(data);
      if (Array.isArray(data)) {
        setSpecialties(data);
        setSelectedSpecialties(Object.keys(data)[0]);
      }

      setLoad(false);
    } catch (err) {
      console.log(data);
      setLoad(false);
    }
  };

  useEffect(() => {
    (async () => {
      request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      request(PERMISSIONS.ANDROID.CAMERA);
    })();

    getCategories();
  }, []);

  const onLoad = () => {
    setVideoIsLoaded(true);
  };

  const onEnterFullscreen = () => {
    setFullscreen(true);
  };
  const onExitFullscreen = () => {
    setFullscreen(false);
  };
  const onProgress = () => ({
    currentTime: 0,
    playableDuration: 34.6,
    seekableDuration: 888,
  });

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* {video && fullscreen && (
        <Modal>
          <Video
            paused={paused}
            resizeMode="cover"
            onLoad={onLoad}
            onProgress={onProgress}
            style={[
              styles.videoC,
              {
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: "100%",
                zIndex: 20,
              },
            ]}
            source={{
              uri: video,
            }}
            ref={videoRef}
            navigator={navigation}
          />
        </Modal>
      )} */}
      <Modall
        close={() => setModal(false)}
        buttons={() => {
          return (
            <>
              <TouchableOpacity
                onPress={() => pickThumb()}
                style={{
                  borderRadius: 10,
                  height: 50,
                  backgroundColor: "#d9413f",
                  marginBottom: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff" }}>
                  Escolher a capa do video na galeria
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => pickVideo()}
                style={{
                  borderRadius: 10,
                  height: 50,
                  backgroundColor: "#d9413f",
                  marginBottom: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff" }}>
                  Escolher video de portifólio
                </Text>
              </TouchableOpacity>
            </>
          );
        }}
        enabled={modal}
      />
      <View
        style={[
          { flex: 1 },
          fullscreen && {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
            zIndex: 20,
          },
        ]}
      >
        <View
          style={[
            styles.containerVideo,
            fullscreen && {
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              width: "100%",
              height: "100%",
              zIndex: 20,
            },
          ]}
        >
          <View style={{ width: "90%", alignItems: "flex-start" }}>
            <Text style={{ color: "#53489D", marginTop: 10 }}>
              Video de apresentação
            </Text>
          </View>
          <View style={styles.video}>
            <TouchableOpacity
              onPress={() => {
                setModal(true);
              }}
              style={{
                zIndex: 10,
                position: "absolute",
                right: 5,
                top: 5,
                elevation: 5,
              }}
            >
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>

            {loading && (
              <View
                style={{
                  borderRadius: 8,
                  elevation: 10,
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  zIndex: 1000,
                  backgroundColor: "#000b",
                }}
              >
                <ActivityIndicator size={"50%"} color="#d9413f" />
              </View>
            )}
            {paused && (
              <View
                style={{
                  alignItems: "center",
                  position: "absolute",
                  zIndex: 8,
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  style={styles.videoC}
                  source={
                    typeof videoThumb === "string"
                      ? { uri: videoThumb }
                      : videoThumb
                  }
                />
                {videoIsLoaded && (
                  <TouchableOpacity
                    onPress={() => {
                      setPaused(!paused);
                    }}
                    style={{ position: "absolute" }}
                  >
                    <AntDesign name="playcircleo" size={60} color="#fff9" />
                  </TouchableOpacity>
                )}
                {video && !videoIsLoaded && (
                  <ActivityIndicator
                    size={"large"}
                    color={"#d9413f"}
                    style={{ position: "absolute" }}
                  />
                )}
              </View>
            )}

            {video && (
              <Video
                paused={paused}
                resizeMode="contain"
                onLoad={onLoad}
                onProgress={onProgress}
                style={[styles.videoC]}
                source={{
                  uri: video,
                }}
                ref={videoRef}
                navigator={navigation}
              />

              /* {video &&  (
              <VideoPlayer
                toggleResizeModeOnFullscreen={toggleResizeModeOnFullscreen}
                tapAnywhereToPause={tapAnywhereToPause}
                fullscreen={fullscreen}
                paused={paused}
                onLoad={onLoad}
                onEnterFullscreen={onEnterFullscreen}
                onExitFullscreen={onExitFullscreen}
                style={[
                  styles.videoC,
                  fullscreen && {
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 20,
                  },
                ]}
                source={{
                  uri: video,
                }}
                ref={videoRef}
                navigator={navigation}
              />
            )} */
            )}
          </View>
        </View>

        <View style={[styles.containerVideo, { borderBottomWidth: 0 }]}>
          <View style={{ width: "90%", alignItems: "flex-start" }}>
            <Text style={{ color: "#53489D", marginTop: 10 }}>
              Especialidades
            </Text>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Picker
                width={"90%"}
                value={selectedSpecialties}
                onValueChange={(e) => setSelectedSpecialties(e)}
                hideName
                options={specialties.map(({ Name }, index) => {
                  return { value: index, label: Name };
                })}
              />
            </View>

            <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
              {specialties[selectedSpecialties] &&
                Object.keys(specialties[selectedSpecialties].Services).map(
                  (e) => (
                    <Button
                      key={Math.random()}
                      onPress={async () => {
                        addNewCategory(e, selectedSpecialties);
                      }}
                      backgroundColor={
                        userData.categories[selectedSpecialties]
                          ? userData.categories[selectedSpecialties].findIndex(
                              (i) => i === e
                            ) >= 0
                            ? "#d9413f"
                            : "#555"
                          : "#555"
                      }
                      style={{ alignText: "center" }}
                      height={40}
                      text={e}
                    />
                  )
                )}
            </View>
          </View>
        </View>
        <Button
          onPress={() =>
            navigation.navigate("Prices", { categories: specialties })
          }
          style={{ alignSelf: "center", marginTop: 25 }}
          width={"50%"}
          height={40}
          text={"Tabela de Preços"}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Portifolio;
