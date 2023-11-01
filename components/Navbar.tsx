import React from "react";
import { View } from "./Themed";
import { Pressable, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

interface Props {
  logoShown: boolean;
}
export const Navbar: React.FC<Props> = ({ logoShown = true }): JSX.Element => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 15,
        marginBottom: 20,
        padding: 15
      }}
    >
      <Pressable onPress={() => router.replace("/dashboard-menu")}>
        <FontAwesome name="chevron-left" color="#fff" size={24} />
      </Pressable>

      {logoShown && (
        <View style={{ display: 'flex', justifyContent: "center", alignContent: "center" }}>
          <Image
            source={require("../assets/images/arcoiris.png")}
            style={{ width: 100, height: 80, marginLeft: 40 }}
          />
        </View>
      )}

      <Pressable
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: "#515776",
          borderRadius: 10,
          width: 60
        }}
        onPress={() => router.replace("/register")}
      >
        <FontAwesome name="address-book" color="#fff" size={20} />
      </Pressable>
    </View>
  );
};
