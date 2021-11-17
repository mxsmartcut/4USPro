import React, { useState, useEffect } from "react";
import { translate } from "../../../i18n/src/locales";
import { View, Text } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PriceTable = ({ navigation, route }) => {
  const coin_unit = translate("coin_unit");

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {console.log(route.params.categories)}
      <View style={{ flex: 1 }}>
        <View style={{ width: "90%", alignSelf: "center" }}>
          {route.params &&
            route.params.categories &&
            route.params.categories.map((e) => (
              <>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#d9413f",
                      fontWeight: "bold",
                    }}
                  >
                    {e.Name}
                  </Text>
                </View>
                <View style={{ marginLeft: 5 }}>
                  {Object.keys(e.Services).map((cat) => (
                    <Text>
                      {cat} - {coin_unit} {e.Services[cat]}
                    </Text>
                  ))}
                </View>
              </>
            ))}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PriceTable;
