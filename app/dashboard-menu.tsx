import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Navbar, OptionCard, Title } from '../components';

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
      href: "products",
    },
    {
      icon: require("../assets/images/people.png"),
      label: "employees",
      href: "employees",
    }
  ]
  return (
    <View
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Navbar logoShown={false} />
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
            <OptionCard key={idx} icon={opt.icon} label={opt.label} href={opt.href} />
          ))
        }
      </View>
    </View>
  )
}
