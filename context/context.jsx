import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.4:3000/api/v1";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [students, setStudents] = useState("jem");

  const getCategories = async () => {
    try {
      const response = await axios.get("/categories");
      console.log(response.data, "eyy");
      return response.data.categories;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        students,
        getCategories,
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
