import { View, Text, StyleSheet } from "react-native";

export default function Following() {
  return (
    <View style={styles.container}>
      <Text>Posts by people you are following</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 12,
    backgroundColor: "black",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    color: "white",
  },
});
