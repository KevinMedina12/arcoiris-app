import { Pressable, View, Image } from "react-native";
import { ModalContentProps } from "../../interfaces";
import { Title } from "../Title";
import { FontAwesome } from "@expo/vector-icons";
import { Button, Divider, TextInput } from "react-native-paper";
import { useLayoutEffect, useState } from "react";
import { Text } from "../Themed";

export const PaymentContent = ({
  hideModal,
  setModalContent,
}: Pick<ModalContentProps, "hideModal" | "setModalContent">) => (
  <View
    style={{
      padding: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 15,
    }}
  >
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Title size="md" bold>
        Metodo de Pago
      </Title>
      <Pressable onPress={hideModal}>
        <FontAwesome name="close" color="#515776" size={20} />
      </Pressable>
    </View>
    <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      <Pressable
        onPress={() => setModalContent("cash_payment")}
        style={{
          backgroundColor: "#242B3D",
          borderRadius: 21,
          padding: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
        }}
      >
        <Image
          source={require("../../assets/images/cash.png")}
          style={{ width: 100, height: 100 }}
        />
        <Title bold size="sm">
          Efectivo
        </Title>
      </Pressable>

      <Pressable
        onPress={() => setModalContent("card_payment")}
        style={{
          backgroundColor: "#242B3D",
          borderRadius: 21,
          padding: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
        }}
      >
        <Image
          source={require("../../assets/images/card.png")}
          style={{ width: 100, height: 100 }}
        />
        <Title bold size="sm">
          Tarjeta
        </Title>
      </Pressable>
    </View>
  </View>
);

export const CashPaymentContent = ({
  handlePayment,
}: {
  handlePayment: () => void;
}) => (
  <View
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 15,
      alignItems: "flex-start",
    }}
  >
    <Title size="md" bold>
      Efectivo
    </Title>

    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        alignItems: "flex-start",
      }}
    >
      <Title size="sm">Total</Title>
      <Title size="md" bold>
        $ 281.88
      </Title>
    </View>

    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "flex-start",
      }}
    >
      <Title size="sm">Monto Recibido</Title>
      <TextInput
        placeholder="Monto"
        placeholderTextColor="#fff"
        textColor="#fff"
        mode="outlined"
        keyboardType="numbers-and-punctuation"
        style={{ backgroundColor: "#242B3D", maxWidth: 140, color: "#fff" }}
      />

      <View
        style={{ display: "flex", flexDirection: "row", gap: 15, margin: 20 }}
      >
        {["50", "100", "200", "500"].map((valueOption, idx) => (
          <Pressable
            onPress={() => { }}
            style={{
              borderWidth: 0.5,
              borderColor: "#00F946",
              borderRadius: 10,
              padding: 10,
            }}
            key={idx}
          >
            <Title size="sm">${valueOption}</Title>
          </Pressable>
        ))}
      </View>

      <Button
        mode="contained"
        textColor="#fff"
        style={{ alignSelf: "center" }}
        onPress={handlePayment}
      >
        Realizar pago
      </Button>
    </View>
  </View>
);

export const CardPaymentContent = () => {
  const [title, setTitle] = useState({
    default: {
      text: "Ingresar Tarjeta en Terminal",
      color: "#fff",
    },
  });
  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useLayoutEffect(() => {
    sleep(5000);
    setTitle({
      default: {
        text: "Se ha pagado correctamente",
        color: "#2BF04B",
      },
    });
  }, []);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 15,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ alignSelf: "flex-start" }}>
        <Title size="md" bold>
          Tarjeta
        </Title>
      </View>

      <Image
        source={require("../../assets/images/card-payment.png")}
        style={{ width: 350, height: 230 }}
      />
      <Title size="md" color={title.default.color}>
        {title.default.text}
      </Title>
    </View>
  );
};

export const BillingContent = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 15,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Title size="sm" bold>
        Av. Aceros 502, Nuevo Mezquital, 66632 Cd. Apodaca, N.L.
      </Title>

      <Divider style={{ backgroundColor: "#ccc" }} />
      <Title size="sm" bold>
        Arcoiris
      </Title>
      <View style={{ display: "flex", flexDirection: "row", gap: 15 }}>
        {["Caja #1", "# de afiliacion 04845476", "10/11/2023 19:25"].map(
          (text, idx) => (
            <Text style={{ textAlign: "center", width: 100 }} key={idx}>
              {text}
            </Text>
          )
        )}
      </View>

      <Divider style={{ backgroundColor: "#ccc" }} />
      <View style={{ display: "flex", flexDirection: "row", gap: 50 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "center",
          }}
        >
          {[
            "Calculadora Casio X-64",
            "Lapiz RM",
            "Sobre Carta",
            "IVA",
            "Pago Total",
            "Monto",
            "Cambio",
          ].map((product, idx) => (
            <Title
              size="sm"
              key={idx}
              bold={product === "IVA" || product === "Pago Total"}
            >
              {product}
            </Title>
          ))}
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            alignItems: "center",
          }}
        >
          {["50.00", "8.00", "3.00", "16.00", "77.00", "100", "23"].map(
            (price, idx) => (
              <Title size="sm" key={idx}
                bold={price === "16.00" || price === "77.00"}
              >
                M.N. ${price}
              </Title>
            )
          )}
        </View>
      </View>
      <Divider />
      <View style={{ alignSelf: "flex-start" }}>
        {[
          "Autorizacion: 06437474",
          "Folio de venta: 03278371",
          "Atendido por: Saul Garza Martinez",
        ].map((opt, idx) => (
          <Text key={idx} style={{ marginTop: 10 }}>
            {opt}
          </Text>
        ))}
      </View>
    </View>
  );
};
