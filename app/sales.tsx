import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView, FlatList, TextInput, Alert } from "react-native";

import { Navbar, Title } from "../components";
import { useLanguage } from "./context/LanguageProvider";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { db } from '../Firebase'; 
import { collection } from 'firebase/firestore';
import { QuerySnapshot } from 'firebase/firestore';
import { TouchableOpacity, Image } from 'react-native';

export default function SalesPage() {
  const { language } = useLanguage();

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sales, setSales] = useState([]);

  interface Product {
    id: string;
    key: number;
    name: string;
    quantity: number;
    price: number;
    provider: string;
  }

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('Productos').onSnapshot((snapshot: QuerySnapshot) => {
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(products);
    });
    
    return () => unsubscribe();
  }, []);

  const handleItemSelect = async (item: Product) => {
    const existingItem = selectedItems.find(selectedItem => selectedItem.id === item.id);
    if (existingItem) {
      if (existingItem.quantity >= item.quantity) {
        Alert.alert("Excede la cantidad disponible", "No puedes seleccionar más de la cantidad disponible.");
        return;
      } else {
        const updatedQuantity = existingItem.quantity + 1;
        const docRef = firebase.firestore().collection('Productos').doc(item.id);
        await docRef.update({ quantity: item.quantity - 1 });
        setSelectedItems(prevItems => prevItems.map(prevItem => prevItem.id === item.id ? { ...prevItem, quantity: updatedQuantity } : prevItem));
      }
    } else {
      setSelectedItems(prevItems => [...prevItems, { ...item, quantity: 1 }]);
    }
    setTotalPrice(prevPrice => prevPrice + item.price);
  };

  const handleFinishSale = async () => {
    try {
      await Promise.all(selectedItems.map(async item => {
        const docRef = firebase.firestore().collection('Productos').doc(item.id);
        const productDoc = await docRef.get();
        const currentQuantity = productDoc.data()?.quantity || 0;
        await docRef.update({ quantity: currentQuantity - item.quantity });
      }));

      // Guardar la venta en la base de datos
      await firebase.firestore().collection('Ventas').add({
        totalPrice,
        products: selectedItems.map(item => ({ name: item.name, quantity: item.quantity })),
        date: new Date()
      });

      setSelectedItems([]);
      setTotalPrice(0);
      Alert.alert("Venta finalizada", "La venta se ha completado exitosamente.");
    } catch (error) {
      console.error("Error al finalizar venta: ", error);
    }
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = selectedItems.filter(item => item.id !== id);
    const deletedItem = selectedItems.find(item => item.id === id);
    setTotalPrice(prevPrice => prevPrice - (deletedItem.quantity * deletedItem.price));
    setSelectedItems(updatedItems);
  };
  

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('Ventas').onSnapshot((snapshot: QuerySnapshot) => {
      const salesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSales(salesData);
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Navbar logoShown />
        <Title size="md" bold>
          {language === "es" ? "Ventas" : "Sales"}
        </Title>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Nombre</Text>
            <Text style={styles.headerText}>Cantidad</Text>
            <Text style={styles.headerText}>Precio</Text>
            <Text style={styles.headerText}>Proveedor</Text>
          </View>
          <FlatList
            data={items as Product[]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.name}</Text>
                <Text style={styles.cell}>{item.quantity}</Text>
                <Text style={styles.cell}>{item.price}</Text>
                <Text style={styles.cell}>{item.provider}</Text>
                <TouchableOpacity onPress={() => handleItemSelect(item)} style={styles.selectButton}>
                  <Text style={styles.selectButtonText}>Seleccionar</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View style={styles.bottomSpace}></View>
        <View style={styles.accountTableContainer}>
          <Title size="md" bold style={styles.accountTitle}>Cuenta</Title>
          <View style={styles.accountTableHeader}>
            <Text style={styles.headerText}>Nombre</Text>
            <Text style={styles.headerText}>Cantidad</Text>
            <Text style={styles.headerText}>Precio</Text>
          </View>
          <View style={styles.accountTable}>
            {selectedItems.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.cell}>{item.name}</Text>
                <Text style={styles.cell}>{item.quantity}</Text>
                <Text style={styles.cell}>{item.price}</Text>
                <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>Precio total: ${totalPrice}</Text>
          </View>
          <Button title="Finalizar Venta" onPress={handleFinishSale} />
        </View>
        <View style={styles.comprasTableContainer}>
          <Title size="md" bold style={styles.comprasTitle}>Compras</Title>
          <View style={styles.comprasTableHeader}>
            <Text style={styles.headerText}>Fecha</Text>
            <Text style={styles.headerText}>Productos</Text>
            <Text style={styles.headerText}>Precio Total</Text>
          </View>
          <FlatList
            data={sales}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.date.toDate().toLocaleDateString()}</Text>
                <Text style={styles.cell}>{item.products.map(product => `${product.name} (${product.quantity})`).join(", ")}</Text>
                <Text style={styles.cell}>{item.totalPrice}</Text>
              </View>
            )}
          />
        </View>
      </View>
      <View style={styles.bottomSpace}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tableContainer: {
    flex: 1,
    width: "85%",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#E0FFFF", // Color celeste
    borderRadius: 5,
    marginBottom: 5,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#009688",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: "#009688",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  selectButtonText: {
    color: "white",
  },
  bottomSpace: {
    height: 20,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  accountTableContainer: {
    width: "85%",
    marginTop: 20,
    //backgroundColor: "#F0F8FF", // Color azul claro
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  accountTitle: {
    marginBottom: 10,
  },
  accountTableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#009688",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  accountTable: {
    marginBottom: 10,
  },
  totalPriceContainer: {
    marginBottom: 10,
  },
  totalPriceText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: "white"
  },
  comprasTableContainer: {
    width: "85%",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  removeButton: {
    backgroundColor: "#FF0000", // Color rojo
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "white",
  },
  comprasTitle: {
    marginBottom: 10,
  },
  comprasTableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#009688",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
});

