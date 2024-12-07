import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  ToastAndroid,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../context/context";
import { router } from "expo-router";
import StoreModal from "../../components/StoreModal";
import ConnectionError from "../../components/ConnectionError";
import ErrorModal from "../../components/ErrorModal";

const RackScan = () => {
  const {
    isServerError,
    rackBarcode,
    setRackBarcode,
    barcode,
    setBarcode,
    addProductStat,
    logout,
  } = useGlobalContext();

  const textInputRef = useRef(null);
  const [storeVisible, setStoreVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleBarcodeChange = (text) => {
    setRackBarcode(text);
  };

  const handleSubmit = () => {
    console.log(rackBarcode);
    setStoreVisible(true);
  };

  const handleAddProduct = async () => {
    setIsSubmitting(true);
    //  API call
    try {
      setStoreVisible(false);
      await addProductStat(barcode, 2, rackBarcode);
      setBarcode("");
      setRackBarcode("");
      ToastAndroid.show("Product added successfully!", ToastAndroid.SHORT);
      router.navigate("/");
    } catch (error) {
      if (error.message === "jwt expired") setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Dismiss the keyboard when the component is mounted
    Keyboard.dismiss();
    console.log("rack barcode", rackBarcode);
  }, []);

  if (isServerError) {
    return (
      <View className="bg-secondary flex-1 justify-center items-center">
        <ConnectionError
          onPress={handleAddProduct}
          isSubmitting={isSubmitting}
        />
      </View>
    );
  }
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
              keyboardType="numeric"
              ref={textInputRef}
              style={{ flex: 1, height: "100%" }}
              placeholder="rackBarcode"
              autoFocus={true}
              // showSoftInputOnFocus={false}
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
        onClose={() => {
          setStoreVisible(false);
          textInputRef.current.focus();
        }}
        onSend={handleAddProduct}
        isSubmitting={isSubmitting}
      />

      <ErrorModal
        visible={error}
        onClose={() => {
          (async () => {
            setError(false);
            await logout();
          })();
        }}
        message={"Session Expired"}
        subMessage="Your session has expired, and your login credentials are no longer valid. Please log in again to continue."
        buttonName={"Log In Again"}
      />
    </>
  );
};
export default RackScan;
