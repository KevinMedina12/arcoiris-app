import { Pressable, View, Image } from "react-native";
import { ModalContentProps } from "../../interfaces";
import { Title } from "../Title";
import { FontAwesome } from "@expo/vector-icons";
import { Button, TextInput } from "react-native-paper";

export const PaymentContent = ({ hideModal, setModalContent }: Pick<ModalContentProps, 'hideModal' | 'setModalContent'>) => (
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


export const CashPaymentContent = () => (
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
      style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: 'flex-start' }}
    >
      <Title size="sm">
        Monto Recibido
      </Title>
      <TextInput
        placeholder="Monto"
        placeholderTextColor="#fff"
        textColor="#fff"
        mode="outlined"
        keyboardType="numbers-and-punctuation"
        style={{ backgroundColor: "#242B3D", maxWidth: 140, color: '#fff' }}
      />

      <View
        style={{ display: "flex", flexDirection: "row", gap: 15, margin: 20, }}
      >
        {["50", "100", "200", "500"].map((valueOption, idx) => (
          <Pressable
            onPress={() => { }}
            style={{ borderWidth: 0.5, borderColor: "#00F946", borderRadius: 10, padding: 10 }}
            key={idx}
          >
            <Title size="sm">${valueOption}</Title>
          </Pressable>
        ))}
      </View>

      <Button mode="contained" textColor="#fff" style={{ alignSelf: 'center' }}>Realizar pago</Button>
    </View>
  </View>
);
