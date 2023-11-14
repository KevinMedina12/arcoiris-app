import React, { useState, useEffect } from "react";
import { EmployeeList, Title } from "../components";
import { FontAwesome } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { View } from "react-native";
import { supabase } from "./lib/supabase";
import { JobTitle } from "../interfaces";
import { useLanguage } from "./context/LanguageProvider";

interface Employee {
  name: string;
  phone: string;
  jobTitle: JobTitle;
}

export default function Employees() {
  const labels = ["Nombre", "Telefono", "Cargo"];
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { language } = useLanguage();

  const getEmployees = async () => {
    try {
      const { data, error } = await supabase.from("employees").select("*");
      if (error) {
        console.error(error);
        setEmployees([]);
      } else {
        setEmployees(data || []);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <View
      style={{
        padding: 20,
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
        <Title size="md" bold>
          Empleados
        </Title>
        <FontAwesome
          name="address-book"
          color="white"
          size={24}
          onPress={() => router.push("/register")}
        />
      </View>
      <Title size="md">
        {language === "es" ? "Bienvenido" : "Welcome"}, Sebastian Mendoza
      </Title>
      <EmployeeList labels={labels} employees={employees} />
    </View>
  );
}
