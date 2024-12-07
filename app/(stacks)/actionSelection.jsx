import { FontAwesome5 } from "@expo/vector-icons";
import { render } from "react-dom";
import {
  Modal,
  TouchableOpacity,
  ToastAndroid,
  Button,
  Alert,
} from "react-native";
import { View, Text } from "react-native";
import { useGlobalContext } from "../../context/context";
import ShipModal from "../../components/ShipModal";
import { useState } from "react";
import { router } from "expo-router";
import ConnectionError from "../../components/ConnectionError";
import NetworkModal from "../../components/ErrorModal";
import ErrorModal from "../../components/ErrorModal";

const ACTIONS = [
  { id: 1, title: "Ship", description: "Send item to shipping", icon: "truck" },
  {
    id: 2,
    title: "Store in Rack",
    description: "Place item in storage",
    icon: "warehouse",
  },
  // { id: 3, title: "Ship", description: "Send item to shipping" },
  // { id: 4, title: "Store in Rack", description: "Place item in storage" },
];

const ActionSelection = () => {
  const {
    logout,
    isConnected,
    isServerError,
    addProductStat,
    setBarcode,
    barcode,
  } = useGlobalContext();

  const [shipVisible, setShipVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handlePick = (id) => {
    if (id === 1) {
      setShipVisible(true);
    }
    if (id === 2) {
      router.navigate("/rackScan");
    }
  };

  const handleAddProduct = async () => {
    setIsSubmitting(true);
    // API call
    try {
      setShipVisible(false);
      await addProductStat(barcode, 1);
      setBarcode("");
      router.navigate("/");
      ToastAndroid.show("Product added successfully!", ToastAndroid.SHORT);
    } catch (error) {
      if (error.message === "jwt expired") setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        key={item.id}
        className="bg-secondary  h-[200] w-[300] mb-4 rounded-lg  shadow-lg"
        onPress={() => handlePick(item.id)}
      >
        <View className="flex-1 justify-center items-center gap-4">
          <FontAwesome5 name={item.icon} size={45} className="text-center" />
          <Text className="text-center font-psemibold text-2xl ">
            {item.title}
          </Text>
          <Text className="text-center font-pregular  text-gray-700">
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (isServerError) {
    return (
      <View className="flex-1 items-center justify-center h-screen ">
        <ConnectionError
          onPress={handleAddProduct}
          isSubmitting={isSubmitting}
        />
      </View>
    );
  }

  return (
    <>
      <View className="flex-1 items-center justify-center h-screen ">
        <View>
          <Text className="font-psemibold text-3xl mb-6">
            Warehouse Operations
          </Text>
          {ACTIONS.map((item) => renderItem(item))}
        </View>
      </View>

      <ShipModal
        visible={shipVisible}
        isSubmitting={isSubmitting}
        onClose={() => setShipVisible(false)}
        onSend={handleAddProduct}
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
export default ActionSelection;
