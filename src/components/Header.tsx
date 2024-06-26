import React from "react";
import { View, Image } from "react-native";
import { Icon } from "react-native-elements";

export default function Header() {
  return (
    <View className="flex-row items-start justify-between p-10">
      <Image source={require("../../assets/images/LOGO.png")} />
      <View className="flex-row items-center justify-center gap-2">
        <Icon name="favorite-border" size={24} />
        <Icon name="perm-identity" size={24} />
      </View>
    </View>
  );
}
