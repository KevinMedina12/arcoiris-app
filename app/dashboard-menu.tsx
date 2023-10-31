import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { OptionCard, Title } from '../components';
import { router } from 'expo-router';

export default function DashboardMenu() {
  const menuOptions = [
    {
      icon: require("../assets/images/user-group.png"),
      label: "Clientes y Proveedores",
      href: "clients"
    },
    {
      icon: require("../assets/images/tag.png"),
      label: "Ventas",
      href: "sales"
    },
    {
      icon: require("../assets/images/almacen.png"),
      label: "Almacen",
      href: "storage"

    },
    {
      icon: require("../assets/images/productos.png"),
      label: "products",
    },
    {
      icon: require("../assets/images/people.png"),
      label: "employees",
    }
  ]
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
        <FontAwesome name="address-book" color="white" size={24} onPress={() => router.push("/register")} />
      </View>
      <Title size="md">
        Hola, Sebastian Mendoza
      </Title>
      <View style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 20
      }}>
        {
          menuOptions.map((opt, idx) => (
            <OptionCard icon={opt.icon} label={opt.label} />
          ))
        }
      </View>
    </View>
  )
}
