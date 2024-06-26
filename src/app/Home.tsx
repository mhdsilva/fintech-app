import { View, Text } from "react-native";
import Header from "../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Home({ navigation }: Props) {
  return (
    <View className="flex-1 flex-col mt-10">
      <Header />
      <View className="p-10 gap-y-6">
        <View className="flex-row items-center justify-between h-fit">
          <Text className="text-2xl font-bold">Ativos em alta:</Text>
          <Input placeholder="Pesquisar..." className="w-40" />
        </View>
        <View className="gap-y-4">
          <Text className="text-xl font-bold">Filtrar por:</Text>
          <View className="flex-row items-center gap-4">
            <Button label="Maior PL" variant="default" size="sm" />
            <Button label="Menor PL" variant="secondary" size="sm" />
          </View>
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Tag do ativo</CardTitle>
              <Button label="Seguir" variant="default" size="sm" />
            </CardHeader>
            <CardContent>
              <Text className="text-base text-primary">
                Sleek, easy to use components to build your next app faster.
              </Text>
            </CardContent>
          </Card>
        </View>
      </View>
    </View>
  );
}
