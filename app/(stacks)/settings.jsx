import { router } from "expo-router";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";

const Settings = () => {
  return (
    <ScrollView className="h-full">
      <View className="flex-1 justify-center items-center  p-4">
        <View>
          <Text className="font-bold my-4 text-lg">Account Settings</Text>
          <View className="w-full bg-white  p-4 rounded-md mb-4">
            <Text className="m-1">Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                // onChangeText={handleChange("password")}
                // onBlur={handleBlur("password")}
                value={""}
              />
            </View>
            <Text className="m-1">Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                // onChangeText={handleChange("password")}
                // onBlur={handleBlur("password")}
                value={""}
              />
            </View>
            <TouchableOpacity
              className="m-3 w-fit bg-accent p-4 rounded-lg"
              onPress={() => router.navigate("/")}
            >
              <Text className="text-white text-center font-pbold">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text className="font-bold my-4 text-lg">Database Connection</Text>
          <View className="w-full bg-white p-4 rounded-md mb-4">
            <Text className="m-1">Host</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Host"
                // onChangeText={handleChange("password")}
                // onBlur={handleBlur("password")}
                value={""}
              />
            </View>
            <Text className="m-1">User</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="User"
                // onChangeText={handleChange("password")}
                // onBlur={handleBlur("password")}
                value={""}
              />
            </View>
            <Text className="m-1">Database</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Database"
                // onChangeText={handleChange("password")}
                // onBlur={handleBlur("password")}
                value={""}
              />
            </View>
            <Text className="m-1">Password</Text>
            <View style={[styles.inputContainer, { marginBottom: 20 }]}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                // onChangeText={handleChange("password")}
                // onBlur={handleBlur("password")}
                value={""}
              />
            </View>

            <TouchableOpacity className="m-3 w-fit bg-accent p-4 rounded-lg ">
              <Text className="text-white text-center font-pbold">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Settings;
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderColor: "rgba(0,0,0,.4)",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: "100%",
  },
});
