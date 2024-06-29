import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Header from "../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import axios from "axios";
import { token } from "../lib/constants";
import { Button } from "../components/Button";
import { Icon } from "react-native-elements";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;
type dataDetails = {
  longName: string;
  shortName: string;
  regularMarketPrice: string;
  stock: string;
  historicalDataPrice: { date: number; close: number }[];
  regularMarketChangePercent: number;
  priceEarnings: number;
  symbol: string;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
  regularMarketChange: number;
  regularMarketDayLow: number;
  regularMarketDayHigh: number;
};

const interval = "1d";

const fetchDetails = async (stockId: string, range: string) => {
  try {
    const res = await axios.get(`https://brapi.dev/api/quote/${stockId}`, {
      params: {
        token: token,
        range: range,
        interval: interval,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export default function Details({ route, navigation }: Props) {
  const { stockId } = route.params;
  const [details, setDetails] = useState<dataDetails | null>(null);
  const [range, setRange] = useState("5d");

  useEffect(() => {
    fetchDetails(stockId, range).then((res) => {
      setDetails(res.results[0]);
    });
  }, [stockId, range]);

  const chartData = details?.historicalDataPrice.map((data) => ({
    date: new Date(data.date * 1000).toLocaleDateString(),
    close: data.close,
  }));

  let labels: string[] = [];
  if (chartData && chartData.length > 0) {
    labels = [
      chartData[0].date,
      "",
      "",
      "",
      "",
      chartData[chartData.length - 1].date,
    ];
  }

  return (
    <View className="flex-1 bg-white flex-col p-10">
      <Header />
      <View className="flex-1 gap-y-6">
        <View className="flex-row mt-10 items-center justify-start gap-x-4 h-fit">
          <Icon name="arrow-back" onPress={() => navigation.goBack()} />
          <Text className="text-2xl font-bold">
            {details ? details.shortName : null}:
          </Text>
        </View>
        <View className="flex-1 flex-col gap-y-8">
          <View className="flex gap-y-2">
            <Text className="text-xl font-bold">Filtrar por:</Text>
            <View className="flex-row items-center gap-4">
              <Button
                label="5 dias"
                size="sm"
                variant={range === "5d" ? "default" : "secondary"}
                onPress={() => setRange("5d")}
              />
              <Button
                label="1 mês"
                size="sm"
                variant={range === "1mo" ? "default" : "secondary"}
                onPress={() => setRange("1mo")}
              />
              <Button
                label="3 meses"
                size="sm"
                variant={range === "3mo" ? "default" : "secondary"}
                onPress={() => setRange("3mo")}
              />
            </View>
          </View>
          <View className="flex-col gap-y-1">
            <Text className="text-md font-bold">Média de preço:</Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-2xl font-bold">
                {details
                  ? parseFloat(details.regularMarketPrice).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )
                  : null}
              </Text>
              <View
                className={`text-md text-white font-bold p-1 rounded-md flex-row items-center ${
                  details?.regularMarketChangePercent
                    ? details?.regularMarketChangePercent >= 0
                      ? "bg-green"
                      : "bg-red"
                    : ""
                }`}
              >
                <Text className="text-md text-white font-bold">
                  {details?.regularMarketChangePercent
                    .toFixed(2)
                    .replace(".", ",")}
                  %
                </Text>
                {details?.regularMarketChangePercent ? (
                  details?.regularMarketChangePercent >= 0 ? (
                    <Icon name="arrow-upward" size={16} color="#FFFFFF" />
                  ) : (
                    <Icon name="arrow-downward" size={16} color="#FFFFFF" />
                  )
                ) : null}
              </View>
            </View>
          </View>
          {chartData && (
            <LineChart
              data={{
                labels: labels,
                datasets: [
                  {
                    data: chartData.map((data) => data.close),
                  },
                ],
              }}
              width={320}
              height={200}
              yAxisLabel="$"
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(129, 0, 189, ${opacity})`,
                labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                propsForBackgroundLines: {
                  strokeWidth: 0,
                },
                propsForDots: {
                  r: "0",
                },
              }}
              bezier
            />
          )}
          <View className="h-1 bg-gray-700 w-full" />
          <View className="flex-col gap-y-3 bg-gray px-4 py-5">
            <Text className="text-xl font-bold">Características:</Text>
            <View className="h-0.5 bg-gray-700 w-full" />
            <View className="flex-row justify-between">
              <View className="flex-col gap-y-1 items-start flex-1">
                {details?.symbol ? (
                  <Text className="text-sm font-bold">
                    Símbolo: {""}
                    <Text className="text-md font-normal">
                      {details.symbol}
                    </Text>
                  </Text>
                ) : null}
                {details?.regularMarketPreviousClose ? (
                  <Text className="text-sm font-bold">
                    Venda anterior: {""}
                    <Text className="text-md font-normal">
                      {details.regularMarketPreviousClose.toLocaleString()}
                    </Text>
                  </Text>
                ) : null}
                {details?.regularMarketChange ? (
                  <Text className="text-sm font-bold">
                    Variação: {""}
                    <Text className="text-md font-normal">
                      {details.regularMarketChange.toLocaleString()}
                    </Text>
                  </Text>
                ) : null}
              </View>
              <View className="flex-col gap-y-1 justify-start items-start flex-1">
                {details?.regularMarketVolume ? (
                  <Text className="text-sm font-bold">
                    Volume de mercado: {""}
                    <Text className="text-md font-normal">
                      {details.regularMarketVolume.toLocaleString()}
                    </Text>
                  </Text>
                ) : null}
                {details?.regularMarketDayLow ? (
                  <Text className="text-sm font-bold">
                    Menor do dia: {""}
                    <Text className="text-md font-normal">
                      {details.regularMarketDayLow.toLocaleString()}
                    </Text>
                  </Text>
                ) : null}
                {details?.regularMarketDayHigh ? (
                  <Text className="text-sm font-bold">
                    Maior do dia: {""}
                    <Text className="text-md font-normal">
                      {details.regularMarketDayHigh.toLocaleString()}
                    </Text>
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
          <Button
            label="Adicionar aos meus ativos"
            variant="default"
            size="lg"
          />
        </View>
      </View>
    </View>
  );
}
