import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import OverlayLoader from "./components/OverlayLoader";

const HOME_PAGE = "https://tiendar.it/";
export default function App() {
  const [url, setCurrentUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const webView = useRef<WebView | null>(null);
  const INJECTED_JAVASCRIPT = `(function() {
    document.querySelector('#main-header').style.display = 'none';
    document.querySelector("#page-container").setAttribute("style","padding-top: 0px !important");
  })();`;

  const onMessage = (msg: any) => {
    console.log("MSG", msg);
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
        <View style={styles.headerBar}>
          {url != HOME_PAGE && (
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
            onNavigationStateChange={(ev) => setCurrentUrl(ev.url)}
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
    backgroundColor: "#0577BD",
  },
  webViewContainer: {
    flex: 1,
  },
});
