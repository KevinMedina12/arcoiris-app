import React, { ReactNode } from "react";
import { View } from "react-native";
import { Text } from "./Themed";
import { JobTitle } from "../interfaces";

interface Props {
  type: JobTitle;
  children: ReactNode;
}

export const Badge: React.FC<Props> = ({ type, children }) => {
  return (
    <View
      style={{
        backgroundColor:
          type === "Administrativo"
            ? "#4200FF"
            : type === "Supervisor"
              ? "#126540"
              : "#91BBFF",
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
      }}
    >
      <Text
        style={{
          color:
            type === "Administrativo"
              ? "#A88AFF"
              : type === "Supervisor"
                ? "#5EFAB4"
                : "#201CFF",
        }}
      >
        {children}
      </Text>
    </View>
  );
};
