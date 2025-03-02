import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile/Profile";
import ContactInformation from "../screens/ContantInformation/ContantInformation";
import OfflineData from "../screens/OfflineData/OfflineData";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ContactInformation"
        component={ContactInformation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="OfflineData"
        component={OfflineData}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
