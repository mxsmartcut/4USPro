import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Accordion from "react-native-collapsible/Accordion";
import styles from "./styles";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Context from "../../contexts/mainContext";
import moment from "moment";
import { translate } from "../../../i18n/src/locales";
const Profile = ({ navigation }) => {
  const { userData } = useContext(Context);
  const [activeSections, setActiveSections] = useState([]);
  const SECTIONS = [
    {
      title: translate("my_data"),
      content: [
        { label: translate("name"), value: userData.name },
        {
          label: translate("birthday_mini"),
          value: moment(userData.nascimento).format("DD/MM/YYYY"),
        },
        userData.cpf && {
          label: translate("cpf"),
          value: userData.cpf.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            "$1.$2.$3/$4"
          ),
        },
        {
          label: translate("gender"),
          value: userData.sexo == "M" ? translate("female") : translate("male"),
        },
      ],
      icon: "user",
    },
    {
      title: translate("my_address"),
      content: [
        {
          label: translate("address"),
          value: userData.street + ", " + userData.number,
        },
        { label: translate("neighborhood"), value: userData.neighborhood },
        {
          label: translate("cep"),
          value: userData?.zip?.replace(/(\d{5})(\d{3})/, "$1-$2"),
        },
        { label: translate("city"), value: userData.city },
      ],
      icon: "home",
    },
    {
      title: translate("my_bank_account"),
      content: userData.bank_details,
      icon: "credit-card",
    },
  ];

  const renderHeader = (section) => {
    return (
      <View style={styles.header}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <SimpleLineIcons name={section.icon} size={24} color="#555" />
          <Text style={[styles.headerText, { marginLeft: 10 }]}>
            {section.title}
          </Text>
        </View>
        <AntDesign name="down" size={15} color="black" />
      </View>
    );
  };

  const renderContent = (section) => {
    if (Array.isArray(section.content))
      return section.content.map((elm) => {
        if (elm)
          return (
            <View key={Math.random()} style={styles.content}>
              <Text style={styles.contentLabel}>{elm.label}: </Text>
              <Text>{elm.value}</Text>
            </View>
          );
      });

    if (section.title == translate("my_bank_account")) {
      if (!section.content) {
        return (
          <View key={Math.random()} style={{ alignItems: "center" }}>
            <Text>{translate("dont_have_bank_account")}</Text>
            <Button
              onPress={() => navigation.navigate("AddBank")}
              height={30}
              text={translate("add")}
            />
          </View>
        );
      } else {
        return (
          <>
            <View key={Math.random()} style={styles.content}>
              <Text style={styles.contentLabel}>{translate("name")}: </Text>
              <Text>{section.content.name}</Text>
            </View>
            <View key={Math.random()} style={styles.content}>
              <Text style={styles.contentLabel}>
                {translate("account_number")}:{" "}
              </Text>
              <Text>{section.content.account_number}</Text>
            </View>
            <View key={Math.random()} style={styles.content}>
              <Text style={styles.contentLabel}>
                {translate("account_type")}:{" "}
              </Text>
              <Text>
                {section.content.account_type == "1"
                  ? translate("checking_account")
                  : translate("saving_account")}
              </Text>
            </View>
            <View key={Math.random()} style={styles.content}>
              <Text style={styles.contentLabel}>{translate("agency")}: </Text>
              <Text>{section.content.agency}</Text>
            </View>
            <View key={Math.random()} style={styles.content}>
              <Text style={styles.contentLabel}>
                {translate("bank_name")}:{" "}
              </Text>
              <Text>{section.content.bank_name.slice(0, 25) + "..."}</Text>
            </View>
            <View key={Math.random()} style={styles.content}>
              <Text style={styles.contentLabel}>{translate("cpf")}: </Text>
              <Text>
                {section.content.identifier.replace(
                  /([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/,
                  "$1.$2.$3/$4"
                )}
              </Text>
            </View>
            <Button
              onPress={() => navigation.navigate("AddBank")}
              height={30}
              text={translate("change")}
            />
          </>
        );
      }
    }

    return <View key={Math.random()} style={styles.content}></View>;
  };

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container, { marginTop: 15 }]}>
        <Accordion
          key={Math.random()}
          activeSections={activeSections}
          sections={SECTIONS}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={updateSections}
          containerStyle={{ width: "80%" }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Profile;
