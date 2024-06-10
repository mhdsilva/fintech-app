import { View, Text, Image, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Register({ navigation }: Props) {
  return (
    <View className="flex-1 flex-col">
      <View className="flex-1 items-center mt-10">
        <Image source={require("../../assets/images/LOGO.png")} />
      </View>
      <View className="h-full">
        <View className="flex-1 flex-col items-center justify-center gap-10">
          <Text className="text-4xl font-bold">Cadastro</Text>
          <View className="w-full items-center gap-4">
            <Input
              label="Nome:"
              placeholder="Ex: João da Silva"
              className="w-4/5"
            />
            <Input
              label="Email:"
              placeholder="Ex: joao@gmail.com"
              className="w-4/5"
            />
            <Input
              label="Senha:"
              placeholder="Ex: ********"
              secureTextEntry
              className="w-4/5"
            />
          </View>
          <View className="w-full items-center gap-4">
            <Button
              label="Cadastrar"
              variant="default"
              size="lg"
              className="w-4/5 "
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
    </View>
  );
}
