// dashboard-menu.tsx

import React, { useEffect, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { Navbar, OptionCard, Title } from "../components";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from "./context/LanguageProvider";
import firebase from "../Firebase";
import { Button } from "react-native-paper";

type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

// Exportación por defecto al momento de la declaración
export default function DashboardMenu({ navigation }: { navigation: DashboardScreenNavigationProp }) {
  const { translations, language } = useLanguage();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        setUserName(user.email || 'Usuario');
      }
    };
    fetchUserName();
  }, []);

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate('Login'); // Redirige a la pantalla de inicio de sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const menuOptions = [
    {
      icon: require("../assets/images/user-group.png"),
      label: `${translations.clientsLabel}`,
      href: "clients",
    },
    {
      icon: require("../assets/images/tag.png"),
      label: `${translations.salaesLabel}`,
      href: "sales",
    },
    {
      icon: require("../assets/images/almacen.png"),
      label: `${translations.manageProductsLabel}`,
      href: "storage",
    },
    {
      icon: require("../assets/images/productos.png"),
      label: `${translations.productsLabel}`,
      href: "products",
    },
    {
      icon: require("../assets/images/people.png"),
      label: `${translations.employeeLabel}`,
      href: "employees",
    },
  ];

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
        {language === "es" ? "Hola" : "Hi"}, {userName}
      </Title>
      
      <Pressable onPress={handleSignOut}>
        <Button 
          textColor="#fff"
          style={{ backgroundColor: 'blue' , marginTop: 30 }} 
        >
          Cerrar sesión
        </Button>
      </Pressable>
      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {menuOptions.map((opt, idx) => (
          <OptionCard
            key={idx}
            icon={opt.icon}
            label={opt.label}
            href={opt.href}
          />
        ))}
      </View>
    </View>
  );
}
