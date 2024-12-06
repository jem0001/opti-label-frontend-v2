import { Redirect, router, Stack, withLayoutContext } from "expo-router";

import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGlobalContext } from "../../context/context";

export default function TabLayout() {
  const { setBarcode, setRackBarcode, isLoggedIn } = useGlobalContext();

  const handleActionSelectionBack = () => {
    setBarcode("");
    router.navigate("/");
  };
  const handleRackScanBack = () => {
    setRackBarcode("");
    router.navigate("/actionSelection");
  };

  if (!isLoggedIn) return <Redirect href="/login" />;

  return (
    <>
      <View className="bg-accent  w-full flex-row justify-between items-center px-4 py-2">
        <Text className="text-2xl text-white font-pbold ">Logo</Text>
        <TouchableOpacity onPress={() => router.navigate("/settings")}>
          <Ionicons
            name="settings"
            size={25}
            color={"white"}
            className="mt-3 mb-3"
          />
        </TouchableOpacity>
      </View>

      <Stack screenOptions={{ animation: "none" }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="actionSelection"
          options={{
            title: "Choose Action",
            headerLeft: () => (
              <TouchableOpacity
                onPress={handleActionSelectionBack}
                className="pr-8 py-4 bg-green-500"
              >
                <Ionicons name="arrow-back" size={23} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="rackScan"
          options={{
            title: "Scan Rack",
            headerLeft: () => (
              <Pressable onPress={handleRackScanBack} className="mr-8 p-4">
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
    </>
  );
}
