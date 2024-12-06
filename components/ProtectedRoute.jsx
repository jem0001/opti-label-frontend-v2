import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const verify = async () => {
    try {
      //   const response = await axios.get("/auth/verify");

      //   console.log(response);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    verify();
    console.log("protected route rendered");
  }, []);

  if (isAuthenticated === null) {
    return <View className="flex-1 bg-white"></View>;
  }

  if (!isAuthenticated) {
    router.navigate("/");
    return null;
  }

  return children;
};

export default ProtectedRoute;
