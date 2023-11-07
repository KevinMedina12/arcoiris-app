import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import DataList from "../components/reusable/DataList";
import { Navbar, Title } from "../components";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

export default function Sales() {
  const [route, setRoute] = useState("sales"); // Default route is "sales"
  const [visible, setVisible] = React.useState(false);
  const [modalContent, setModalContent] = useState("default"); // New state to control modal content

  const showModal = () => {
    setModalContent("default"); // Reset modal content to default when showing modal
    setVisible(true);
  };

  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: modalContent === "default" ? "#1F2636" : "#fff",
    padding: 20,
    margin: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  };

  const columns = ["Producto", "Cantidad", "Valor"];
  const initialRows = [
    ["Calculadora Casio X-64", "13", "50.00"],
    ["Lapiz RM", "20", "8.00"],
    ["Sobre Carta", "25", "3.00"],
  ];
  const [rows, setRows] = useState(initialRows);

  const handleDelete = (index: number) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleQRPress = () => {
    setModalContent("qr"); // Change modal content to "qr"
  };

  const renderRoute = () => {
    switch (route) {
      case "sales":
        return (
          <DataList
            columns={columns}
            rows={rows}
            onDelete={(index) => handleDelete(index)}
          />
        );
      case "billing":
        return (
          <Text style={{ fontSize: 20, textAlign: "center" }}>Facturación</Text>
        );
      default:
        return (
          <DataList
            columns={columns}
            rows={rows}
            onDelete={(index) => handleDelete(index)}
          />
        );
    }
  };

  return (
    <BlurView
      intensity={visible ? 100 : 0}
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: visible ? 0.1 : 1,
      }}
      tint="dark"
    >
      <Navbar logoShown />
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 20 }}>
        <Pressable
          onPress={() => setRoute("sales")}
          style={{
            backgroundColor: route === "sales" ? "#243458" : "#0F172A",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 18, color: "white" }}>Ventas</Text>
        </Pressable>
        <Pressable
          onPress={() => setRoute("billing")}
          style={{
            backgroundColor: route === "billing" ? "#243458" : "#0F172A",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 18, color: "white" }}>Facturación</Text>
        </Pressable>
      </View>
      {renderRoute()}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          {modalContent === "default" ? (
            <View>
              <Pressable onPress={handleQRPress}>
                <FontAwesome name="qrcode" color="#FFF3F3" size={20} />
              </Pressable>
              <View style={{ display: "flex", gap: 10 }}>
                <Title size="sm">Subtotal $136.00</Title>
                <Title size="sm">IVA $26.08</Title>
                <Title size="sm" bold>
                  Total: $162.08
                </Title>
              </View>
              <Button
                mode="contained"
                onPress={hideModal}
                style={{ marginTop: 24, borderRadius: 20, paddingVertical: 8 }}
              >
                Realizar pago
              </Button>
            </View>
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                padding: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text>Buscar por codigo de barras</Text>
                <Pressable onPress={hideModal}>
                  <FontAwesome name="close" color="#515776" size={20} />
                </Pressable>
              </View>

              <View style={{ display: "flex", gap: 15, alignSelf: "center" }}>
                <FontAwesome name="barcode" color="black" size={100} />
                <TextInput
                  placeholder="Codigo"
                  placeholderTextColor="#515776"
                />
              </View>
            </View>
          )}
        </Modal>
      </Portal>
      <Button mode="contained" textColor="#fff" onPress={showModal}>
        Realizar pago
      </Button>
    </BlurView>
  );
}
