import React from "react";
import { View } from "../components/Themed";
import { Navbar, Title } from "../components";
import DataList from "../components/reusable/DataList";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

export default function SalesEventsScreen() {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <Navbar logoShown />
      <Title size="md" bold>
        Registro de auditoria
      </Title>
      <SafeAreaView>
        <ScrollView>
          <DataList
            columns={["Empleado", "Accion", "Hora"]}
            rows={[
              ["Saul Garza", "ha cobrado 3 productos", "14:42"],
              ["Erick Mendoza", "ha ingresado con exito", "12:00"],
              ["Paola Salazar", "ha cobrado 4 productos", "11:20"],
              ["Saul Garza", "ha cobrado 6 productos", "12:19"],
              ["Saul Garza", "ha ingresado con exito", "10:40"],
              ["Paola Salazar", "ha ingresado con exito", "10:32"],
              ["Javier Martinez", "ha cobrado 1 productos", "9:26"],
              ["Javier Martinez", "ha ingresado con exito", "9:00"],
            ]}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
