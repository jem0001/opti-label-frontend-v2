import { View, Text, StyleSheet } from "react-native";

export default function ForYou() {
  return (
    <View style={styles.container}>
      <Text>Posts recommended for you</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
