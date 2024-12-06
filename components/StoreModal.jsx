import { FontAwesome5 } from "@expo/vector-icons";
import { Modal, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { useGlobalContext } from "../context/context";
import { router } from "expo-router";
const StoreModal = ({ visible, onClose }) => {
  const { barcode, rackBarcode, setBarcode, setRackBarcode } =
    useGlobalContext();
  const handleAddProduct = () => {
    // reset global variables
    setBarcode("");
    setRackBarcode("");

    router.navigate("/scan");
  };
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      >
        <View className="w-[90%] bg-secondary rounded-md p-4">
          <Text className="font-pbold text-xl mb-4">Confirmation</Text>
          <Text className="font-pregular text-lg mb-2">Details: </Text>
          <View className="gap-1 bg-primary  p-4">
            <View className="flex-row w-[100%] gap-4">
              <FontAwesome5 name="barcode" size={20} />
              <Text className="font-pregular">Item ID: {barcode}</Text>
            </View>
            <View className="flex-row w-[100%] gap-4">
              <FontAwesome5 name="warehouse" size={15} />
              <Text className="font-pregular">Rack ID: {rackBarcode}</Text>
            </View>
            <View className="flex-row w-[100%] gap-4">
              <FontAwesome5 name="mouse" size={20} />
              <Text className="font-pregular">Type: Storing</Text>
            </View>
          </View>
          <View className="mt-4 flex-row w-full gap-2 h-12">
            <TouchableOpacity
              className="bg-primary rounded-lg flex-1 justify-center"
              onPress={() => {
                setRackBarcode("");
                onClose();
              }}
            >
              <Text className="text-center font-pregular">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-accent rounded-lg flex-1 justify-center"
              onPress={handleAddProduct}
            >
              <Text className="text-center font-pregular text-white">Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default StoreModal;
