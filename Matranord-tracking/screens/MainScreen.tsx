import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable, Image, Animated, ImageBackground, Platform, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { css } from '@emotion/native';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
import { RootStackParamList } from '../types/types';
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo"
import { Icon, TouchableRipple } from 'react-native-paper';
import { ErrorBoundary, ErrorFallback } from '../components/ErrorBoundary';
import AlertDialog from "../components/AlertDialog";

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
      const {signOut}=useAuth();
      const [isAlertVisible, setIsAlertVisible] = useState(false);
  
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

      const handleSignOut = async () => {
        setIsAlertVisible(true);
      };

      const SignOutConfirm = async () => {
        setIsAlertVisible(false);
            try {
              await signOut();                  
              navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
              });
            } catch (err) {
              console.error("Error signing out:", err);
              Alert.alert("Error", "Failed to sign out. Please try again.");
            }
        }


    return (
      <View style={styles}>
        <Pressable onPress={handleSignOut} style={styles2.signOutButton}>
          <Ionicons name="log-out" size={40} color={'#e74c3c'}/>
        </Pressable>
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
        <AlertDialog
          visible={isAlertVisible}
          title="Sign Out"
          message="Are you sure you want to sign Out?"
          onCancel={() => setIsAlertVisible(false)}
          onConfirm={SignOutConfirm}
          cancelText="Cancel"
          confirmText="signOut"
        />
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
const styles2 = StyleSheet.create({
  signOutButton: {
    // backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 50,
    top:20,
    right:0,
    position:'absolute',
    // marginTop: 20,
  },
})
const textStyle2 = css`
  font-size: 20px;
  padding-top:5px;  
  font-family:'Poppins-Regular';
  text-align: center;
  // width:auto;
  top:0;
`;
export default MainScreen;