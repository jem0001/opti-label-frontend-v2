import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNetInfo } from "@react-native-community/netinfo";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

axios.defaults.baseURL = "http://192.168.1.4:3000/api/v1";
// remove timeout when connection prematurely ends
axios.defaults.timeout = 3000;
// remove timeout when connection prematurely ends

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const { isConnected } = useNetInfo();
  const [isServerError, setIsServerError] = useState(false);

  // ProductFormData
  const [barcode, setBarcode] = useState("");
  const [rackBarcode, setRackBarcode] = useState("");

  // // EXPO SECURE STORE
  // // Save token
  // const saveToken = async (token) => {
  //   try {
  //     await SecureStore.setItemAsync("accessToken", token);
  //     console.log("Token saved successfully!");
  //   } catch (error) {
  //     console.error("Error saving token", error);
  //   }
  // };

  // // Retrieve token
  // const getToken = async () => {
  //   try {
  //     const token = await SecureStore.getItemAsync("accessToken");
  //     if (token) {
  //       console.log("Token retrieved:", token);
  //       return token;
  //     } else {
  //       console.log("No token found");
  //     }
  //   } catch (error) {
  //     console.error("Error retrieving token", error);
  //   }
  // };

  // // Clear token
  // const clearToken = async () => {
  //   try {
  //     await SecureStore.deleteItemAsync("accessToken");
  //     console.log("Token cleared");
  //   } catch (error) {
  //     console.error("Error clearing token", error);
  //   }
  // };
  // // EXPO SECURE STORE

  const getCategories = async () => {
    try {
      const response = await axios.get("/categories");
      console.log(response.data, "eyy");
      return response.data.categories;
    } catch (error) {
      console.log(error);
    }
  };

  const addProductStat = async (barcode, type, sub_type = "") => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      const response = await axios.post(
        "/products-stat",
        {
          barcode,
          type,
          sub_type,
        },
        axiosConfig(token)
      );
      setIsServerError(false);
      console.log(response.data.message);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        setIsServerError(true);
        throw new Error(error.message);
      }
      throw new Error(
        error.response?.data?.message?.message ||
          error.response?.data?.message ||
          "An unknown error occurred during login, contact the developer."
      );
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post("/auth/login", { username, password });
      const token = response.data.token;
      await SecureStore.setItemAsync("accessToken", token);
      setIsLoggedIn(true);
      router.navigate("/");
      return token;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        setIsServerError(true);
        throw new Error(error.message);
      }
      throw new Error(
        error.response?.data?.message?.message ||
          error.response?.data?.message ||
          "An unknown error occurred during login, contact the developer."
      );
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      setIsLoggedIn(false);
      setBarcode("");
      setRackBarcode("");
      router.navigate("/login");
    } catch (error) {
      console.log("ERROR LOGGING OUT");
      throw new Error(error);
    }
  };

  const axiosConfig = (token) => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await SecureStore.getItemAsync("accessToken");
        const response = await axios.get("/auth/verify", axiosConfig(token));
        setIsLoggedIn(true);
        console.log("token setttted");
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          console.log("lego error in verify", error.code);
        }
        setIsLoggedIn(false);
      }
    })();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        getCategories,
        isConnected,
        isServerError,
        setIsServerError,
        barcode,
        setBarcode,
        rackBarcode,
        setRackBarcode,
        login,
        logout,
        setIsLoggedIn,
        isLoggedIn,
        addProductStat,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
export default GlobalProvider;
