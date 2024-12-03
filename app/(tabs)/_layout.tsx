import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { router, withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  return (
    <>
      <View className="bg-[#6200ee]  w-full flex-row justify-between items-center px-4">
        <Text className="text-xl text-white font-extrabold ">Logo</Text>
        <Pressable onPress={() => router.navigate("/settings")}>
          <Ionicons
            name="settings"
            size={25}
            color={"white"}
            className="mt-3 mb-3"
          />
        </Pressable>
      </View>

      <MaterialTopTabs
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#6200ee", // Highlight (indicator) color
            height: 3, // Thickness of the indicator
          },
          tabBarActiveTintColor: "#6200ee", // Color of the active tab label
          tabBarInactiveTintColor: "#808080", // Color of the inactive tab labels
          tabBarLabelStyle: {
            fontSize: 18,
            fontFamily: "Poppins-Bold",
          },
          // tabBarStyle: { display: "none" },
          animationEnabled: true,
          swipeEnabled: false,
        }}
        // screenListeners={{
        //   tabPress: (e) => {
        //     // add your conditions here
        //     e.preventDefault(); // <-- this function blocks navigating to screen
        //   },
        // }}
      >
        <MaterialTopTabs.Screen name="scan" options={{ title: "Scan" }} />
        <MaterialTopTabs.Screen
          name="categorize"
          options={{ title: "Categorize" }}
        />
      </MaterialTopTabs>
    </>
  );
}
