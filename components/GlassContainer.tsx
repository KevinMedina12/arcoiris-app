import React, { ReactNode } from "react";
import { View } from "react-native";

interface Props {
  children: ReactNode;
}

export const GlassContainer: React.FC<Props> = ({ children }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
        borderRadius: 16,
        backgroundColor: "#0F172A",
        boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
        backdropFilter: "blur(7px)",
        height: '105%',
        width: "112%",
        padding: 30,
      }}
    >{children}</View>
  );
};
