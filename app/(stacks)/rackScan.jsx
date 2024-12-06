import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../context/context";
import { router } from "expo-router";
import StoreModal from "../../components/StoreModal";

const RackScan = () => {
  const { rackBarcode, setRackBarcode } = useGlobalContext();
  const [storeVisible, setStoreVisible] = useState(false);

  const handleBarcodeChange = (text) => {
    setRackBarcode(text);
  };

  const handleSubmit = () => {
    console.log(rackBarcode);
    setStoreVisible(true);
  };
  useEffect(() => {
    // Dismiss the keyboard when the component is mounted
    Keyboard.dismiss();
    console.log("rack barcode", rackBarcode);
  }, []);

  return (
    <>
      <View className="bg-secondary flex-1 justify-center items-center">
        <View className="px-4 justify-center items-center">
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              height: 50,
              backgroundColor: "#f1f1f1",
              borderRadius: 8,
              paddingHorizontal: 10,
              marginBottom: 20,
              // opacity: 0,
              // height: 0,
            }}
          >
            <TextInput
              style={{ flex: 1, height: "100%" }}
              placeholder="rackBarcode"
              autoFocus={true}
              //   showSoftInputOnFocus={false}
              value={rackBarcode}
              onChangeText={handleBarcodeChange}
              onSubmitEditing={handleSubmit}
            />
          </View>
          <Image
            source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvh5XboVgFVaXAMZnf5NshNRRaQD60uwxscw&s"
            transition={1000}
            contentFit="contain"
            style={{ height: 150, width: 250 }}
          />
          <Text className="font-pbold text-4xl text-center tracking-10 my-6">
            Scan Your Rack
          </Text>
          <Text className="font-pregular text-center text-xl text-gray-600 tracking-10 mb-8">
            Please use the integrated scanner to scan the rack's barcode. Hold
            the scanner steady and aim at the barcode label.
          </Text>
        </View>
      </View>

      <StoreModal
        visible={storeVisible}
        onClose={() => setStoreVisible(false)}
      />
    </>
  );
};
export default RackScan;
