import { Pressable, View, Text } from "react-native";
import { ModalContentProps } from "../../interfaces";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";

export const QRContent = ({
  searchQuery,
  handleSearch,
  filteredProducts,
  setModalContent,
  hideModal,
}: ModalContentProps) => (
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

    <View
      style={{
        display: "flex",
        gap: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FontAwesome name="barcode" color="black" size={100} />
      <TextInput
        placeholder="Ingresar Código"
        placeholderTextColor="#515776"
        value={searchQuery}
        onChangeText={handleSearch}
      />
    </View>

    {/* Render the filtered list of products */}
    {filteredProducts.map((product, index) => (
      <View key={index} style={{ padding: 10 }}>
        <Pressable onPress={() => setModalContent("payment")}>
          <Text>
            {product.product} - {product.code} - ${product.price}
          </Text>
        </Pressable>
      </View>
    ))}
  </View>
);
