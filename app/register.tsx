import React, { useReducer, useState } from "react";
import { Center, Navbar, Title } from "../components";
import { Pressable, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import { supabase } from "./lib/supabase";
import { router } from "expo-router";

type State = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

type Action = {
  type: string;
  field: string;
  payload: string;
};

const initialState: State = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.payload };
    default:
      return state;
  }
};

const fields = [
  { placeholder: "Nombre", key: "name" },
  { placeholder: "Apellido", key: "lastName" },
  { placeholder: "Correo electrónico", key: "email" },
  { placeholder: "Teléfono", key: "phone" },
  { placeholder: "Contraseña", key: "password" },
];

const Register: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const data = [
    { key: "1", value: "Empleado" },
    { key: "2", value: "Supervisor" },
    { key: "3", value: "Administrador" },
  ];

  const register = async () => {
    try {
      const { name, lastName, email, phone, password } = state;
      if (
        !name.trim() &&
        !lastName.trim() &&
        !email.trim() &&
        !phone.trim() &&
        !password.trim() &&
        !selectedJobTitle.trim()
      ) {
        alert("Todos los campos deben ser llenados");
        return;
      }

      const { error } = await supabase.from("employees").insert([
        {
          name: name,
          lastName: lastName,
          email: email,
          phone: phone,
          password: password,
          jobTitle: selectedJobTitle,
        },
      ]);

      if (error) {
        console.error(error);
        return;
      }

      alert("Empleado registrado.");
      router.replace("/employees");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Center>
      <Navbar logoShown={false} />
      <Title size="md" bold>
        Registro
      </Title>
      <View style={{ width: 300, padding: 40 }}>
        {fields.map((field, idx) => (
          <TextInput
            key={idx}
            placeholder={field.placeholder}
            mode="outlined"
            secureTextEntry={field.key === "password"}
            autoCapitalize={field.key === "email" ? "none" : "words"}
            keyboardType={field.key === "email" ? "email-address" : "default"}
            style={{ backgroundColor: "#fff", marginTop: 10 }}
            placeholderTextColor="black"
            value={state[field.key as keyof State]}
            onChangeText={(text) =>
              dispatch({ type: "SET_FIELD", field: field.key, payload: text })
            }
          />
        ))}
        <SelectList
          setSelected={(val: string) => setSelectedJobTitle(val)}
          placeholder="Tipo"
          data={data}
          save="value"
          search={false}
          boxStyles={{
            backgroundColor: "#fff",
            marginTop: 10,
          }}
          inputStyles={{
            backgroundColor: "#fff",
          }}
          dropdownStyles={{
            backgroundColor: "#fff",
          }}
          dropdownItemStyles={{
            backgroundColor: "#fff",
          }}
        />
        <Pressable onPress={register}>
          <Button
            mode="contained"
            buttonColor="#3441D4"
            textColor="white"
            style={{ marginTop: 20 }}
          >
            Registrar
          </Button>
        </Pressable>
      </View>
    </Center>
  );
};

export default Register;
