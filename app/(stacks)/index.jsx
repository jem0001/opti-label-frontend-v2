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
import { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../context/context";
import { router, useFocusEffect } from "expo-router";
import React from "react";
import ConnectionError from "../../components/ConnectionError";

const Scan = () => {
  const { isConnected, barcode, setBarcode } = useGlobalContext();

  const handleBarcodeChange = (text) => {
    setBarcode(text);
  };

  const handleSubmit = () => {
    router.navigate("/actionSelection");
  };
  useEffect(() => {
    // Dismiss the keyboard when the component is mounted
    Keyboard.dismiss();
  }, []);

  return (
    <>
      <View className="bg-secondary flex-1 justify-center items-center">
        {isConnected && (
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
              }}
            >
              <TextInput
                style={{ flex: 1, height: "100%" }}
                placeholder="barcode"
                autoFocus={true}
                // showSoftInputOnFocus={false}
                // onFocus={() => setBarcode("")}
                value={barcode}
                onChangeText={handleBarcodeChange}
                onSubmitEditing={handleSubmit}
              />
            </View>
            <Image
              source="https://cdn.qrplanet.com/proxy/qrcdr/plugins/qr-templates/preview/a06db94126183aa80424ca44ca2cf242.svg"
              transition={1000}
              contentFit="contain"
              style={{ height: 250, width: 250 }}
            />
            <Text className="font-pbold text-4xl text-center tracking-10 my-6">
              Scanner Ready
            </Text>
            <Text className="font-pregular text-center text-xl text-gray-600 tracking-10 mb-8">
              Please use the integrated scanner to scan your item
            </Text>
            <View className="flex-row justify-center items-center gap-2">
              <Ionicons name="information-circle" size={15} color={"gray"} />
              <Text className="font-pregular text-gray-600 text-center ">
                Please position barcode withing scanning range
              </Text>
            </View>
          </View>
        )}
        {!isConnected && <ConnectionError />}
      </View>
    </>
  );
};
export default Scan;
