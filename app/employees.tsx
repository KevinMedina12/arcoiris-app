
import React, { useState, useEffect } from "react";
import { QuerySnapshot } from 'firebase/firestore';

import { View, Text, Button, StyleSheet, FlatList, TextInput, Alert, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Navbar, OptionCard, Title } from "../components";
import { Pressable } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLanguage } from "./context/LanguageProvider";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { db } from '../Firebase'; 

export default function StoragePage() {
  const { language } = useLanguage();

  const [items, setItems] = useState([]);


  interface Client {
    id: string;
    key: number;
    Nombre: string;
    Telefono: number;
    Direccion: string;
    Email: string;
  }

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('Empleados').onSnapshot((snapshot: QuerySnapshot) => {
      const clients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(clients);
    });
    
    return () => unsubscribe();
  }, []);

  const deleteClient = async (id: string) => {
    console.log(items)
    console.log("Empleados",id);
    try {
      Alert.alert(
        "Confirmar eliminación",
        "¿Estás seguro de que deseas eliminar este Empleado?",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          { 
            text: "Eliminar",
            onPress: async () => {
              await firebase.firestore().collection('Empleados').doc(id).delete();
              //setItems(prevItems => prevItems.filter(item => item.key !== key));
            }
          }
        ]
      );
    } catch (error) {
      console.error("Error al eliminar Empleado: ", error);
    }
  };

  
  

  const addClient = async () => {
    try {
      if (!newClient.Nombre || !newClient.Telefono || !newClient.Direccion || !newClient.Email) {
        Alert.alert("Todos los campos son obligatorios");

        console.log("Todos los campos son obligatorios.");
        return; // Salir de la función si algún campo es nulo
      }
      // Generar un id incremental
      const newId = items.length + 1;
  
      // Agregar el nuevo producto con el id incremental
      const docRef = await firebase.firestore().collection('Empleados').add({ ...newClient, key: newId });
      
      console.log("Cliente añadido con ID: ", newId);
  
      // Actualizar el estado con el nuevo producto
      setItems([...items, { ...newClient, key: newId, id: docRef.id }]);
      setnewClient({
        key: newId + 1,
        Nombre: "",
        Telefono: "",
        Direccion: "",
        Email: "",
   
      });
    } catch (error) {
      console.error("Error al añadir producto: ", error);
    }
  };

  const [newClient, setnewClient] = useState({
    key: 0,
    Nombre: "",
    Telefono: "",
    Direccion: "",
    Email: "",
  });
  const handleInputChange = (key: string, value: string) => {
    let parsedValue: string | number = value;
    if (key === "quantity" || key === "price") {
      parsedValue = parseFloat(value) || 0;
    }
    console.log(key)
    setnewClient({ ...newClient, [key]: parsedValue });
  };
 

  return (
      
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <View style={styles.container}>
        <Navbar logoShown />
        <Title size="md" bold>
          {language === "es" ? "Empleados" : "employees"}
        </Title>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Nombre</Text>
            <Text style={styles.headerText}>Telefono</Text>
            <Text style={styles.headerText}>Direccion</Text>
            <Text style={styles.headerText}>Email</Text>
            <Text style={styles.headerText}>X</Text>

          </View>
          <FlatList
            data={items as Client[]}
            
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.Nombre}</Text>
                <Text style={styles.cell}>{item.Telefono}</Text>
                <Text style={styles.cell}>{item.Direccion}</Text>
                <Text style={styles.cell}>{item.Email}</Text>
                <TouchableOpacity onPress={() => deleteClient(item.id)} style={styles.deleteButton}>
                  <Image source={require('../assets/images/bote.png')} style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View style={styles.formContainer}>
        <Text style={styles.placeholderText}>Nombre</Text>
  <TextInput
    style={styles.input}
    placeholderTextColor="gray"
    placeholder="Ingresa el nombre del cliente"
    value={newClient.Nombre}
    onChangeText={(text) => handleInputChange("Nombre", text)}
  />
  
  <Text style={styles.placeholderText}>Teléfono</Text>
  <TextInput
    style={styles.input}
    placeholderTextColor="gray"
    placeholder="Ingresa el telefono del cliente"
    value={newClient.Telefono}
    onChangeText={(text) => handleInputChange("Telefono", text)}
    keyboardType="numeric"
  />
  
  <Text style={styles.placeholderText}>Dirección</Text>
  <TextInput
    style={styles.input}
    placeholderTextColor="gray"
    placeholder="Ingresa la dirección del cliente"
    value={newClient.Direccion}
    onChangeText={(text) => handleInputChange("Direccion", text)}
  />
  
  <Text style={styles.placeholderText}>Email</Text>
  <TextInput
    style={styles.input}
    placeholderTextColor="gray"
    placeholder="Ingresa el email del cliente"
    value={newClient.Email}
    onChangeText={(text) => handleInputChange("Email", text)}
  />
         <TouchableOpacity onPress={addClient} style={styles.button}>
            <Text style={styles.button1}>Agregar Cliente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  button:{
    borderRadius: 8,
   width:"100%",
   height:"10%",
    backgroundColor: "#DA8FE7",
  },
  button1:{
    marginTop:7,
    fontWeight: "bold",
   color: "black",
   textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',

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
    padding:6,
    textAlign: "center",
  },
  formContainer: {
    width: "80%",
    height: "45%",

    marginTop: 16,
    marginBottom: 94,
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
    elevation: 6,
    alignSelf: 'center',
   
  },
  
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#009688",
    //paddingVertical: 10,
    padding:6,

    //paddingHorizontal: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  tableHeader1: {
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
    marginBottom: 10,
    padding:6,

    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
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
  placeholderText: {
    height: 30,
    color: "black",
  },
  scrollViewContent: {
    flexGrow: 10,
  },
  
});

/*
const menuOptions = [
  {
    icon: require("../assets/images/prepa15.png"),
    label: "Preparatoria 233333333333",
    href: "clients",
  },
  {
    icon: require("../assets/images/prepa6.png"),
    label: "Preparatoria 6",
    href: "sales",
  },
  {
    icon: require("../assets/images/prepa22.png"),
    label: "Preparatoriahu 22",
    href: "storage",
  },
  {
    icon: require("../assets/images/randstad.png"),
    label: "Randstad",
    href: "products",
  },
];

const ClientsRoute = () => {
  return (
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
          icon={opt.icon}
          label={opt.label}
          href={opt.href}
          id={idx}
        />
      ))}
    </View>
  );
};

const providerMock = [
  {
    icon: require("../assets/images/scribe.png"),
    label: "Scribe",
    href: "clients",
  },
  {
    icon: require("../assets/images/dixon.png"),
    label: "Dixon",
    href: "dixon",
  },
  {
    icon: require("../assets/images/bic.png"),
    label: "Bic",
    href: "bic",
  },
  {
    icon: require("../assets/images/pelikan.png"),
    label: "Pelikan",
    href: "pelikan",
  },
];
const ProvidersRoute = () => {
  return (
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
      {providerMock.map((opt, idx) => (
        <OptionCard
          icon={opt.icon}
          label={opt.label}
          href={opt.href}
          id={idx}
        />
      ))}
    </View>
  );
};

export default function Clients() {
  const [route, setRoute] = useState("clients"); // Default route is "clients"
  const { language } = useLanguage();

  const renderRoute = () => {
    switch (route) {
      case "clients":
        return <ClientsRoute />;
      case "providers":
        return <ProvidersRoute />;
      default:
        return <ClientsRoute />;
    }
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <Navbar logoShown />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <Pressable
            onPress={() => setRoute("clients")}
            style={{
              backgroundColor: route === "clients" ? "#243458" : "#0F172A",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Title size="md">
              {language === "es" ? "Clientes" : "Clients"}
            </Title>
          </Pressable>
          <Pressable
            onPress={() => setRoute("providers")}
            style={{
              backgroundColor: route === "providers" ? "#243458" : "#0F172A",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Title size="md">
              {language === "es" ? "Proveedores" : "Providers"}
            </Title>
          </Pressable>
        </View>
        {renderRoute()}
      </View>
    </View>
  );
}
*/