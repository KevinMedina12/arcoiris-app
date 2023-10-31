import React, { ReactNode } from "react";
import { View } from "react-native";

interface Props {
  children: ReactNode;
  p?: number;
}

export const Center: React.FC<Props> = ({ children, p }) => {
  return (
    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: p, height: "100%" }}>
      {children}
    </View>
  )
}
