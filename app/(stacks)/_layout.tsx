import { router, Stack, withLayoutContext } from "expo-router";

import { Button, Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGlobalContext } from "../../context/context";
import ProtectedRoute from "../../components/ProtectedRoute.jsx";

export default function TabLayout() {
  const { setBarcode, setRackBarcode } = useGlobalContext();

  const handleActionSelectionBack = () => {
    setBarcode("");
    router.navigate("/scan");
  };
  const handleRackScanBack = () => {
    setRackBarcode("");
    router.navigate("/actionSelection");
  };
  return (
    <>
      <ProtectedRoute>
        <View className="bg-accent  w-full flex-row justify-between items-center px-4 py-2">
          <Text className="text-2xl text-white font-pbold ">Logo</Text>
          <Pressable onPress={() => router.navigate("/settings")}>
            <Ionicons
              name="settings"
              size={25}
              color={"white"}
              className="mt-3 mb-3"
            />
          </Pressable>
        </View>

        <Stack screenOptions={{ animation: "none" }}>
          <Stack.Screen name="scan" options={{ headerShown: false }} />
          <Stack.Screen
            name="actionSelection"
            options={{
              title: "Choose Action",
              headerLeft: () => (
                <Pressable onPress={handleActionSelectionBack} className="mr-8">
                  <Ionicons name="arrow-back" size={23} />
                </Pressable>
              ),
            }}
          />
          <Stack.Screen
            name="rackScan"
            options={{
              title: "Scan Rack",
              headerLeft: () => (
                <Pressable onPress={handleRackScanBack} className="mr-8">
                  <Ionicons name="arrow-back" size={23} />
                </Pressable>
              ),
            }}
          />
          <Stack.Screen
            name="settings"
            options={{
              headerShown: true,
              title: "Setings",
            }}
          />
        </Stack>
      </ProtectedRoute>
    </>
  );
}
