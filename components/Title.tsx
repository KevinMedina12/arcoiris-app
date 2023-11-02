import React, { ReactNode } from "react";
import { Text } from "./Themed";

interface Props {
  children: ReactNode;
  size: "sm" | "md" | "lg";
  bold?: boolean;
  color?: string;
}

export const Title: React.FC<Props> = ({ children, size, bold, color }) => {
  return (
    <Text
      style={{
        fontWeight: bold ? "bold" : "normal",
        fontSize: size === "sm" ? 14 : size === "md" ? 20 : 24,
        textAlign: "center",
        color: color ? color : "#fff"
      }}
    >
      {children}
    </Text>
  );
};
