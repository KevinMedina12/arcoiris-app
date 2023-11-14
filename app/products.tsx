import React from "react";
import { Center, DataTableProducts, Navbar, Title } from "../components";
import { Text, View } from "../components/Themed";
import { useLanguage } from "./context/LanguageProvider";

export default function Products() {
  const { language } = useLanguage();

  const [items] = React.useState([
    {
      key: 1,
      name: "Carpeta",
      quantity: 136,
      price: 12.5,
      provider: "Pelikan",
    },
    {
      key: 2,
      name: "Lapiz RM",
      quantity: 221,
      price: 13.0,
      provider: "Bic",
    },
    {
      key: 3,
      name: "Sobre Carta",
      quantity: 62,
      price: 7.0,
      provider: "Pelikan",
    },
    {
      key: 4,
      name: "Caja Clip",
      quantity: 30,
      price: 45.0,
      provider: "Dixon",
    },
    {
      key: 5,
      name: "Tijera scotch",
      quantity: 31,
      price: 16,
      provider: "Scribe",
    },
    {
      key: 6,
      name: "Calculadora Casio",
      quantity: 32,
      price: 140,
      provider: "Casio",
    },
  ]);
  return (
    <View>
      <Navbar logoShown />
      <Title size="md" bold>
        {language === "es" ? "Productos" : "Products"}
      </Title>
      <DataTableProducts items={items} />
    </View>
  );
}
