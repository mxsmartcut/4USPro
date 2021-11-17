import "react-native-gesture-handler";
import * as React from "react";
import { useContext } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import MainContext from "./src/contexts/mainContext";
import OneSignal from "react-native-onesignal";
import * as Font from "expo-font";
import { Image, View, Text, TouchableOpacity } from "react-native";
import Loading from "./src/components/Loading";

import ForgotPass from "./src/screens/ForgotPass";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Main from "./src/screens/Main";
import Portifolio from "./src/screens/Portifolio";
import Register from "./src/screens/Register/Register1";
import Register2 from "./src/screens/Register/Register2";
import Register3 from "./src/screens/Register/Register3";
import Register4 from "./src/screens/Register/Register4";
import Register5 from "./src/screens/Register/Register5";
import Register6 from "./src/screens/Register/Register6";
import Messages from "./src/screens/Messages";
import Schedules from "./src/screens/Schedules";
import Earnings from "./src/screens/Earnings";
import Profile from "./src/screens/Profile";
import PriceTable from "./src/screens/PriceTable";
import Reference from "./src/screens/Reference";
import AddBank from "./src/screens/AddBank";
import ModalAtt from "./src/components/ModalAtt";

import Amplify, { Auth } from "aws-amplify";
import { amplifyConfig, oneSignalkey } from "./src/config/config.json";
import { useState } from "react";
import { StatusBar } from "react-native";
import { translate } from "./i18n/src/locales";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const headerWithLogo = {
  headerTitle: () => (
    <Image
      source={require("./src/images/logo.png")}
      resizeMode="contain"
      style={{ width: 150, marginTop: 15 }}
    />
  ),
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "rgb(242, 242, 242)",
    shadowRadius: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
};
const headerNoLogo = {
  headerTitleStyle: { color: "#444" },
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "rgb(242, 242, 242)",

    elevation: 0,
  },
};

const customDrawer = (props, setLogged, setUserData) => {
  return (
    <>
      <DrawerContentScrollView
        {...props}
        style={{ backgroundColor: "rgb(242, 242, 242)" }}
      >
        <DrawerItemList
          itemStyle={{
            borderBottomWidth: 1,
            borderBottomColor: "#999",
            backgroundColor: "rgb(242, 242, 242)",
            marginTop: 8,
          }}
          labelStyle={{ fontSize: 18, fontWeight: "bold" }}
          activeTintColor="#555"
          inactiveTintColor="#555"
          {...props}
        />
        <TouchableOpacity
          onPress={() => {
            setLogged(false);
            setUserData(null);
            Auth.signOut();
          }}
          style={{ backgroundColor: "rgb(242, 242, 242)", marginTop: 15 }}
        >
          <Text
            style={{
              color: "#FC5E5B",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 50,
            }}
          >
            Sair
          </Text>
        </TouchableOpacity>
      </DrawerContentScrollView>

      <View
        style={{
          alignItems: "center",
          height: "20%",
          justifyContent: "center",
          backgroundColor: "rgb(242, 242, 242)",
        }}
      >
        <Image
          source={require("./src/images/logo.png")}
          resizeMode="contain"
          style={{ height: "50%" }}
        />
      </View>
    </>
  );
};

const MainDrawer = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <SimpleLineIcons
                style={{ marginLeft: 25 }}
                name="menu"
                size={20}
                color="#555"
              />
            </TouchableOpacity>
          ),
          ...headerNoLogo,
          headerTitle: translate("home"),
        }}
        initialParams={{ title: "Main" }}
        name="Main"
        component={Main}
      />
      <Stack.Screen
        options={{ ...headerNoLogo, headerTitle: "Portifólio" }}
        name="Portifolio"
        component={Portifolio}
      />
      <Stack.Screen
        options={{ ...headerNoLogo, headerTitle: "Preços" }}
        name="Prices"
        component={PriceTable}
      />
    </Stack.Navigator>
  );
};
const MainDrawerSearch = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <SimpleLineIcons
                style={{ marginLeft: 25 }}
                name="menu"
                size={20}
                color="#555"
              />
            </TouchableOpacity>
          ),
          ...headerNoLogo,
          headerTitle: translate("home"),
        }}
        initialParams={{ title: "MainSearch" }}
        name="MainSearch"
        component={Main}
      />
      <Stack.Screen
        options={{ ...headerNoLogo, headerTitle: "Portifólio" }}
        name="Portifolio"
        component={Portifolio}
      />
    </Stack.Navigator>
  );
};
const MessagesNav = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <SimpleLineIcons
                style={{ marginLeft: 25 }}
                name="menu"
                size={20}
                color="#555"
              />
            </TouchableOpacity>
          ),
          ...headerNoLogo,
          headerTitle: translate("messages"),
        }}
        name="Messages"
        component={Messages}
      />
    </Stack.Navigator>
  );
};
const SchedulesNav = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <SimpleLineIcons
                style={{ marginLeft: 25 }}
                name="menu"
                size={20}
                color="#555"
              />
            </TouchableOpacity>
          ),
          ...headerNoLogo,
          headerTitle: translate("schedules"),
        }}
        name="Schedules"
        component={Schedules}
      />
    </Stack.Navigator>
  );
};
const EarningsNav = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <SimpleLineIcons
                style={{ marginLeft: 25 }}
                name="menu"
                size={20}
                color="#555"
              />
            </TouchableOpacity>
          ),
          ...headerNoLogo,
          headerTitle: translate("payments"),
        }}
        name="Recebimentos"
        component={Earnings}
      />
    </Stack.Navigator>
  );
};
const ProfileNav = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <SimpleLineIcons
                style={{ marginLeft: 25 }}
                name="menu"
                size={20}
                color="#555"
              />
            </TouchableOpacity>
          ),
          ...headerNoLogo,
          headerTitle: translate("profile"),
        }}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{ ...headerNoLogo, headerTitle: "Adicionar Banco" }}
        name="AddBank"
        component={AddBank}
      />
    </Stack.Navigator>
  );
};
const RefNav = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <SimpleLineIcons
                style={{ marginLeft: 25 }}
                name="menu"
                size={20}
                color="#555"
              />
            </TouchableOpacity>
          ),
          ...headerNoLogo,
          headerTitle: translate("refers"),
        }}
        name="Profile"
        component={Reference}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [load, setLoad] = useState(false);
  const [logged, setLogged] = useState(false);
  const [userData, setUserData] = useState({});
  const [loaded] = Font.useFonts({
    Lato: require("./assets/fonts/Lato.ttf"),
    FuturaLT: require("./assets/fonts/FuturaLT.ttf"),
    Helvetica: require("./assets/fonts/Helvetica.ttf"),
  });

  if (!loaded) {
    return null;
  }

  Amplify.configure(amplifyConfig);
  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId(oneSignalkey);

  return (
    <>
      <StatusBar backgroundColor="rgb(242, 242, 242)" barStyle="dark-content" />
      <MainContext.Provider
        value={{ load, setLoad, logged, setLogged, userData, setUserData }}
      >
        <ModalAtt />

        <NavigationContainer>
          {logged ? (
            //modal fragment
            <>
              <Drawer.Navigator
                drawerContent={(props) =>
                  customDrawer(props, setLogged, setUserData)
                }
              >
                <Drawer.Screen
                  options={{
                    drawerIcon: () => (
                      <SimpleLineIcons name="home" size={24} color="#555" />
                    ),
                    headerTitle: translate("home"),
                    title: translate("home"),
                  }}
                  name="Main"
                  initialParams={{ title: "Main" }}
                  component={MainDrawer}
                />
                <Drawer.Screen
                  options={{
                    drawerIcon: () => (
                      <SimpleLineIcons
                        name="magnifier"
                        size={24}
                        color="#555"
                      />
                    ),
                    title: translate("search_services"),
                    headerTitle: translate("search_services"),
                  }}
                  name="MainSearch"
                  initialParams={{ title: "MainSearch" }}
                  component={MainDrawerSearch}
                />
                <Drawer.Screen
                  options={{
                    drawerIcon: () => (
                      <SimpleLineIcons name="calendar" size={24} color="#555" />
                    ),
                    title: translate("schedules"),
                    headerTitle: translate("schedules"),
                  }}
                  name="Agendamentos"
                  component={SchedulesNav}
                />
                <Drawer.Screen
                  options={{
                    drawerIcon: () => (
                      <SimpleLineIcons name="speech" size={24} color="#555" />
                    ),
                    title: translate("messages"),
                    headerTitle: translate("messages"),
                  }}
                  name="Messages"
                  component={MessagesNav}
                />
                <Drawer.Screen
                  options={{
                    drawerIcon: () => (
                      <SimpleLineIcons
                        name="credit-card"
                        size={24}
                        color="#555"
                      />
                    ),
                    title: translate("payments"),
                    headerTitle: translate("payments"),
                  }}
                  name="Earnings"
                  component={EarningsNav}
                />
                <Drawer.Screen
                  options={{
                    drawerIcon: () => (
                      <SimpleLineIcons name="user" size={24} color="#555" />
                    ),
                    title: translate("profile"),
                    headerTitle: translate("profile"),
                  }}
                  name="e"
                  component={ProfileNav}
                />
                <Drawer.Screen
                  options={{
                    drawerIcon: () => (
                      <SimpleLineIcons name="people" size={24} color="#555" />
                    ),
                    title: translate("refers"),
                    headerTitle: translate("refers"),
                  }}
                  name="Refers"
                  component={RefNav}
                />
              </Drawer.Navigator>
            </>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                options={headerWithLogo}
                name="Home"
                component={Home}
              />
              <Stack.Screen
                options={headerWithLogo}
                name="ForgotPass"
                component={ForgotPass}
              />
              <Stack.Screen
                options={headerWithLogo}
                name="Login"
                component={Login}
              />
              <Stack.Screen
                options={headerWithLogo}
                name="Register"
                component={Register}
              />
              <Stack.Screen
                options={headerWithLogo}
                name="Register2"
                component={Register2}
              />
              <Stack.Screen
                options={headerWithLogo}
                name="Register3"
                component={Register3}
              />
              <Stack.Screen
                options={headerWithLogo}
                name="Register4"
                component={Register4}
              />
              <Stack.Screen
                options={headerWithLogo}
                name="Register5"
                component={Register5}
              />
              <Stack.Screen
                options={headerWithLogo}
                name="Register6"
                component={Register6}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
        {load && <Loading />}
      </MainContext.Provider>
    </>
  );
}
