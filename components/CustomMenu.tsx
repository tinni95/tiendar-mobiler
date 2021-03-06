import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import {
  Animated,
  Dimensions,
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  HOME_PAGE,
  SHOP_PAGE,
  VENDITORI_PAGE,
  PROFILE_PAGE,
} from "../constants/Urls";

const MenuWrapperAnimated = Animated.createAnimatedComponent(View);
const Touchable = Animated.createAnimatedComponent(TouchableOpacity);
const height = Dimensions.get("window").height;

const MenuWrapper = styled(MenuWrapperAnimated)`
  position: absolute;
  padding-left: 20px;
  background-color: ${Colors.BLUE};
  padding-right: 20px;
  padding-top: 50px;
  width: 70%;
  min-width: 300px;
  height: 100%;
  z-index: 2;
`;

const MenuItem = styled.TouchableOpacity`
  display: flex;
  padding: 10px;
  flex-direction: row;
  background-color: ${({ selected }: { selected: boolean }) =>
    selected ? "rgba(14,53,80,0.29)" : "transparent"};
  border-radius: 10px;
`;

const StyledText = styled.Text`
  color: white;
  font-size: 20px;
`;

const Logo = styled.Image``;

const Menu = (props: any) => {
  console.log(props.menu);

  return (
    <>
      {props.open && (
        <Touchable
          activeOpacity={1}
          style={[{ opacity: props.opacity }, styles.overlay]}
          onPress={() => {
            props.slideOut();
          }}
        ></Touchable>
      )}
      <MenuWrapper style={{ left: props.left }} colors={["#109CFC", "#2475AD"]}>
        <Logo source={require("../assets/tiendar_logo.png")} />
        <View style={{ height: height * 0.08 }}></View>
        <MenuItem
          selected={props.url == HOME_PAGE}
          onPress={() => {
            props.setUrl(HOME_PAGE);
            props.slideOut();
          }}
        >
          <Entypo
            style={{ marginRight: 10 }}
            name="home"
            size={24}
            color="white"
          />
          <StyledText>Home</StyledText>
        </MenuItem>
        <View style={{ height: height * 0.04 }}></View>
        <MenuItem
          selected={props.url == SHOP_PAGE}
          onPress={() => {
            props.setUrl(SHOP_PAGE);
            props.slideOut();
          }}
        >
          <Entypo
            style={{ marginRight: 10 }}
            name="shop"
            size={24}
            color="white"
          />
          <StyledText>Shop</StyledText>
        </MenuItem>
        <View style={{ height: height * 0.04 }}></View>
        <MenuItem
          selected={props.url == VENDITORI_PAGE}
          onPress={() => {
            props.setUrl(VENDITORI_PAGE);
            props.slideOut();
          }}
        >
          <FontAwesome5
            style={{ marginRight: 10 }}
            name="coins"
            size={24}
            color="white"
          />
          <StyledText>Venditori</StyledText>
        </MenuItem>
        <View style={{ height: height * 0.04 }}></View>
        <MenuItem
          selected={props.url == PROFILE_PAGE}
          onPress={() => {
            props.setUrl(PROFILE_PAGE);
            props.slideOut();
          }}
        >
          <AntDesign
            style={{ marginRight: 10 }}
            name="user"
            size={24}
            color="white"
          />
          <StyledText>Profilo</StyledText>
        </MenuItem>
      </MenuWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
});

export default Menu;
