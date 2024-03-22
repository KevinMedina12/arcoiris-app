import React, { useState } from "react";
import { Image, Pressable,Alert } from "react-native";
import { Center, GlassContainer } from "../components";
import { View } from "../components/Themed";
import { TextInput, Button } from "react-native-paper";
import { supabase } from "./lib/supabase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { router } from "expo-router";
import firebase from "../Firebase";
import DashboardMenu from './dashboard-menu';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import "firebase/auth";
import { useLanguage } from "./context/LanguageProvider";
import SwitchLanguage from "../components/SwitchLanguage";

type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

type DashboardScreenProps = {
  navigation: DashboardScreenNavigationProp;
};

// Define el componente DashboardScreen
function DashboardScreen({ navigation }: DashboardScreenProps) {
  return (
    <DashboardMenu navigation={navigation} /> // Pasa la navegación como prop
  );
}
function  LoginScreen({ navigation }: { navigation: LoginScreenNavigationProp }) {
 // const navigation = useNavigation<any>();
  const { translations } = useLanguage();

  const [email1, setEmail1] = React.useState('')
  const [password1, setPassword1] = React.useState('')
  //const navigation = useNavigation();

  const auth = firebase.auth();

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email1, password1)
    .then((userCredential) => {
      Alert.alert("Cuenta creada! Inicia sesión para entrar al sistema.");
      console.log('Account created!')
      const user = userCredential.user;
      console.log(user)
    })
    .catch(error => {
      console.log(error)
      Alert.alert(error.message)
    })
  }

  const handleSignIn = () => {

    signInWithEmailAndPassword(auth, email1, password1)
    .then((userCredential) => {
      Alert.alert("Inicio de sesión exitoso! Bienvenido.");
      console.log('Inicio de sesión exitoso!');
      const user = userCredential.user;
      console.log(user);
      navigation.navigate('Dashboard');

      // navigation.navigate('Home');
    })
    .catch((error) => {
      if ((error.code === "auth/user-not-found")||(error.code === "auth/invalid-credential")) {
        Alert.alert("Verifica que el usuario ya este creado si no es asi, Por favor, cree una cuenta.");
      } else {
        Alert.alert("Error", error.message);
      }
    });
  }
  return (
   
    <Center p={30}>
      <SwitchLanguage />
      <GlassContainer>
        <Image
          source={require("../assets/images/arcoiris.png")}
          style={{ width: 160, height: 125 }}
        />
        <View style={{ width: "100%" }}>
          <TextInput
            label={translations.emailPlaceholderText}
            mode="outlined"
            style={{ backgroundColor: "#fff" }}
            value={email1}
            onChangeText={(text) => setEmail1(text)}
          />
          <TextInput
            label="password"             
            secureTextEntry={true}
            mode="outlined"
            style={{ backgroundColor: "#fff", marginTop: 30 }}
            value={password1}
            onChangeText={(text) => setPassword1(text)}
          />
        </View>
        <Pressable onPress={handleSignIn}>
          <Button mode="contained" textColor="#fff">
            Login
          </Button>
        </Pressable>
        <Pressable onPress={handleCreateAccount}>
          <Button mode="contained" textColor="#fff">
            Crear cuenta
          </Button>
        </Pressable>
      </GlassContainer>
    </Center>
  );
}
const Stack = createNativeStackNavigator<RootStackParamList>();
  
export default function App() {
return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
);
}
