import { Pressable, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { Title } from "../Title";
import { ModalContentProps } from "../../interfaces";

export const DefaultContent = ({ hideModal, handleQRPress }: Pick<ModalContentProps, 'hideModal' | 'handleQRPress'>) => (
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
);
