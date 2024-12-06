// import { useGlobalContext } from "@/context/context";
// import { useIsFocused } from "@react-navigation/native";
// import axios from "axios";
// import { router } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { Text, View } from "react-native";

// const ProtectedRoute = ({ children }) => {
//   const { isLoggedIn } = useGlobalContext();
//   const isFocused = useIsFocused();

//   useEffect(() => {
//     if (isFocused) {
//       console.log("ProtectedRoute>>>, ", isLoggedIn);
//       if (isLoggedIn) router.push("/scan");
//       if (isLoggedIn === false) router.push("/login");
//     }
//   }, [isLoggedIn]);

//   if (isLoggedIn === null) {
//     return <View className="flex-1 bg-white"></View>;
//   }

//   return <></>;
// };

// export default ProtectedRoute;
