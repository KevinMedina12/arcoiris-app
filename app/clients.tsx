import React, { useState } from "react";
import { Navbar, OptionCard, Title } from "../components";
import { View } from "../components/Themed";
import { Pressable } from "react-native";
import { useLanguage } from "./context/LanguageProvider";

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
    label: "Preparatoria 22",
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
          key={idx}
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
          key={idx}
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
