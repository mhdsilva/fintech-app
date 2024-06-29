import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/Card";
import axios from "axios";
import { token } from "../lib/constants";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
type DataItem = {
  name: string;
  stock: string;
  close: string;
  change: string;
};

const fetchItems = async (sortOrder: "asc" | "desc", searchTerm: string) => {
  try {
    const res = await axios.get(`https://brapi.dev/api/quote/list`, {
      params: {
        token: token,
        limit: 5,
        sortBy: "close",
        sortOrder: sortOrder,
        search: searchTerm,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default function Home({ navigation }: Props) {
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchItems(sortOrder, searchTerm).then((res) => {
      setItems(res.stocks);
    });
  }, [sortOrder, searchTerm]);

  const renderItem = ({ item }: { item: DataItem }) => (
    <Card key={item.stock} className="mb-5 py-4">
      <CardHeader className="flex-col gap-y-5">
        <View className="flex-row items-center justify-between">
          <CardTitle>{item.name}</CardTitle>
          <Button
            label="Ver detalhes"
            variant="default"
            size="sm"
            onPress={() =>
              navigation.navigate("Details", { stockId: item.stock })
            }
          />
        </View>
        <View className="h-0.5 bg-gray-700 w-full" />
      </CardHeader>
      <CardContent className="flex-row justify-between">
        <Text className="font-bold text-sm">
          Preço do ativo:{" "}
          <Text className="font-normal">
            {parseFloat(item.close).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </Text>
        <Text className="font-bold text-sm">
          Flutuação no dia:{" "}
          <Text className="font-normal">
            {parseFloat(item.change).toFixed(2).replace(".", ",")}%
          </Text>
        </Text>
      </CardContent>
    </Card>
  );

  return (
    <View className="flex-1 bg-white flex-col p-10">
      <Header />
      <View className="flex-1 mt-10 gap-y-6">
        <View className="flex-row items-center justify-between h-fit">
          <Text className="text-2xl font-bold">Ativos em alta:</Text>
          <Input
            placeholder="Pesquisar..."
            className="w-44"
            onChangeText={setSearchTerm}
          />
        </View>
        <View className="flex-1 gap-y-8">
          <View className="gap-y-2">
            <Text className="text-xl font-bold">Filtrar por:</Text>
            <View className="flex-row items-center gap-4">
              <Button
                label="Maior Preço"
                variant={sortOrder === "desc" ? "default" : "secondary"}
                size="sm"
                onPress={() => setSortOrder("desc")}
              />
              <Button
                label="Menor Preço"
                variant={sortOrder === "asc" ? "default" : "secondary"}
                size="sm"
                onPress={() => setSortOrder("asc")}
              />
            </View>
          </View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.stock}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}
