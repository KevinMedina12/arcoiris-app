import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Divider } from "react-native-paper";
import { View } from "./Themed";
import { Center } from "./Center";
import { Title } from "./Title";
import { Badge } from "./Badge";
import { JobTitle } from "../interfaces";

type Employee = {
  name: string;
  phone: string;
  jobTitle: JobTitle;
};

interface Props {
  labels: string[];
  employees: Employee[];
}

export const EmployeeList: React.FC<Props> = ({ labels, employees }) => {
  return (
    <View>
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 40,
          marginTop: 100,
        }}
      >
        {labels.map((label, idx) => (
          <Title size="sm" bold key={idx}>
            {label}
          </Title>
        ))}
      </View>

      {employees.map((employee, idx) => (
        <SafeAreaView
          key={idx}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 5,
            width: "100%",
            marginTop: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Title size="sm">{employee.name}</Title>
            <Title size="sm">{employee.phone}</Title>
            <Badge type={employee.jobTitle}>{employee.jobTitle}</Badge>
            <Divider style={{ backgroundColor: "#fff" }} />
          </View>
        </SafeAreaView>
      ))}
    </View>
  );
};
