import React from 'react';
import { DataTableProducts, Navbar, Title } from '../components';
import { View } from '../components/Themed';

export default function StoragePage() {

  const [items] = React.useState([
    {
      key: 1,
      name: "Carpeta",
      quantity: 136,
      price: 12.50,
      provider: "Pelikan",
    },
    {
      key: 2,
      name: "Lapiz RM",
      quantity: 221,
      price: 13.00,
      provider: "Bic",
    },
    {
      key: 3,
      name: "Sobre Carta",
      quantity: 62,
      price: 7.00,
      provider: "Pelikan",
    },
    {
      key: 4,
      name: "Caja Clip",
      quantity: 30,
      price: 45.00,
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
      <Title size='md' bold>Inventario</Title>
      <DataTableProducts items={items} />
    </View>
  )
}
