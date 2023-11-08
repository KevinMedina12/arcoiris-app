import React, { useCallback, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import DataList from "../components/reusable/DataList";
import { Navbar, Title } from "../components";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Content, ModalContentProps } from "../interfaces";
import { DefaultContent } from "../components/modal/DefaultContent";
import { QRContent } from "../components/modal/QRContent";
import {
  CashPaymentContent,
  PaymentContent,
} from "../components/modal/PaymentContent";

type Route = "sales" | "billing";

const initialRows = [
  ["Calculadora Casio X-64", "13", "50.00"],
  ["Lapiz RM", "20", "8.00"],
  ["Sobre Carta", "25", "3.00"],
];

const columns = ["Producto", "Cantidad", "Valor"];

const productsMock = [
  {
    product: "Calculadora Casio",
    code: "9284593",
    price: "240.00",
  },
  {
    product: "Lapiz PM",
    code: "0409299",
    price: "24.50",
  },
  {
    product: "Libreta Scribe",
    code: "0303404",
    price: "44.00",
  },
];

export default function Sales() {
  const [route, setRoute] = useState<Route>("sales");
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState<Content>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsMock);
  const [rows, setRows] = useState(initialRows);

  const containerStyle = {
    backgroundColor:
      modalContent === "default"
        ? "#1F2636"
        : modalContent === "qr"
          ? "#fff"
          : "#1F2636",
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

  const showModal = useCallback(() => {
    setModalContent("default");
    setVisible(true);
  }, []);

  const hideModal = useCallback(() => setVisible(false), []);

  const handleDelete = useCallback((index: number) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  }, []);

  const handleQRPress = useCallback(() => {
    setModalContent("qr");
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setFilteredProducts(
      query.trim()
        ? productsMock.filter((product) => product.code.includes(query.trim()))
        : productsMock
    );
  }, []);

  const renderRoute = useCallback(() => {
    switch (route) {
      case "sales":
        return (
          <DataList
            columns={["Producto", "Cantidad", "Valor"]}
            rows={rows}
            onDelete={handleDelete}
          />
        );
      case "billing":
        return (
          <Text style={{ fontSize: 20, textAlign: "center" }}>Facturación</Text>
        );
      default:
        return (
          <DataList
            columns={["Producto", "Cantidad", "Valor"]}
            rows={rows}
            onDelete={handleDelete}
          />
        );
    }
  }, [route, rows, handleDelete]);

  const ModalContent = ({
    modalContent,
    ...props
  }: { modalContent: Content } & ModalContentProps) => {
    switch (modalContent) {
      case "default":
        return <DefaultContent {...props} handleQRPress={handleQRPress} />;
      case "qr":
        return <QRContent {...props} />;
      case "payment":
        return <PaymentContent {...props} />;
      case "cash_payment":
        return <CashPaymentContent />;
      default:
        return <Text>Hola</Text>; // Consider creating a separate component for this default case as well
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
          <ModalContent
            modalContent={modalContent}
            setModalContent={setModalContent}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            filteredProducts={filteredProducts}
            hideModal={hideModal}
            handleQRPress={handleQRPress}
          />
        </Modal>
      </Portal>
      <Button mode="contained" textColor="#fff" onPress={showModal}>
        Realizar pago
      </Button>
    </BlurView>
  );
}
