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
import { umurenge, akagari, umudugudu } from "../../Data/Data";

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

const OpenSurveyOya = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [totalChickens, setTotalChickens] =useState("");
  const [sickChickens,setSickChickens] =useState("");
  const [deadChickens,setDeadChickens]= useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [value, setValue] = useState(null);

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
     
        <View style={styles.Container}>
          <View style={styles.loginContainer}>
            <View style={styles.pageHeader2}>
              <Text style={styles.pageHeaderText2}>
                Tanga amakuru ku burwayi bwagaragaye ku bworozi bw'inkoko zawe
              </Text>
            </View>

            <View style={styles.signinInputContainer}>
              <View>
                <Text>Izina ribanza</Text>
              </View>

              <View>
                <TextInput
                  style={[
                    styles.signinInputFilds,
                    focusedField === "firstName" && { borderColor: "#0790CF" },
                  ]}
                  placeholder="Izina ribanza"
                  placeholderTextColor={Colors.gray}
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocusedField("firstName")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <View style={styles.signinInputContainer}>
              <View>
                <Text>Irindi zina</Text>
              </View>

              <View>
                <TextInput
                  style={[
                    styles.signinInputFilds,
                    focusedField === "lastName" && { borderColor: "#0790CF" },
                  ]}
                  placeholder="Irindi zina"
                  placeholderTextColor={Colors.gray}
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocusedField("lastName")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <View style={styles.signinInputContainer}>
              <View>
                <Text>Telephone</Text>
              </View>

              <View style={styles.phoneNumberInputWrapper}>
                <TextInput
                  style={[
                    styles.signinInputFilds,
                    focusedField === "phoneNumber" && {
                      borderColor: "#0790CF",
                    },
                  ]}
                  placeholder="Telephone"
                  placeholderTextColor={Colors.gray}
                  value={phoneNumber}
                  onChangeText={(text) => setphoneNumber(text)}
                  autoCapitalize="none"
                  onFocus={() => setFocusedField("phoneNumber")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <View>
              <View>
                <Text style={styles.DropDownHeaderText}>Location</Text>
              </View>
            </View>

            <View>
              <View>
                <Text style={styles.DropDownHeaderText}>Umurenge</Text>
              </View>

              <Dropdown
                containerStyle={{
                  borderRadius: 10,
                  backgroundColor: Colors.pageBackgroundColor,
                  padding: 10,
                }}
                style={[
                  styles.filterdropdown,
                  focusedField === "dropDownUmurenge" && {
                    borderColor: "#0790CF",
                  },
                ]}
                placeholderStyle={styles.dropDownPlaceHolderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                search
                searchPlaceholder="Search..."
                data={umurenge}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Hitamo Umurenge"
                //value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
                renderItem={renderItem}
                onFocus={() => setFocusedField("dropDownUmurenge")}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            <View>
              <View>
                <Text style={styles.DropDownHeaderText}>Akagali</Text>
              </View>

              <Dropdown
                containerStyle={{
                  borderRadius: 10,
                  backgroundColor: Colors.pageBackgroundColor,
                  padding: 10,
                }}
                style={[
                  styles.filterdropdown,
                  focusedField === "dropDownAkagali" && {
                    borderColor: "#0790CF",
                  },
                ]}
                placeholderStyle={styles.dropDownPlaceHolderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                search
                searchPlaceholder="Search..."
                data={akagari}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Hitamo Akagali"
                //value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
                renderItem={renderItem}
                onFocus={() => setFocusedField("dropDownAkagali")}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            <View>
              <View>
                <Text style={styles.DropDownHeaderText}>Umudugudu</Text>
              </View>

              <Dropdown
                containerStyle={{
                  borderRadius: 10,
                  backgroundColor: Colors.pageBackgroundColor,
                  padding: 10,
                }}
                style={[
                  styles.filterdropdown,
                  focusedField === "dropDownUmudugudu" && {
                    borderColor: "#0790CF",
                  },
                ]}
                placeholderStyle={styles.dropDownPlaceHolderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                search
                searchPlaceholder="Search..."
                data={umudugudu}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Hitamo Umudugudu"
                //value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
                renderItem={renderItem}
                onFocus={() => setFocusedField("dropDownUmudugudu")}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            <View style={styles.signinInputContainer}>
              <View>
                <Text>Umubare w'inkoko zose woroye</Text>
              </View>

              <View>
                <TextInput
                  style={[
                    styles.signinInputFilds,
                    focusedField === "totalChickens" && { borderColor: "#0790CF" },
                  ]}
                  placeholder=""
                  placeholderTextColor={Colors.gray}
                  value={totalChickens}
                  onChangeText={(text) => setTotalChickens(text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocusedField("totalChickens")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <View style={styles.signinInputContainer}>
              <View>
                <Text>Izarwaye ni zingahe muri iki cyumweru?</Text>
              </View>

              <View>
                <TextInput
                  style={[
                    styles.signinInputFilds,
                    focusedField === "sickChickens" && { borderColor: "#0790CF" },
                  ]}
                  placeholder=""
                  placeholderTextColor={Colors.gray}
                  value={sickChickens}
                  onChangeText={(text) => setSickChickens(text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocusedField("sickChickens")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <View style={styles.signinInputContainer}>
              <View>
                <Text>Muri izo izapfuye ni zingahe?</Text>
              </View>

              <View>
                <TextInput
                  style={[
                    styles.signinInputFilds,
                    focusedField === "deadChickens" && { borderColor: "#0790CF" },
                  ]}
                  placeholder=""
                  placeholderTextColor={Colors.gray}
                  value={deadChickens}
                  onChangeText={(text) => setDeadChickens(text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocusedField("deadChickens")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>
          </View>
        </View>
    
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: Colors.pageBackgroundColor,
  },

  loginContainer: {
    //backgroundColor: Colors.solidWhite,
    width: windowWidth * 0.9,
    borderRadius: 10,
    //backgroundColor:"yellow"
  },

  loginContainerHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    gap: 5,
  },

  loginLogo: {
    padding: 10,
    height: 85,
    width: 80,
  },

  pageHeaderText: {
    color: "#0790CF",
    fontSize: 15,
  },

  pageHeader: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 10,
    marginHorizontal: 10,
  },
  pageHeaderText: {
    fontSize: 20,
    color: Colors.gray,
    fontWeight: "400",
  },

  pageHeader2: {
    justifyContent: "flex-start",
    alignItems: "flex-",
    marginTop: 10,
    marginHorizontal: 20,
  },
  pageHeaderText2: {
    fontSize: windowHeight / 45,
    fontWeight: "600",
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
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 30,
    windowHeight: 0.05,
    width: windowWidth * 0.3,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.lightBlue,
  },
  NextButtonText: {
    fontSize: 20,
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
    elevation: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: Colors.solidWhite,
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

  menuHamburger: {
    alignItems: "center",
    marginTop: -24,
    marginHorizontal: 20,
    backgroundColor: "#f8f8f8",
    width: 30,
  },
});

export default OpenSurveyOya;
