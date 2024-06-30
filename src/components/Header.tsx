import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";

export default function Header({ navigation }: { navigation: any }) {
  return (
    <View className="flex-row items-start justify-between mt-10">
      <Text className="text-3xl font-bold">
        Fin<Text className="text-primary">Tech</Text>
      </Text>
      <View className="flex-row items-center justify-center gap-2">
        <Icon name="favorite-border" size={24} />
        <Icon name="perm-identity" size={24} onPress={() => navigation.navigate("Profile") } />
      </View>
    </View>
  );
}
