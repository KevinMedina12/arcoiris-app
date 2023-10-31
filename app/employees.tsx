import React from "react";
import { Center, EmployeeList, Title } from "../components";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "react-native";
import { JobTitle } from "../interfaces";

export default function Employees() {
  const labels = ["Nombre", "Correo", "Telefono", "Cargo"];

  const employees = [
    {
      name: "Diego",
      email: "diego@gmail.com",
      phone: "8282882828",
      jobTitle: "Supervisor" as JobTitle,
    },
  ];

  return (
    <View
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <FontAwesome
          name="chevron-left"
          onPress={() => router.back()}
          color="white"
          size={24}
        />
        <Title size="md" bold>Empleados</Title>
        <FontAwesome name="address-book" color="white" size={24} onPress={() => router.push("/register")} />
      </View>
      <Title size="md">
        Bienvenido, Sebastian Mendoza
      </Title>
      <EmployeeList labels={labels} employees={employees} />
    </View>
  );
}
