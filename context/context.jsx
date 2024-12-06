import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNetInfo } from "@react-native-community/netinfo";

axios.defaults.baseURL = "http://192.168.1.4:3000/api/v1";
// remove timeout when connection prematurely ends
axios.defaults.timeout = 3000;
// remove timeout when connection prematurely ends

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [students, setStudents] = useState("jem");
  const { isConnected } = useNetInfo();
  const [barcode, setBarcode] = useState("");
  const [rackBarcode, setRackBarcode] = useState("");

  const getCategories = async () => {
    try {
      const response = await axios.get("/categories");
      console.log(response.data, "eyy");
      return response.data.categories;
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post("/auth/login", { username, password });
      const token = response.data.token;
      return token;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        students,
        getCategories,
        isConnected,
        barcode,
        setBarcode,
        rackBarcode,
        setRackBarcode,
        login,
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
