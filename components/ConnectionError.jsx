// import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const ConnectionError = ({ onPress }) => {
  return (
    <View className="justify-center items-center p-4">
      {/* <Image
        source="https://static-00.iconduck.com/assets.00/network-error-symbolic-icon-512x480-4flohdjs.png"
        contentFit="contain"
        style={{ height: 200, width: 200 }}
      /> */}
      <Text className="font-pregular text-3xl">Connection Error</Text>
      <Text className="font-pregular text-gray-600 text-center">
        Please ensure your device is connected to the correct router. Connect to
        the [Router Name] network and try again.
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text className="font-pregular text-accent">Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ConnectionError;
const styles = StyleSheet.create({});
