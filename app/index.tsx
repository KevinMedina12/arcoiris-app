import React, { useState } from "react";
import { Image, Pressable } from "react-native";
import { Center, GlassContainer } from "../components";
import { View } from "../components/Themed";
import { TextInput, Button } from "react-native-paper";
import { supabase } from "./lib/supabase";
import { router } from "expo-router";
import { useLanguage } from "./context/LanguageProvider";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { translations } = useLanguage();

  const handleLogin = async () => {
    try {
      if (!email.trim() && !password.trim()) {
        alert("Todos los campos deben ser llenados");
        return;
      }
      setEmail("");
      setPassword("");
      router.push("/dashboard-menu");
    } catch (error) {
      console.error("Error saving data to Supabase:", error);
    }
  };

  return (
    <Center p={30}>
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
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            label={translations.passwordPlaceholderText}
            secureTextEntry
            mode="outlined"
            style={{ backgroundColor: "#fff", marginTop: 30 }}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Pressable onPress={handleLogin}>
          <Button mode="contained" textColor="#fff">
            {translations.signInLabelText}
          </Button>
        </Pressable>
      </GlassContainer>
    </Center>
  );
}
