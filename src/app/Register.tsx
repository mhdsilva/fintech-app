import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { RootStackParamList } from "../../App";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function Register({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setModalVisible(true);
    try {
      await axios.post("https://backend-fintech-navy.vercel.app/api/register", {
        name: name,
        email: email,
        password: password,
      });
      setLoading(false);
    } catch (error) {
      setModalVisible(false);
      setLoading(false);
      console.log("Erro ao se cadastrar:", error);
    }
  };

  return (
    <View className="flex-1 bg-white flex-col p-10">
      <View className="items-center mt-10">
        <Text className="text-3xl font-bold">
          Fin<Text className="text-primary">Tech</Text>
        </Text>
      </View>
      <View className="h-full">
        <View className="flex-1 flex-col items-center justify-center gap-10">
          <Text className="text-4xl font-bold">Cadastro</Text>
          <View className="w-full items-center gap-4">
            <Input
              label="Nome:"
              placeholder="Ex: João da Silva"
              className="w-full"
              onChangeText={setName}
            />
            <Input
              label="Email:"
              placeholder="Ex: joao@gmail.com"
              className="w-full"
              onChangeText={setEmail}
            />
            <Input
              label="Senha:"
              placeholder="Ex: ********"
              secureTextEntry
              className="w-full"
              onChangeText={setPassword}
            />
          </View>
          <View className="w-full items-center gap-4">
            <Button
              label="Cadastrar"
              variant="default"
              size="lg"
              className="w-full"
              onPress={handleRegister}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              className="items-center "
            >
              <Text className="text-primary">Já tem uma conta?</Text>
              <Text className="text-primary">Faça o login!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {loading ? (
          <View className="flex-1 p-10 items-center justify-center opacity bg-black/20 ">
            <View className="bg-white w-5/6 h-2/6 rounded-lg items-center justify-center p-10 gap-y-24">
              <Text className="font-bold text-xl text-center">
                Carregando...
              </Text>
            </View>
          </View>
        ) : (
          <View className="flex-1 p-10 items-center justify-center opacity bg-black/20 ">
            <View className="bg-white w-5/6 h-2/6 rounded-lg items-center p-10 gap-y-24">
              <Text className="font-bold text-xl text-center">
                Usuário criado com sucesso!
              </Text>
              <Button
                label="Ok"
                variant="default"
                onPress={() => navigation.navigate("Login")}
                className="w-full h-15"
              />
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}
