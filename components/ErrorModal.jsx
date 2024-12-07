import { View, Text, Modal, TouchableOpacity } from "react-native";
const ErrorModal = ({ visible, onClose, message, subMessage, buttonName }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      >
        <View className="gap-1 bg-primary rounded-lg">
          <View className="w-[80%] p-8 gap-4 ">
            <Text className="font-pbold text-2xl text-center">{message}</Text>
            <Text className="font-pregular text-gray-600 text-center">
              {subMessage}
            </Text>
            <TouchableOpacity className="bg-accent py-4" onPress={onClose}>
              <Text className="text-center text-white">{buttonName}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ErrorModal;
