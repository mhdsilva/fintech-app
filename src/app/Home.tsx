import { View, Text } from "react-native";
import { Button } from "../components/Button";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Hello World!</Text>
      <Button label="Confirmar" className="border-2" />
    </View>
  );
}
