import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import { router } from "expo-router";
import { useGlobalContext } from "../context/context";
import NetworkModal from "../components/NetworkModal";

const loginValidationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  //   .email("Please enter a valid email")
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

const Login = () => {
  const { isConnected, login } = useGlobalContext();
  const [showNetworkModal, setShowNetworkModal] = useState(false);

  const submit = (values) => {
    (async () => {
      try {
        if (!isConnected) {
          setShowNetworkModal(true);
          return;
        }
        console.log("submitted", values);
        const token = await login(values.username, values.password);
        console.log("token received", token);
        router.push("/scan");
        return;
      } catch (error) {
        console.log("LogiNError: ", error.message);
      }
    })();
  };
  return (
    <>
      <View style={styles.container}>
        <Image
          source={
            "https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
          }
          style={styles.logo}
          className="bg-red-400"
        />

        <Text style={styles.title}>Login</Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ username: "", password: "" }}
          onSubmit={submit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <View style={styles.inputContainer}>
                <Icon name="person-outline" size={25} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
              </View>
              {errors.username && touched.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}
              <View style={styles.inputContainer}>
                <Icon
                  name="lock-closed-outline"
                  size={25}
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </View>

              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              {/* <TouchableOpacity onPress={() => navigation.navigate("Forget")}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.button}
                className="bg-accent mt-4"
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signUp}>
                Don't have an account?{" "}
                <Text style={styles.signUpLink}>Sign Up</Text>
              </Text>
            </TouchableOpacity> */}
            </>
          )}
        </Formik>
      </View>
      <NetworkModal
        visible={showNetworkModal}
        onClose={() => setShowNetworkModal(false)}
      />
    </>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo: {
    height: 200,
    width: 200,
    marginBottom: 20,
    objectFit: "contain",
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: "bold",
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
    color: "#000",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  signUp: {
    color: "#000",
  },
  signUpLink: {
    color: "#1E90FF",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
});
