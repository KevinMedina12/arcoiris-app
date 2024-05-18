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

  const [items, setItems] = useState([]);


  interface Product {
    id: string;
    key: number; // Cambia id por key si en la base de datos se llama así
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

  const deleteProduct = async (key: string) => {
    console.log("ds",key)
    try {
      Alert.alert(
        "Confirmar eliminación",
        "¿Estás seguro de que deseas eliminar este producto?",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          { 
            text: "Eliminar",
            onPress: async () => {
              await firebase.firestore().collection('Productos').doc(key).delete();
              setItems(prevItems => prevItems.filter(item => item.key !== key));
            }
          }
        ]
      );
    } catch (error) {
      console.error("Error al eliminar producto: ", error);
    }
  };

  
  

  const addProduct = async () => {
    try {
      // Generar un id incremental
      const newId = items.length + 1;
  
      // Agregar el nuevo producto con el id incremental
      const docRef = await firebase.firestore().collection('Productos').add({ ...newProduct, key: newId });
      console.log("Producto añadido con ID: ", newId);
  
      // Actualizar el estado con el nuevo producto
      setItems([...items, { ...newProduct, key: newId, id: docRef.id }]);
      console.log("set",setItems)
      setNewProduct({
        key: newId + 1, // Incrementar el id para el próximo producto
        name: "",
        quantity: 0,
        price: 0,
        provider: "",
      });
    } catch (error) {
      console.error("Error al añadir producto: ", error);
    }
  };

  const [newProduct, setNewProduct] = useState({
    key: 0,
    name: "",
    quantity: 0,
    price: 0,
    provider: "",
  });

  const handleInputChange = (key: string, value: string) => {
    let parsedValue: string | number = value;
    if (key === "quantity" || key === "price") {
      parsedValue = parseFloat(value) || 0;
    }
    setNewProduct({ ...newProduct, [key]: parsedValue });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      
    <View style={styles.container}>
      <Navbar logoShown />
      <Title size="md" bold>
        {language === "es" ? "Productos" : "Storage"}
      </Title>
      <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
  <Text style={styles.headerText}>Nombre</Text>
  <Text style={styles.headerText}>Cantidad</Text>
  <Text style={styles.headerText}>Precio</Text>
  <Text style={styles.headerText}>Proveedor</Text>
</View>

        <FlatList
          data={items as Product[]} // Forzamos la tipificación manual aquí
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
      <View style={styles.bottomSpace2}></View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={newProduct.name}
          onChangeText={(text) => handleInputChange("name", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Cantidad"
          value={newProduct.quantity.toString()}
          onChangeText={(text) => handleInputChange("quantity", text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          value={newProduct.price.toString()}
          onChangeText={(text) => handleInputChange("price", text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Proveedor"
          value={newProduct.provider}
          onChangeText={(text) => handleInputChange("provider", text)}
        />
        <Button title="Agregar Producto" onPress={addProduct} />
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
  bottomSpace2: {
    height: 70, // Puedes ajustar esta altura según sea necesario
  },
    
  cell: {
    flex: 1,
    textAlign: "center",
  },
  formContainer: {
    width: "80%",
    marginTop: -30, // Ajusta este valor según sea necesario
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
