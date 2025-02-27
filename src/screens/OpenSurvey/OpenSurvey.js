import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons"; // Importing icon library
import { Dropdown } from "react-native-element-dropdown";
import Headers from "../../components/Headers";
import Menu from "../../components/Menu";
import { RadioButton } from "react-native-paper";
import OpenSurveyOya from "./OpenSurveyOya";

import * as LucideIcons from "lucide-react-native";

const IconLucide = ({ name, size = 24, color = "black" }) => {
  const LucideIcon = LucideIcons[name];
  if (!LucideIcon) {
    return null;
  }
  return <LucideIcon size={size} color={color} />;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const OpenSurvey = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [focusedField, setFocusedField] = useState(null); // State to track focused field
  const [value, setValue] = useState(null);
  const [radioValue, setRadioValue] = React.useState("second");

  const renderItem = (item) => {
    const isSelected = item.value === value;
    return (
      <View>
        <View
          style={[
            styles.item,
            isSelected && { backgroundColor: Colors.lightBlue },
          ]}
        >
          <Text style={[styles.textItem, isSelected && { color: "white" }]}>
            {item.label}
          </Text>
        </View>
        <View style={styles.separator} />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Headers />

        <ScrollView>
          <View style={styles.Container}>
            <View style={styles.loginContainer}>
              <View>
                <Image
                  style={styles.loginLogo}
                  source={require("../../constants/images/ministry-of-Rwanda-logor.png")}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.pageHeader}>
                <Text style={styles.pageHeaderText}>
                  Ibarura ry'inkoko zahuye nuburwayi cg zapfuye
                </Text>
              </View>
              <View>
                <View style={styles.screenHeader}>
                  <Text style={styles.screenHeaderText}>
                    Ikiraro cyawe cyagaragaje ibi?
                  </Text>
                </View>

                <View style={styles.screenQuestion}>
                  <Text style={styles.screenQuestionText}>
                    Inkoko 10 cyangwa nyinshi zarapfuye mu gihe cy'icyumweru
                    kimwe bitewe n'uburwayi?
                  </Text>
                </View>

                <View style={styles.radioContainer}>
                  <RadioButton.Group
                    onValueChange={(newValue) => setRadioValue(newValue)}
                    value={radioValue}
                  >
                    <View>
                      <Text>Yego</Text>
                      <RadioButton.Android value="first" color={Colors.Green} />
                    </View>
                    <View>
                      <Text>Oya</Text>
                      <RadioButton.Android
                        value="second"
                        color={Colors.Green}
                      />
                    </View>
                  </RadioButton.Group>
                </View>
              </View>
              {radioValue === "first" && <OpenSurveyOya />} {/* ADDED THIS */}
              {radioValue === "second" && (
                <View style={styles.pageHeader}>
                  <Text style={styles.pageHeaderText2}>
                    Niba igisubizo ari oya wareka iri barura ntakibazo
                  </Text>
                </View>
              )}{" "}
              {radioValue === "first" && (
                <View style={styles.buttonConatainer}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ContactInformation")}
                  >
                    <View style={styles.NextButton}>
                      <Text style={styles.NextButtonText}>Ohereza</Text>
                      <IconLucide
                        name="ArrowRight"
                        size={20}
                        color={Colors.solidWhite}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {radioValue === "second" && (
                <View style={styles.buttonConatainer}>
                  <TouchableOpacity onPress={() => navigation.goBack("Login")}>
                    <View style={styles.NextButton}>
                      <IconLucide
                        name="ArrowLeft"
                        size={20}
                        color={Colors.solidWhite}
                      />
                      <Text style={styles.NextButtonText}>Inyuma</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    //backgroundColor: "yellow",
  },

  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: Colors.solidWhite,
    width: windowWidth * 0.9,
    borderRadius: 10,
    marginTop: 10,
    //backgroundColor: "red",
  },

  loginContainerHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    gap: 5,
  },

  loginLogo: {
    height: 85,
    width: 80,
    marginTop: 10,
  },

  pageHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: windowWidth * 0.9,
    marginHorizontal: 20,
  },
  pageHeaderText: {
    fontSize: windowHeight / 50,
    fontWeight: "600",
    color: Colors.gray,
  },

  pageHeaderText2: {
    fontSize: windowHeight / 50,
    fontWeight: "600",
    color: Colors.gray,
  },

  LoginSubHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  LoginSubHeaderText: {
    fontSize: 18,
    color: Colors.gray,
  },

  signinInputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },

  signinInputFilds: {
    marginTop: 10,
    width: 300,
    height: windowHeight * 0.05,
    borderColor: Colors.lightGray,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
  },

  phoneNumberInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  eyeIcon: {
    position: "absolute",
    right: 10,
  },

  buttonConatainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  NextButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 30,
    windowHeight: 0.05,
    width: windowWidth * 0.3,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.Green,
    gap: 10,
  },
  NextButtonText: {
    fontSize: windowHeight / 50,
    color: Colors.solidWhite,
  },

  PreviousButton: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 30,
    height: windowHeight * 0.05,
    width: windowWidth * 0.3,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  PreviousButtonText: {
    fontSize: 20,
    color: Colors.gray,
  },

  filterdropdown: {
    width: 300,
    height: windowHeight * 0.05,
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    elevation: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginHorizontal: 20,
    marginTop: 10,
  },

  dropDownPlaceHolderStyle: {
    fontSize: 16,
    color: Colors.gray,
  },

  separator: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 2,
  },

  DropDownHeaderText: {
    marginHorizontal: 20,
    marginTop: 20,
  },

  screenHeader: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 20,
  },
  screenHeaderText: {
    fontSize: windowHeight / 50,
    fontWeight: "600",
    color: Colors.lightBlue,
  },

  screenHeader2: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 10,
  },
  screenHeader2Text: {
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: "300",
    color: Colors.dark,
  },

  screenQuestion: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 10,
  },

  screenQuestionText: {
    fontSize: windowHeight / 50,
    fontWeight: "600",
    color: Colors.dark,
  },

  radioContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 10,
  },
});

export default OpenSurvey;
