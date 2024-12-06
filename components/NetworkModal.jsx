import { View, Text, Modal, TouchableOpacity } from "react-native";
const NetworkModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      >
        <View className="gap-1 bg-primary rounded-lg">
          <View className="w-[80%] p-8 gap-4 ">
            <Text className="font-pbold text-2xl text-center">
              Connection Error
            </Text>
            <Text className="font-pregular text-gray-600 text-center">
              Please ensure your device is connected to the correct Wi-Fi
              network, [Router Name], and that the Termux app is open and
              running. After confirming these, try again
            </Text>
            <TouchableOpacity className="bg-accent py-4" onPress={onClose}>
              <Text className="text-center text-white">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default NetworkModal;
