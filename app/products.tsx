import React from 'react';
import { Center, DataTableProducts, Navbar, Title } from '../components';
import { Text, View } from '../components/Themed';

export default function Products() {

  const [items] = React.useState([
    {
      key: 1,
      name: "Cupcake",
      quantity: 356,
      price: 16,
      provider: "Pelikan",
    },
    {
      key: 2,
      name: "Cupcake",
      quantity: 356,
      price: 16,
      provider: "Pelikan",
    },
    {
      key: 3,
      name: "Cupcake",
      quantity: 356,
      price: 16,
      provider: "Pelikan",
    },
    {
      key: 4,
      name: "Cupcake",
      quantity: 356,
      price: 16,
      provider: "Pelikan",
    },
    {
      key: 5,
      name: "Cupcake",
      quantity: 356,
      price: 16,
      provider: "Pelikan",
    },
    {
      key: 6,
      name: "Cupcake",
      quantity: 356,
      price: 16,
      provider: "Pelikan",
    },
  ]);
  return (
    <View>
      <Navbar logoShown />
      <Title size='md' bold>Productos</Title>
      <DataTableProducts items={items} />
    </View>
  )
}
