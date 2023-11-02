import React, { useState } from 'react';
import { Center, Navbar, Title } from '../components';
import { Text, View } from '../components/Themed';
import { Pressable } from 'react-native';

export default function Sales() {
  const [route, setRoute] = useState("sales"); // Default route is "clients"

  const renderRoute = () => {
    switch (route) {
      case "sales":
        return <Title size='sm'>Ventas</Title>
      case "billing":
        return <Title size='sm'>Facturación</Title>
      default:
        return <Title size='sm'>Ventas</Title>
    }
  };
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
      <Navbar logoShown />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <Pressable onPress={() => setRoute("sales")}
          style={{
            backgroundColor: route === "sales" ? "#243458" : "#0F172A",
            padding: 10,
            borderRadius: 10
          }}
        >
          <Title size="md">Ventas</Title>
        </Pressable>
        <Pressable onPress={() => setRoute("billing")}
          style={{
            backgroundColor: route === "billing" ? "#243458" : "#0F172A",
            padding: 10,
            borderRadius: 10
          }}
        >
          <Title size="md">Facturación</Title>
        </Pressable>
      </View>
      {renderRoute()}
    </View>
  )
}
