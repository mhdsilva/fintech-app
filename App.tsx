import { StatusBar } from "expo-status-bar";
import "./src/styles/global.css";
import Home from "./src/app/Home";

export default function App() {
  return (
    <>
      <Home />
      <StatusBar style="auto" />
    </>
  );
}
