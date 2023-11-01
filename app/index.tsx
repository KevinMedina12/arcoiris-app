import React, { useState } from "react";
import { Image, Pressable } from "react-native";
import { Center, GlassContainer } from "../components";
import { View } from "../components/Themed";
import { TextInput, Button } from "react-native-paper";
import { supabase } from "./lib/supabase";
import { router } from "expo-router";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      /*      const { data, error } = await supabase.from("users").insert([{ email, password }]);
            if (error) {
              console.error("Error saving data to Supabase:", error);
              return;
            }
      */
      setEmail("");
      setPassword("");
      router.push("/dashboard-menu")
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
            label="Correo electronico"
            mode="outlined"
            style={{ backgroundColor: "#fff" }}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            label="Contraseña"
            secureTextEntry
            mode="outlined"
            style={{ backgroundColor: "#fff", marginTop: 30 }}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Pressable onPress={handleLogin}>
          <Button mode="contained" textColor="#fff">Iniciar sesion</Button>
        </Pressable>
      </GlassContainer>
    </Center>
  );
}
