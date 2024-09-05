import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable, Image, Animated, ImageBackground, Platform, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { css } from '@emotion/native';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
import { RootStackParamList } from '../types/types';
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo"
import { Icon, TouchableRipple } from 'react-native-paper';
import { ErrorBoundary, ErrorFallback } from '../components/ErrorBoundary';

const fetchFonts = () => {
    return Font.loadAsync({
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
      'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    });
  };
  
SplashScreen.preventAutoHideAsync();

  type MainScreenRouteProp = RouteProp<RootStackParamList, 'MainScreen'>;
  type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainScreen'>;
  
  type MainScreenProps = {
    navigation: MainScreenNavigationProp;
    route: MainScreenRouteProp;
  };
  
  const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
    
      const [fontsLoaded, setFontsLoaded] = useState(false);
  
      useEffect(() => {
        const loadFonts = async () => {
          try {
            await fetchFonts();
            setFontsLoaded(true);
            await SplashScreen.hideAsync();
          } catch (err) {
            console.log(err);
          }
        };
    
        loadFonts();
      }, []);
    
    return (
      <View style={styles}>
        <ImageBackground source={require('../assets/pngwing.com.png')}/>
        {/* <Text style={textStyle}>Matran<MaterialIcons name="public" size={35} color="black" />
        rd</Text> */}
        <Image source={require('../assets/Logo-png-1.png')} style={imagestyles.image}/>
        <Pressable onPress={() => navigation.navigate('Tracking')} android_ripple={{color: 'gray',radius:175}} style={({pressed}) => [
          {
            backgroundColor: pressed ? '#EAD196' : 'white',
          }, 
          buttonStyles,
        ]}>
          <MaterialIcons name="local-shipping" size={30} color="#AA3A3A" />
          <Text style={textStyle2}>TRACKING</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Welcome')} android_ripple={{color: 'gray',radius:175}} style={({pressed}) => [
            {
              backgroundColor: pressed ? '#EAD196' : 'white',
            },
            buttonStyles,
          ]}>
          <MaterialIcons name="description" size={30} color="#365E32" />
          <Text style={textStyle2}>MainScreen</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Driver')} android_ripple={{color: 'gray',radius:175}} style={({pressed}) => [
            {
              backgroundColor: pressed ? '#EAD196' : 'white',
            },
            buttonStyles,
          ]}>
          <MaterialIcons name="person" size={30} color="black" />
          <Text style={textStyle2}>Drivers</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('TaskScreen')} android_ripple={{color: 'gray',radius:175}} style={({pressed}) => [
            {
              backgroundColor: pressed ? '#EAD196' : 'white',
            },
            buttonStyles,
          ]}>
          <MaterialIcons name="attach-file" size={30} color="black" />
          <Text style={textStyle2}>Tasks</Text>
        </Pressable>
      </View>
    );
  };
  const styles = css`
  display:flex;
  flex-direction:column;
  justify-content:center;
  // align-items:center;
  align-content:space-evenly;
  flex-grow:1;
  flex: 1;
  background-color: #FFF5E1;
  padding: 20px;
  & > * {
    color: black;
    font-size: 18px;
    font-family:'Poppins-Regular';
  }
  
`;
const buttonStyles = css`
    // padding:20px;
    margin:10px;
    align-items:center;
    justify-content:center;
    height:100px;
    border-radius:20px;
    border: 2px solid black;
    background-color: #F1C27B;
`;
const imagestyles = StyleSheet.create({
  image:{
    margin:30,
    alignSelf:'center',
    objectFit:'contain',
    height:110,
  }
});
const textStyle2 = css`
  font-size: 20px;
  padding-top:5px;  
  font-family:'Poppins-Regular';
  text-align: center;
  // width:auto;
  top:0;
`;
export default MainScreen;