import { View, Text, Image, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  return (
    <View className="flex-1 bg-white flex-col p-10">
      <View className="items-center mt-10">
        <Text className="text-3xl font-bold">
          Fin<Text className="text-primary">Tech</Text>
        </Text>
      </View>
      <View className="h-full">
        <View className="flex-1 flex-col items-center justify-center gap-10">
          <Text className="text-4xl font-bold">Login</Text>
          <View className="w-full items-center gap-4">
            <Input
              label="Email:"
              placeholder="Ex: email@dominio.com"
              className="w-full"
            />
            <Input
              label="Senha:"
              placeholder="Ex: ********"
              secureTextEntry
              className="w-full"
            />
          </View>
          <View className="w-full items-center gap-4">
            <Button
              label="Entrar"
              variant="default"
              size="lg"
              className="w-full"
              onPress={() => navigation.navigate("Home")}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              className="items-center "
            >
              <Text className="text-primary">Ainda não tem uma conta?</Text>
              <Text className="text-primary">Cadastre-se!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
