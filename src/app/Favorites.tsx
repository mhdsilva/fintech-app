import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Header from "../components/Header";
import { Button } from "../components/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/Card";

type Props = NativeStackScreenProps<RootStackParamList, "Favorites">;

type DataItem = {
  fields: {
    name: string;
    sticker: string;
    user: string;
    email: string;
  };
  id: string;
};

const fetchFavorites = async (email: string | undefined) => {
  try {
    const res = await axios.get(
      "https://backend-fintech-navy.vercel.app/api/favorite",
      {
        params: {
          email: email,
        },
      }
    );
    return res.data.data.records;
  } catch (error) {
    console.error(error);
  }
};

export default function Favorites({ navigation, route }: Props) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  const removeFavorite = async (id: string) => {
    try {
      await axios.delete(
        `https://backend-fintech-navy.vercel.app/api/favorite/`,
        {
          params: {
            id: id,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
    const fetchData = async () => {
      const res = await fetchFavorites(user?.email);
      setItems(res);
    };

    fetchData();
  });

  const renderItem = ({ item }: { item: DataItem }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Details", { stockId: item.fields.sticker })
      }
    >
      <Card
        key={item.id}
        className="flex-row justify-between items-center mb-5 py-4"
      >
        <CardHeader>
          <CardTitle className="font-bold">{item.fields.name}</CardTitle>
          <Text className="font-normal">{item.fields.sticker}</Text>
        </CardHeader>
        <CardContent className="items-center justify-center">
          <Icon name="delete-outline" color="#8100BD" onPress={() => removeFavorite(item.id)} />
        </CardContent>
      </Card>
    </TouchableOpacity>
  );

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl">Usuário não logado</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white flex-col p-10">
      <Header navigation={navigation} route={route.name} />
      <View className="h-full gap-y-10 flex-1">
        <View className="flex-row mt-10 items-center justify-start gap-x-4 h-fit">
          <Icon name="arrow-back" onPress={() => navigation.goBack()} />
          <Text className="text-2xl font-bold">Meus ativos:</Text>
        </View>
        {items.length > 0 ? 
        <FlatList
          data={items}
          keyExtractor={(item: any) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        /> :
        <View className="flex-1 items-center justify-center">
          <Text className="text-xl">Nenhum ativo favoritado</Text>
        </View>
        }
      </View>
    </View>
  );
}
