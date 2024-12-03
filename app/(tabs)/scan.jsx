import { View, Text, TouchableOpacity } from "react-native";
// import { Image } from "expo-image";
const Scan = () => {
  return (
    <View className="bg-white flex-1 justify-center items-center">
      <View>
        {/* <Image
          source="https://cdn.qrplanet.com/proxy/qrcdr/plugins/qr-templates/preview/a06db94126183aa80424ca44ca2cf242.svg"
          contentFit="contain"
          transition={1000}
          style={{ height: "60%" }}
        /> */}
        <Text className="font-extrabold text-4xl text-center text-gray-700 tracking-10 max-w-[300]">
          Scan Code with handheld Scanner
        </Text>
      </View>
    </View>
  );
};
export default Scan;
