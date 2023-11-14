import React, { createContext, useContext, useState, ReactNode } from "react";

type Translations = {
  emailPlaceholderText: string;
  passwordPlaceholderText: string;
  signInLabelText: string;
  clientsLabel: string;
  salaesLabel: string;
  manageProductsLabel: string;
  productsLabel: string;
  employeeLabel: string;
};

type LanguageContextType = {
  language: string;
  toggleLanguage: () => void;
  translations: Translations;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

type LanguageProviderProps = {
  children: ReactNode;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState("es"); // Default language is English

  const translations = {
    emailPlaceholderText: language === "es" ? "Correo Electrónico" : "Email",
    passwordPlaceholderText: language === "es" ? "Contraseña" : "Password",
    signInLabelText: language === "es" ? "Iniciar Sesión" : "Sign In",
    clientsLabel:
      language === "es" ? "Clientes y Proveedores" : "Clients and Providers",
    salaesLabel: language === "es" ? "Ventas" : "Sales",
    manageProductsLabel: language === "es" ? "Almacén" : "Storage",
    productsLabel: language === "es" ? "Productos" : "Products",
    employeeLabel: language === "es" ? "Empleados" : "Employees",
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en"); // Toggle between English and Spanish for example
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, translations }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
