import React from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const height = Dimensions.get("window").height;
const Overlay = styled.TouchableOpacity`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const MenuWrapper = styled(LinearGradient)`
  position: absolute;
  padding-left: 20px;
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
    <Overlay onPress={() => props.setOpen(false)}>
      <MenuWrapper colors={["#109CFC", "#2475AD"]}>
        <Logo source={require("../assets/tiendar_logo.png")} />
        <View style={{ height: height * 0.08 }}></View>
        <MenuItem selected={true}>
          <Entypo
            style={{ marginRight: 10 }}
            name="home"
            size={24}
            color="white"
          />
          <StyledText>Home</StyledText>
        </MenuItem>
        <View style={{ height: height * 0.04 }}></View>
        <MenuItem>
          <Entypo
            style={{ marginRight: 10 }}
            name="shop"
            size={24}
            color="white"
          />
          <StyledText>Shop</StyledText>
        </MenuItem>
        <View style={{ height: height * 0.04 }}></View>
        <MenuItem>
          <FontAwesome5
            style={{ marginRight: 10 }}
            name="coins"
            size={24}
            color="white"
          />
          <StyledText>Venditori</StyledText>
        </MenuItem>
        <View style={{ height: height * 0.04 }}></View>
        <MenuItem>
          <AntDesign
            style={{ marginRight: 10 }}
            name="user"
            size={24}
            color="white"
          />
          <StyledText>Profilo</StyledText>
        </MenuItem>
      </MenuWrapper>
    </Overlay>
  );
};

export default Menu;
