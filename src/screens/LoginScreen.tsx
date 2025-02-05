import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@config/firebase"
import * as yup from "yup";
import { Formik } from "formik";
import { Icon } from "react-native-paper";
import { useAuthState } from "@context/AuthContext";

interface LoginValues {
  email: string;
  password: string;
}

export default function LoginScreen({ navigation }: any) {
  const { setLoggedInUser } = useAuthState();
  const loginValidationSchema = yup.object().shape({
    email: yup
    .string()
    .email("Correo inválido")
    .required("El correo es requerido"),
    password: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`),
  });

  const handleLogin = async (values: LoginValues) => {
      await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        console.log("login successful");
        setLoggedInUser(res.user)
      })
      .catch((err) => {
        Alert.alert("Error", err.message);
        console.log(err);
      })
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require("../../assets/logo_1.png")} 
        style={styles.logo} 
      />
      <Text style={styles.title}>Te damos la Bienvenida!</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}>
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
                <Icon source="tooltip-outline" size={25} color="black" />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              {errors.email && touched.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              <View style={styles.inputContainer}>
                <Icon source="lock-outline" size={25} color="black" />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </View>
              {errors.password && touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
                <Text style={styles.forgotPassword}>Olvidaste tu contraseña?</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => handleSubmit()}
                style={styles.submitButton} 
                disabled={!isValid}
              >       
                <Text style={styles.submitButtonText}>Iniciar Sesion</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <Text>No tienes cuenta?</Text>
                <TouchableOpacity 
                  onPress={() => navigation.navigate("SignUp")}>    
                  <Text style={styles.signUpLink}> Regístrate</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20, 
    alignItems: "center" ,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: "100%",
    paddingLeft: 10 
  },
  error: { 
    color: "red", 
    marginBottom: 15 
  },
  link: { 
    color: "blue", 
    marginTop: 10 
  },
  logo: { 
    width: 200, 
    height: 200, 
    marginBottom: 20, 
    resizeMode: "contain" 
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    color: '#000f00',
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#344CB7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUp: {
    color: '#000',
  },
  signUpLink: {
    color: '#1E90FF',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});
