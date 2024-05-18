import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView, FlatList, TextInput } from "react-native";
import { Navbar, Title } from "../components";
import { useLanguage } from "./context/LanguageProvider";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { db } from '../Firebase'; 
import { collection } from 'firebase/firestore';
import { QuerySnapshot } from 'firebase/firestore';
import { TouchableOpacity, Image } from 'react-native';
import { Alert } from 'react-native';

export default function StoragePage() {
  const { language } = useLanguage();
  
  const [searchTerm, setSearchTerm] = useState("");
  interface Product {
    id: string;
    name: string;
    quantity: number;
    price: number;
    provider: string;
  }
  
  const [items, setItems] = useState<Product[]>([]);
  
  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('Productos').onSnapshot((snapshot: QuerySnapshot) => {
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(products);
    });
    
    return () => unsubscribe();
  }, []);

  const filteredItems = items.filter(item => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const deleteProduct = async (id) => {
    try {
      await firebase.firestore().collection('Productos').doc(id).delete();
    } catch (error) {
      console.error("Error al eliminar producto: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Navbar logoShown />
        <Title size="md" bold>
          {language === "es" ? "Productos" : "Storage"}
        </Title>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Buscar producto..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Nombre</Text>
            <Text style={styles.headerText}>Cantidad</Text>
            <Text style={styles.headerText}>Precio</Text>
            <Text style={styles.headerText}>Proveedor</Text>
          </View>
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.name}</Text>
                <Text style={styles.cell}>{item.quantity}</Text>
                <Text style={styles.cell}>{item.price}</Text>
                <Text style={styles.cell}>{item.provider}</Text>
                <TouchableOpacity onPress={() => deleteProduct(item.id)} style={styles.deleteButton}>
                  <Image source={require('../assets/images/bote.png')} style={styles.deleteIcon}  />
                </TouchableOpacity>
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
  deleteButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
  bottomSpace: {
    height: 400, // Puedes ajustar esta altura según sea necesario
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  formContainer: {
    width: "80%",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "white",
    padding: 20,
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
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#009688",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "black",
  },
  scrollViewContent: {
    flexGrow: 10,
  },
});
