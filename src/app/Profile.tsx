import React from "react";
import { View, Text } from "react-native";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function Profile({ navigation }: Props) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate("Login");
  }

  console.log(user);

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl">Usuário não logado</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white flex-col p-10">
      <View className="items-center mt-10">
        <Text className="text-3xl font-bold">
          Fin<Text className="text-primary">Tech</Text>
        </Text>
      </View>
      <View className="h-full">
        <View className="flex-1 flex-col items-center justify-center gap-10">
          <Text className="text-4xl font-bold">Profile</Text>
          <Text className="text-2xl font-bold">Name: {user.name}</Text>
          <Text className="text-2xl font-bold">Email: {user.email}</Text>
          <Button
            label="Sair"
            variant="default"
            size="lg"
            onPress={handleLogout}
            className="w-full"
          />
        </View>
      </View>
    </View>
  );
}
