import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { WebView } from "react-native-webview";
import OverlayLoader from "./components/OverlayLoader";
import { Ionicons } from "@expo/vector-icons";
import { parse } from "himalaya";
import styled from "styled-components/native";
import CustomMenu from "./components/CustomMenu";

const HOME_PAGE = "http://f3d0bf071707.ngrok.io/";
export default function App() {
  const [uri, setCurrentUri] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const webView = useRef<WebView | null>(null);
  const [menu, setMenu] = useState(null);
  const [open, setOpen] = useState(true);
  const INJECTED_JAVASCRIPT = `(function() {
    document.querySelector('.et-l').style.display = 'none';
    setTimeout(function(){
      window.ReactNativeWebView.postMessage(document.querySelector('.et_mobile_menu').innerHTML);
   }, 2000);

  })();`;

  const showMenu = () => {
    setOpen(true);
  };

  const onMessage = (event: any) => {
    console.log("MSG", event.nativeEvent.data);
    const menu = parse(event.nativeEvent.data);
    setMenu(menu);
  };

  const onGoBack = () => {
    console.log("PRESS");
    if (!webView?.current) {
      console.log("NO");
      return;
    }
    console.log("should");
    webView!.current!.goBack();
    webView!.current!;
  };

  return (
    <>
      <View style={styles.container}>
        {open && <CustomMenu setOpen={setOpen} menu={menu} />}
        <View style={styles.headerBar}>
          <TouchableOpacity style={{ paddingTop: 20 }} onPress={showMenu}>
            <Ionicons name="md-menu" size={30} color="white" />
          </TouchableOpacity>
          <Image
            style={{
              width: 100,
              resizeMode: "contain",
              marginLeft: 25,
              marginTop: 10,
            }}
            source={require("./assets/tiendar_logo.png")}
          />
          {uri != HOME_PAGE && (
            <TouchableOpacity
              onPress={onGoBack}
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "red",
              }}
            >
              <Text>Go Back</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.webViewContainer}>
          <WebView
            ref={webView}
            onLoad={() => console.log("Loading..")}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onNavigationStateChange={(ev) => setCurrentUri(ev.url)}
            source={{ uri: HOME_PAGE }}
            onMessage={onMessage}
            injectedJavaScript={INJECTED_JAVASCRIPT}
          />
        </View>
        {loading && <OverlayLoader />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: "#0577BD",
    justifyContent: "flex-start",
    alignContent: "center",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  webViewContainer: {
    flex: 1,
  },
});
