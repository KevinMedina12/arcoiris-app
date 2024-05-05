import React, { useState, useEffect } from "react";
import { DataTableProducts, Navbar, Title } from "../components";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useLanguage } from "./context/LanguageProvider";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { db } from '../Firebase'; 
import { collection } from 'firebase/firestore';

import { QuerySnapshot } from 'firebase/firestore';

export default function StoragePage() {
  const { language } = useLanguage();

  const [items, setItems] = useState<any[]>([]);

  const [newProduct, setNewProduct] = useState({
    key: 0,
    name: "",
    quantity: 0,
    price: 0,
    provider: "",
  });

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('Productos').onSnapshot((snapshot: QuerySnapshot) => {
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(products);
    });
    
    return () => unsubscribe();
  }, []);
  

    
  const handleInputChange = (key: string, value: string) => {
    let parsedValue: string | number = value;
  
    // Realiza la conversión de tipo si es necesario
    if (key === "quantity" || key === "price") {
      parsedValue = parseFloat(value) || 0;
    }
  
    setNewProduct({ ...newProduct, [key]: parsedValue });
  };

  const addProduct = async () => {
    try {
      // Generar un id incremental
      const newId = items.length + 1;
  
      // Agregar el nuevo producto con el id incremental
      const docRef = await firebase.firestore().collection('Productos').add({ ...newProduct, key: newId });
      console.log("Producto añadido con ID: ", newId);
  
      // Actualizar el estado con el nuevo producto
      setItems([...items, { ...newProduct, key: newId }]);
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
  

  const deleteProduct = async (id: string) => {
    try {
      await db.collection('Productos').doc(id).delete();
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error al eliminar producto: ", error);
    }
  };
  
  
  
  return (
    <View style={styles.container}>
      <Navbar logoShown />
      <Title size="md" bold>
        {language === "es" ? "Inventario" : "Storage"}
      </Title>
      <DataTableProducts
        items={items}
        onDelete={(id: string) => deleteProduct(id)}
        
      />
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
          onChangeText={(text) =>
            handleInputChange("quantity", text)
          }
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          value={newProduct.price.toString()}
          onChangeText={(text) =>
            handleInputChange("price", text)
          }
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },
  formContainer: {
    width: "80%",
    marginTop: 20,
    backgroundColor: "white", // Agregado para que el fondo sea blanco
    padding: 20, // Agregado para dar espacio interno al contenedor del formulario
    borderRadius: 10, // Agregado para dar bordes redondeados al contenedor
    shadowColor: "#000", // Agregado para dar sombra al contenedor
    
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  input: {
    height: 40,
    borderColor: "gray",
    
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5, // Agregado para dar bordes redondeados a los inputs
    color: "black",
  },
});
