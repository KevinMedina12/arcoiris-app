import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Navbar, OptionCard, Title } from "../components";
import { useLanguage } from "./context/LanguageProvider";

export default function DashboardMenu() {
  const { translations, language } = useLanguage();
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
        {language === "es" ? "Hola" : "Hi"}, Sebastian Mendoza
      </Title>
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
