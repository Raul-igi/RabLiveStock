import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { List } from "react-native-paper";
import { Container } from "lucide-react-native";
import Colors from "../../constants/Colors";

const DashboardDT = () => {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={styles.Container}>
      <List.Section title="Recent Cases">

        <List.Accordion
          title="Eric Shema"
          left={(props) => (
            <List.Icon {...props} icon="table" color="#0790CF" />
          )}
          
        >
          <List.Item title="Satus: Isolate and Investigate" />
          <List.Item title="Date Added: 1/19/2025" />
        </List.Accordion>

        <List.Accordion
          title="Vestine Uwingabiye"
          left={(props) => (
            <List.Icon {...props} icon="table" color="#0790CF" />
          )}
          expanded={expanded}
          onPress={handlePress}
         
        >
          <List.Item title="Status:RETAKE_TEST" />
          <List.Item title="Date Added: 1/19/2025" />
        </List.Accordion>

        <List.Accordion
          title="Dorcas Uwishimwe"
          left={(props) => (
            <List.Icon {...props} icon="table" color="#0790CF" />
          )}
        >
          <List.Item title="Satus:Test for Other Diseases (Malaria, Typhoid, Gastroenteritis)" />
          <List.Item title="Date Added: 1/19/2025" />
        </List.Accordion>
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginBottom: 150,
    marginHorizontal: 20,
  },

  focusedAccordion: {
    backgroundColor: "#f0f8ff", // Light background for the focused list
    borderWidth: 1,
    borderColor: "#1e90ff", // Highlight border color
  },
});

export default DashboardDT;
