import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { DataTable, List } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as LucideIcons from "lucide-react-native";
import apiService from "../apiService/apiService";
import Modal from "react-native-modal";

const IconLucide = ({ name, size = 24, color = "black" }) => {
  const LucideIcon = LucideIcons[name];
  if (!LucideIcon) {
    return null;
  }
  return <LucideIcon size={size} color={color} />;
};

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const data = [
  { label: "Isolate and Investigate", value: "1" },
  { label: "Discharge", value: "2" },
  { label: "Isolate and Investigate After Three Days", value: "3" },
  {
    label: "Test for Other Diseases(Malaria,Typhoid,Gastroenteritis",
    value: "4",
  },
  { label: "Retake Test", value: "5" },
  { label: "No Threat", value: "6" },
  { label: "No Test Needed", value: "7" },
  { label: "Error", value: "8" },
  { label: "Linked To Testing", value: "9" },
];

const ContactInformationDT = () => {
  const navigation = useNavigation();
  const [focusedField, setFocusedField] = useState(null);

  const [loading, setLoading] = useState({});
  const [casesList, setCasesList] = useState([]);

  const [show, setShow] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    const fetchPatientCaseListData = async () => {
      try {
        setLoading(true);

        // Fetch data from API
        const response = await apiService.fetchPatientCaseList();
       // console.log("nsoro sebihogo", JSON.stringify(response));
        // Handle different API response formats
        const responseData = response.data?.data || response.data;
        if (!responseData || !Array.isArray(responseData)) {
          throw new Error("Invalid API response format");
        }

        //console.log("Cases Data:", responseData);

        // Format data

        setCasesList(responseData);
        // console.log("Formatted Cases:", responseData);
      } catch (error) {
        console.error("Error fetching patient cases:", error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchPatientCaseListData();
  }, []);

  const fetchCaseDetailsById = async (caseId) => {
    try {
      const response = await apiService.fetchCaseById(caseId);
      console.log(response);
      if (response.success) {
        toggleFirstModal(response.data);
      }
    } catch (error) {
      console.error(
        `Error fetching details for case ${caseId}:`,
        error.toString()
      );
      return null; // Return null if fetching fails
    }
  };

  const toggleFirstModal = (caseDetails = null) => {
    if (caseDetails) {
      console.log(caseDetails);
      setSelectedCase(caseDetails);
      setShow(true);
    } else {
      setShow(false);
      setSelectedCase(null);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    // Extract components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    // Format time in 12-hour format with AM/PM
    const hours = date.getHours() % 12 || 12; // Convert 0 to 12 for AM/PM format
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const renderItem = (item, isSelected) => {
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
    <View>
      <View style={styles.continersGraber}>
        <LinearGradient
          style={styles.LinearGradStyle}
          colors={["#2d6a4f", "#3E9A32"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.mainHeader}>Contact Report</Text>
          <Text style={styles.subHeader}>
            Survey Contacts reports carried on chickens
          </Text>
        </LinearGradient>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("OpenSurvey")}>
            <View style={styles.buttons}>
              <Text style={styles.buttonText}>New Survey</Text>
              <IconLucide name="FilePlus" size={20} color={Colors.solidWhite} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.buttons}>
              <Text style={styles.buttonText}>Export</Text>
              <IconLucide
                name="ArrowDownToLine"
                size={20}
                color={Colors.solidWhite}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.accordionMainContainer}>
        <List.Section title="Data Table">
          {casesList?.map((caseDetails) => (
            <List.Accordion
              style={styles.accordionContainer}
              title={`${caseDetails.casePersonalInfo.firstName} ${caseDetails.casePersonalInfo.lastName}`}
              titleStyle={{ fontSize: windowHeight / 55 }}
              backgroundColor="red"
              left={(props) => (
                <List.Icon {...props} icon="table" color="#0790CF" />
              )}
            >
              <List.Item
                style={styles.accordionRow}
                title={`Date: ${
                  caseDetails.casePersonalInfo.createdAt.split("T")[0]
                }`}
              />

              <List.Item
                style={styles.accordionRow}
                title={`Phone Number: ${caseDetails.casePersonalInfo.telephone}`}
              />

              <List.Item
                style={styles.accordionRow}
                title={`Location: ${caseDetails?.selectedCase?.fullLocationName}
}`}
              />

              <List.Item
                style={styles.accordionRow}
                //title={`Status: ${caseDetails.status.name}`}
              />

              <List.Item
                style={styles.accordionRow}
                title="Actions:"
                right={(props) => (
                  <TouchableOpacity
                    style={styles.viewStatus}
                    onPress={() => fetchCaseDetailsById(caseDetails.id)}
                  >
                    <IconLucide name="Eye" size={20} color={Colors.lightBlue} />
                  </TouchableOpacity>
                )}
              />
            </List.Accordion>
          ))}
        </List.Section>

        <Modal
          isVisible={show}
          backdropOpacity={0.5} // Disable the black background
          onBackdropPress={() => toggleFirstModal()}
          //animationType="fade"
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Chicken Data Details</Text>
            </View>

            <ScrollView>
              {selectedCase ? (
                <>
                  <View style={styles.modalSubHeader}>
                    <Text style={styles.modalSubHeaderText}>
                      View data for {selectedCase.casePersonalInfo?.firstName}
                    </Text>
                  </View>

                  <View style={styles.userDescription}>
                    <Text style={styles.userTextDescription}>
                      Farmer's Name
                    </Text>
                    <Text style={styles.userTextDescription}>
                      {selectedCase.casePersonalInfo?.firstName}{" "}
                      {selectedCase.casePersonalInfo?.lastName}
                    </Text>
                  </View>

                  <View style={styles.separator} />

                  <View style={styles.userDescription}>
                    <Text style={styles.userTextDescription}>Phone Number</Text>
                    <Text style={styles.userTextDescription}>
                      {selectedCase.casePersonalInfo?.telephone}
                    </Text>
                  </View>

                  <View style={styles.separator} />

                  <View style={styles.userDescription}>
                    <Text style={styles.userTextDescription}>Location</Text>
                    <Text style={styles.userTextDescription}>
                      {selectedCase?.fullLocationName?.split(">")[1] ||
                        "Unknown"}
                    </Text>
                  </View>

                  <View style={styles.separator} />

                  <View style={styles.userDescription}>
                    <Text style={styles.userTextDescription}>
                      Total Chickens
                    </Text>
                    <Text style={styles.userTextDescription}>34</Text>
                  </View>

                  <View style={styles.separator} />

                  <View style={styles.userDescription}>
                    <Text style={styles.userTextDescription}>
                      Sick Chickens
                    </Text>
                    <Text style={styles.userTextDescription}>23</Text>
                  </View>

                  <View style={styles.separator} />

                  <View style={styles.userDescription}>
                    <Text style={styles.userTextDescription}>
                      Dead Chickens
                    </Text>
                    <Text style={styles.userTextDescription}>12</Text>
                  </View>

                  <View style={styles.separator} />

                  <View style={styles.userDescription}>
                    <Text style={styles.userTextDescription}>
                      Registered At
                    </Text>
                    <Text style={styles.userTextDescription}>
                      {formatDate(selectedCase.casePersonalInfo.createdAt)}
                    </Text>
                  </View>

                  <View style={styles.separator} />

                  <View style={styles.userDescriptionRemark}>
                    <Text style={styles.userTextDescriptionRemark}>
                      Remarks
                    </Text>
                    <Text style={styles.userTextDescription}>
                    Review the information of the farmer and the reported chicken status.
                    </Text>
                  </View>



                </>
              ) : (
                <Text>No case data available</Text>
              )}

              <View style={styles.buttonContainer2}>
                <TouchableOpacity onPress={() => toggleFirstModal()}>
                  <View style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>cancel</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tablecaseHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderColor: "black",
    borderWidth: 1,
    marginHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
  },

  mainHeader: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: windowHeight / 50,
    fontWeight: 400,
    color: Colors.solidWhite,
  },

  subHeader: {
    fontSize: windowHeight / 60,
    fontWeight: 400,
    color: Colors.solidWhite,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
    gap: 10,
  },

  buttonWithIconText: {
    fontSize: 15,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight * 0.05,
    width: windowWidth * 0.33,
    //backgroundColor: Colors.Green,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.solidWhite,
    gap: 5,
  },

  buttonText: {
    fontSize: windowHeight / 70,
    color: Colors.solidWhite,
  },

  //dropdown styling section
  filterdropdown: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.05,
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.lightGray,
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

  accordionRow: {
    paddingLeft: -40,
    marginHorizontal: 10,
    borderRadius: 5,
  },

  continersGraber: {
    backgroundColor: Colors.Green,
    height: windowHeight * 0.2,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  LinearGradStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderColor: "#55a630",
    borderWidth: 1,
  },

  accordionMainContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.Green,
    borderRadius: 10,
    marginBottom: windowHeight * 0.2,
  },

  accordionContainer: {
    backgroundColor: "#e2eafc",
    paddingLeft: -40,
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d7e3fc",
  },

  //modal

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    height: "90%",
    marginTop: "100%",
  },

  //modal content

  modalHeader: {
    justifyContent: "center",
    alignItems: "center",
  },

  modalHeaderText: {
    fontSize: windowHeight / 50,
    fontWeight: "600",
    color: Colors.lightBlue,
  },

  modalSubHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  modalSubHeaderText: {
    fontSize: windowHeight / 50,
    fontWeight: "500",
    color: Colors.dark,
  },

  userDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between",
    marginTop: 20,
  },

  userTextDescription: {
    fontSize: windowHeight / 55,
    color: Colors.gray,
  },

  modalHeader2: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  modalSubHeader2: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonContainer2: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight * 0.05,
    width: windowWidth * 0.39,
    backgroundColor: Colors.solidWhite,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    marginTop: 10,
  },

  cancelButtonText: {
    color: Colors.lightBlue,
    fontSize: 14,
    fontWeight: 700,
  },


  userDescriptionRemark:{
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 20,
    gap:20
  },
  userTextDescriptionRemark:{
    fontSize: windowHeight / 50,
    color: Colors.gray,
    fontWeight:600
  }
});

export default ContactInformationDT;
