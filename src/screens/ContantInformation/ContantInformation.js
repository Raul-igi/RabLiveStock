import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState,useEffect } from "react";
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Menu from "../../components/Menu";
import Headers from "../../components/Headers";
import { Dropdown } from "react-native-element-dropdown";
import ContactInformationDT from "./ContantInformationDT"
import * as LucideIcons from "lucide-react-native";
import apiService from "../apiService/apiService";

const IconLucide = ({ name, size = 24, color = "black" }) => {
  const LucideIcon = LucideIcons[name];
  if (!LucideIcon) {
    return null;
  }
  return <LucideIcon size={size} color={color} />;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const data = [
  { label: "All", value: "1" },
  { label: "Isolate and Investigate", value: "2" },
  { label: "Discharge", value: "3" },
  { label: "Isolate and Investigate After Three Days", value: "4" },
  {
    label: "Test for Other Diseases(Malaria,Typhoid,Gastroenteritis",
    value: "5",
  },
  { label: "Retake Test", value: "6" },
  { label: "No Threat", value: "7" },
  { label: "No Test Needed", value: "8" },
  { label: "Error", value: "9" },
  { label: "Linked to Testing", value: "10" },
];

const ContactInformation = () => {
  const [focusedField, setFocusedField] = useState(null);
  const navigation = useNavigation();
  const [filtered, setFiltered] = useState("");
  const [value, setValue] = useState(null);

 

























 

  return (
   
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.maincontainer}>
          <Headers />
        <ScrollView>
        <ContactInformationDT />
        </ScrollView>
        <Menu />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: Colors.pageBackgroundColor,
    
    
  },

  menuHamburger: {
    alignItems: "center",
    marginTop: -30,
    marginHorizontal: 20,
    backgroundColor: Colors.Green,
    width: 30,
    height:30
  },

  contentContainer: {
    marginHorizontal: 20,
    marginTop:30
  },

  

  contentHeaderText: {
    fontSize: 25,
    color: Colors.lightBlue,
  },

  filterContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
  },

  filterInput: {
    justifyContent: "center",
    padding: 10,
    width: windowWidth * 0.45,
    height: windowHeight * 0.05,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },

  textInputPlaceHolderStyle: {
    fontSize: 16,
  },

  dropDownPlaceHolderStyle: {
    fontSize: 16,
    color: Colors.gray,
  },

  item: {
    padding: 3,
    borderRadius: 8,
    marginVertical: 2,
  },

  textItem: {
    fontSize: 16,
    color: Colors.dark,
  },

  separator: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 2,
  },

  menuHamburgerContainer:{
   backgroundColor:Colors.Green,
   
  }
});

export default ContactInformation;
