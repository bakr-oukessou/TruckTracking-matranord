import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable, Image, Animated, ImageBackground } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Tracking from './components/Tracking';
import CMR from './components/CMR';
import PLOMOS from './components/Plomos';
import { css } from '@emotion/native';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font'; 
import { MaterialIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
// import LinearGradient from 'react-native-linear-gradient';

import TruckDetails from './components/TruckDetails';
import { RootStackParamList } from './types/types';
import MapScreen from './components/Location';
import Mainscreen from './components/auth/main';


const Stack = createStackNavigator<RootStackParamList>();


SplashScreen.preventAutoHideAsync();

const fetchFonts = () => {
  return Font.loadAsync({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  });
};


type MainScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;
type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

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
      <ImageBackground source={require('./assets/pngwing.com.png')}/>
      {/* <Text style={textStyle}>Matran<MaterialIcons name="public" size={35} color="black" />
      rd</Text> */}
      <Image source={require('./assets/Logo-png-1.png')} style={imagestyles.image}/>
      <Pressable onPress={() => navigation.navigate('Tracking')} android_ripple={{color: 'gray',radius:175}} style={({pressed}) => [
        {
          backgroundColor: pressed ? '#EAD196' : 'white',
        }, 
        buttonStyles,
      ]}>
        <MaterialIcons name="local-shipping" size={30} color="#AA3A3A" />
        <Text style={textStyle2}>TRACKING</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('MainScreen')} android_ripple={{color: 'gray',radius:175}} style={({pressed}) => [
          {
            backgroundColor: pressed ? '#EAD196' : 'white',
          },
          buttonStyles,
        ]}>
        <MaterialIcons name="description" size={30} color="#365E32" />
        <Text style={textStyle2}>CMR</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('PLOMOS')} android_ripple={{color: 'gray',radius:175}} style={({pressed}) => [
          {
            backgroundColor: pressed ? '#EAD196' : 'white',
          },
          buttonStyles,
        ]}>
        <MaterialIcons name="attach-file" size={30} color="black" />
        <Text style={textStyle2}>PLOMOS</Text>
      </Pressable>
    </View>
  );
};

const MainScreenWrapper: React.FC = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const route = useRoute<MainScreenRouteProp>();

  return <MainScreen navigation={navigation} route={route} />;
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
})
const textStyle = css`
  font-size: 50px;  
  font-family:'Poppins-Bold';
  text-align: center;
  color:#BF3131;
  top:0;
  padding:20px;
`;
const textStyle2 = css`
  font-size: 20px;
  padding-top:5px;  
  font-family:'Poppins-Regular';
  text-align: center;
  width:auto;
  top:0;
`;
const TrackingWrapper: React.FC<StackScreenProps<RootStackParamList, 'Tracking'>> = ({ navigation, route }) => (
  <Tracking
    navigation={navigation}
    route={route}
    animatedValue={new Animated.Value(0)}
    visible={true}
    extended={true}
    label="Label"
    animateFrom="right"
    iconMode="static"
  />
);
const App: React.FC = () => { 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainScreenWrapper}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Tracking" component={TrackingWrapper} options={{ title: 'Trucks' }}/>
        <Stack.Screen name="MainScreen" component={Mainscreen} />  
        <Stack.Screen name="PLOMOS" component={PLOMOS} />
        <Stack.Screen name="TruckDetails" component={TruckDetails} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;