import React, { useState, useContext } from "react";
import { translate } from "../../../../i18n/src/locales";
import { View, Text, Image } from "react-native";

import Button from "../../../components/Button";
import Input from "../../../components/Input";
import PickerElm from "../../../components/Picker";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CheckBox from "../../../components/CheckBox";
import { Auth } from "aws-amplify";
import context from "../../../contexts/mainContext";
import * as ImagePicker from "expo-image-picker";
const Register6 = ({ navigation, route }) => {
  const mainContext = useContext(context);
  const [acad, setAcad] = useState("");
  const [professionTime, setProfessionTime] = useState("");
  const [acadFinalized, setAcadFinalized] = useState("");
  const [acadTel, setAcadTel] = useState("");
  const [acadYear, setAcadYear] = useState("");
  const [acadName, setAcadName] = useState("");

  const [work, setWork] = useState("");

  const [workNameStudio, setWorkNameStudio] = useState("");

  const [workAdressStudio, setWorkAdressStudio] = useState("");

  const [workTel, setWorkTel] = useState("");

  const [uploadPhoto, setUploadPhoto] = useState("");

  const [hasDegree, setHasDegree] = useState(false);
  const [winFreeCourse, setWinFreeCourse] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setUploadPhoto(result);
    } else {
    }
  };
  const nextStep = async () => {
    if (professionTime == "") {
      return;
    }

    if (professionTime == "1") {
      alert(
        "Desculpe você não conseguiu a nossa aprovação automática, mas não fique triste ainda podemos entrar em contato com você"
      );
      navigation.navigate("Login");
      return;
    }
    /*
   const response = await api.post('/checkAttribute',{
      attributeName:'email',
      attributeValue:email,
    })
    */

    const createAccountData = route.params;

    console.log(createAccountData);

    try {
      mainContext.setLoad(true);
      //Promise.all([

      //
      //])
      const account = await Auth.signUp(createAccountData);

      console.log(account);
      setErrorMessage("");
      navigation.navigate("Login");
      alert("Confirme seu email para finalizar o cadastro");
      mainContext.setLoad(false);
    } catch (err) {
      console.log(err);
      mainContext.setLoad(false);
      alert("Erro na criação da conta");
      navigation.navigate("Login");
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container]}>
        <View style={{ alignItems: "center", width: "100%" }}>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>
              {translate("sixth_step_register")}
            </Text>
          </View>
          <View style={[styles.inputsContainer]}>
            <PickerElm
              value={acad}
              width={"80%"}
              name={translate("question_info_your_course")}
              onValueChange={setAcad}
              options={[
                { value: "", label: translate("select_input") },
                { value: "1", label: translate("yes") },
                { value: "2", label: translate("no") },
              ]}
            />
            {acad == "1" ? (
              <View style={{ width: "90%", alignItems: "center" }}>
                <Input
                  onChangeText={setAcadName}
                  value={acadName}
                  width={"80%"}
                  name={translate("institution_name")}
                />
                <PickerElm
                  value={acadFinalized}
                  width={"80%"}
                  name={translate("question_finalized_course")}
                  onValueChange={setAcadFinalized}
                  options={[
                    { value: "", label: translate("select_input") },
                    { value: "1", label: translate("yes") },
                    { value: "2", label: translate("no") },
                  ]}
                />
                <Input
                  onChangeText={setAcadTel}
                  value={acadTel}
                  width={"80%"}
                  name={translate("telephone")}
                />
                <Input
                  onChangeText={setAcadYear}
                  value={acadYear}
                  width={"80%"}
                  name={translate("course_end_time")}
                />
              </View>
            ) : null}

            <PickerElm
              value={work}
              width={"80%"}
              name={translate("worked_in_some_studio")}
              onValueChange={(e) => {
                setWork(e);
              }}
              options={[
                { value: "", label: translate("select_input") },
                { value: "1", label: translate("yes") },
                { value: "2", label: translate("no") },
              ]}
            />
            {work == "1" ? (
              <View style={{ width: "90%", alignItems: "center" }}>
                <Input
                  onChangeText={setWorkNameStudio}
                  value={workNameStudio}
                  width={"80%"}
                  name={translate("studio_name")}
                />
                <Input
                  onChangeText={setWorkAdressStudio}
                  value={workAdressStudio}
                  width={"80%"}
                  name={translate("studio_address")}
                />
                <Input
                  onChangeText={setWorkTel}
                  value={workTel}
                  width={"80%"}
                  name={translate("telephone")}
                />
              </View>
            ) : null}

            <PickerElm
              value={professionTime}
              width={"80%"}
              name={translate("how_long_profession")}
              onValueChange={(e) => {
                setProfessionTime(e);
              }}
              options={[
                { value: "", label: translate("select_input") },
                { value: "1", label: translate("less_than_a_year") },
                { value: "2", label: translate("one_year") },
                { value: "3", label: translate("two_years") },
                { value: "4", label: translate("three_years_or_more") },
              ]}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                width: "80%",
                marginTop: 8,
              }}
            >
              <CheckBox setChecked={setHasDegree} isChecked={hasDegree} />
              <Text style={{ fontSize: 16 }}>{translate("has_degree")}</Text>
            </View>
            {hasDegree && (
              <Button
                onPress={pickImage}
                width={"40%"}
                height={40}
                text={translate("choose_picture_degree")}
                style={{ marginLeft: 0 }}
              />
            )}
            {!!uploadPhoto && (
              <Image
                resizeMode="contain"
                style={{ width: 200, height: 200 }}
                source={uploadPhoto}
              />
            )}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                width: "80%",
                marginTop: 8,
              }}
            >
              <CheckBox
                setChecked={setWinFreeCourse}
                isChecked={winFreeCourse}
              />
              <Text style={{ fontSize: 16 }}>
                {translate("win_free_course")}
              </Text>
            </View>
            <Text
              style={{
                color: "#d00",
                fontSize: 15,
                textAlign: "left",
                width: "80%",
              }}
            >
              {errorMessage}
            </Text>
            <View style={[styles.buttonContainer]}>
              <Button
                onPress={() => nextStep()}
                width={"50%"}
                text={translate("continue")}
                style={{ marginLeft: 0 }}
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register6;
