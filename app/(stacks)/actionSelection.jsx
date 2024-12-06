import { FontAwesome5 } from "@expo/vector-icons";
import { render } from "react-dom";
import { Modal, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { useGlobalContext } from "../../context/context";
import ShipModal from "../../components/ShipModal";
import { useState } from "react";
import { router } from "expo-router";

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
  const [shipVisible, setShipVisible] = useState(false);

  const handlePick = (id) => {
    if (id === 1) {
      setShipVisible(true);
    }
    if (id === 2) {
      router.navigate("/rackScan");
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

  return (
    <>
      <View className="flex-1 items-center justify-center h-screen">
        <Text className="font-psemibold text-3xl mb-6">
          Warehouse Operations
        </Text>
        {ACTIONS.map((item) => renderItem(item))}
      </View>

      <ShipModal visible={shipVisible} onClose={() => setShipVisible(false)} />
    </>
  );
};
export default ActionSelection;
