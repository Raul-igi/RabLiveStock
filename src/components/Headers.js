import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as LucideIcons from "lucide-react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const IconLucide = ({ name, size = 24, color = "black" }) => {
  const LucideIcon = LucideIcons[name]; // Access the icon dynamically
  if (!LucideIcon) {
    return null; // Handle cases where the icon name is incorrect
  }
  return <LucideIcon size={size} color={color} />;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const  Headers = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>

      <View>
        <View style={styles.menuHamburger}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconLucide name="AlignJustify" size={23} color={Colors.solidWhite} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.notificatioinProfileMainContainer}>
        <TouchableOpacity>
          <View style={styles.notificationContainer}>
            <IconLucide name="Bell" size={16} color={Colors.solidWhite} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <View style={styles.profileContainer}>
            <Text style={styles.profileText}>IG</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf:"center",
    padding:20,
    paddingTop:60,
    //marginTop: 20,
    width: windowWidth,
    height: 90,
    backgroundColor:Colors.Green,
   
  },

  notificationContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    width: 28,
    height: 28,
  },

  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Green,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.solidWhite,
    width: 28,
    height: 28,
  },

  profileText: {
    fontSize: 17,
    color: Colors.solidWhite,
  },

  menuHamburger: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Green,
    width: 30,
  },

  notificatioinProfileMainContainer:{
    flexDirection:"row",
    justifyContent:"center",
    gap:10
  }
});

export default Headers;
