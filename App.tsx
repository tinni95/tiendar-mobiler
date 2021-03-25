import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from "react-native";
import { WebView } from "react-native-webview";
import OverlayLoader from "./components/OverlayLoader";
import { Ionicons } from "@expo/vector-icons";
import { parse } from "himalaya";
import styled from "styled-components/native";
import CustomMenu from "./components/CustomMenu";
import {
  BASE_URL,
  HOME_PAGE,
  PROFILE_PAGE,
  SHOP_PAGE,
  VENDITORI_PAGE,
} from "./constants/Urls";

export default function App() {
  const [url, setUrl] = useState<string>(BASE_URL);
  const [loading, setLoading] = useState<boolean>(false);
  const webView = useRef<WebView | null>(null);
  const [menu, setMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const INJECTED_JAVASCRIPT = `(function() {
    document.querySelector('.et_pb_section_0_tb_footer').style.display = 'none';
    document.querySelector('.et-l').style.display = 'none';
    document.querySelector('.et_pb_section_2').style.setProperty("padding","0px","important");
    document.querySelector('.et_pb_row_2').style.setProperty("margin","0px","important");
    document.querySelector('.et_pb_row_2').style.setProperty("width","100%");
    document.querySelector('.et_pb_row_2').style.setProperty("padding","20px","important");
    document.querySelector('.et_pb_module_header').style.setProperty("font-size","25px","important");

    setTimeout(function(){
      window.ReactNativeWebView.postMessage(document.querySelector('.et_mobile_menu').innerHTML);
   }, 2000);

  })();`;

  const showMenu = () => {
    slideIn();
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

  const left = useRef(new Animated.Value(-400)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const slideIn = () => {
    Animated.parallel([
      Animated.timing(left, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setOpen(true));
  };

  const slideOut = () => {
    Animated.parallel([
      Animated.timing(left, {
        toValue: -400,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setOpen(false));
  };

  const canGoBack =
    url != BASE_URL &&
    url != SHOP_PAGE &&
    url != HOME_PAGE &&
    url != PROFILE_PAGE &&
    url != VENDITORI_PAGE;
  return (
    <>
      <View style={styles.container}>
        <CustomMenu
          left={left}
          setUrl={setUrl}
          menu={menu}
          open={open}
          url={url}
          opacity={opacity}
          slideOut={slideOut}
        />
        <View style={styles.headerBar}>
          <View style={{ flexDirection: "row" }}>
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
          </View>
        </View>
        {canGoBack && (
          <TouchableOpacity
            onPress={onGoBack}
            style={{
              backgroundColor: "#0769AD",
              padding: 5,
            }}
          >
            <Ionicons name="ios-arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}
        <View style={styles.webViewContainer}>
          <WebView
            ref={webView}
            onLoad={() => console.log("Loading..")}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onNavigationStateChange={(ev) => setUrl(ev.url)}
            source={{ uri: url }}
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
    flexDirection: "column",
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
