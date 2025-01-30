import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import * as LucideIcons from "lucide-react-native";
import { BlurView } from "expo-blur";

const IconLucide = ({ name, size = 24, color = "black" }) => {
  const LucideIcon = LucideIcons[name]; // Access the icon dynamically
  if (!LucideIcon) {
    return null; // Handle cases where the icon name is incorrect
  }
  return <LucideIcon size={size} color={color} />;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const Menu = ({ Navigation }) => {
  const [focusedField, setFocusedField] = useState(null);

  return (
    <View style={styles.container}>
      <BlurView
        intensity={10}
        tint="light"
        experimentalBlurMethod="dynamicallyColoredBackdrop"
        style={styles.menuMainContainer}
      >
        <TouchableOpacity onPress={() => setFocusedField("CircleUser")}>
          <View style={styles.iconContainer}>
            <IconLucide
              name="CircleUser"
              size={23}
              color={focusedField === "CircleUser" ? "#3E9A32" : "black"}
            />
            <Text
              style={{
                color: focusedField === "CircleUser" ? "#3E9A32" : "black",
              }}
            >
              Profile
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFocusedField("LayoutDashboard")}>
          <View style={styles.iconContainer}>
            <IconLucide
              name="WifiOff"
              size={23}
              color={focusedField === "LayoutDashboard" ? "#3E9A32" : "black"}
            />
            <Text
              style={{
                color: focusedField === "LayoutDashboard" ? "#3E9A32" : "black",
              }}
            >
              Offline Data
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFocusedField("Stethoscope")}>
          <View style={styles.iconContainer}>
            <IconLucide
              name="Stethoscope"
              size={23}
              color={focusedField === "Stethoscope" ? "#3E9A32" : "black"}
            />
            <Text
              style={{
                color: focusedField === "Stethoscope" ? "#3E9A32" : "black",
              }}
            >
              Routine Care
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFocusedField("User")}>
          <View style={styles.iconContainer}>
            <IconLucide
              name="User"
              size={23}
              color={focusedField === "User" ? "#3E9A32" : "black"}
            />
            <Text
              style={{ color: focusedField === "User" ? "#3E9A32" : "black" }}
            >
              User Account
            </Text>
          </View>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    position: "absolute",
    top: windowHeight * 0.90,
    flexDirection:'row',
    justifyContent:'center'
  },

  menuMainContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: windowWidth * 0.94,
    height: windowHeight * 0.07,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Green,
    gap: 20,
    overflow: "hidden", 
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    
  },
});

export default Menu;
