export type JobTitle = "Administrador" | "Supervisor" | "Empleado";

export type ModalContentProps = {
  setModalContent: (content: Content) => void;
  searchQuery: string;
  handleSearch: (query: string) => void;
  handlePayment: () => void;
  filteredProducts: Product[];
  hideModal: () => void;
  handleQRPress: () => void; // Added this line
};


export type Content = "default" | "qr" | "payment" | "cash_payment" | "card_payment" | "billing";


export type Product = {
  product: string;
  code: string;
  price: string;
};

export type Route = "sales" | "billing";

