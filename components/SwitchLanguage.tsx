import React from "react";
import { Switch } from "react-native-paper";
import { useLanguage } from "../app/context/LanguageProvider";
import { Text, View } from "./Themed";

const SwitchLanguage = () => {
  const { language, toggleLanguage } = useLanguage();

  const onToggleSwitch = () => {
    toggleLanguage(); // Toggle the language when the switch is changed
  };

  return (
    <View
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Switch
        value={language === "es"} // Set the switch value based on the current language
        onValueChange={onToggleSwitch}
      />
      <Text style={{ fontWeight: "bold", textTransform: "uppercase", fontSize: 20 }}>
        {language}
      </Text>
    </View>
  );
};

export default SwitchLanguage;
