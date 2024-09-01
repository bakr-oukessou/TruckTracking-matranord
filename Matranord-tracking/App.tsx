import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable, Image, Animated, ImageBackground, Platform, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Tracking from './screens/Tracking';
import CMR from './screens/CMR';
import PLOMOS from './screens/Plomos';
import { css } from '@emotion/native';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
// import LinearGradient from 'react-native-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import TruckDetails from './screens/TruckDetails';
import { RootStackParamList } from './types/types';
import MapScreen from './components/Location';
import Mainscreen from './screens/auth/main';
import SignUp from './screens/auth/signUp';
import SignIn from './screens/auth/signIn';
import Driver from './screens/Driver';
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo"
import { Icon, TouchableRipple } from 'react-native-paper';
import DriverDetails from './screens/DriverDetails';
import TaskScreen from './screens/TaskScreen';
import TaskDetails from './screens/TaskDetails';
import AssignTaskScreen from './screens/AssignTaskScreen';

//***********token**************/
const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
//*****************************/

const Stack = createStackNavigator<RootStackParamList>();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey) {
  throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
}


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
        <Text style={textStyle2}>MainScreen</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Driver')} android_ripple={{color: 'gray',radius:175}} style={({pressed}) => [
          {
            backgroundColor: pressed ? '#EAD196' : 'white',
          },
          buttonStyles,
        ]}>
        <MaterialIcons name="attach-file" size={30} color="black" />
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
  // width:auto;
  top:0;
`;
const ButtonStyle = css`
  padding: 10px;
  margin-right:10px;
`
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
const DriverWrapper: React.FC<StackScreenProps<RootStackParamList, 'Driver'>> = ({ navigation, route }) => (
  <Driver
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
const TasksWrapper: React.FC<StackScreenProps<RootStackParamList, 'TaskScreen'>> = ({ navigation, route }) => (
  <TaskScreen
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
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main" screenOptions={{
          headerStyle: {
            backgroundColor: '#AA304E',
            // borderBottomEndRadius:20,
            // borderBottomStartRadius:20,
            // height:150
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Poppins-Bold',
          },
        }}>
          <Stack.Screen
            name="Main"
            component={MainScreenWrapper}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Tracking" component={TrackingWrapper} options={{ title: 'Trucks' }}/>
          <Stack.Screen name="CMR" component={CMR} />  
          <Stack.Screen name="MainScreen" component={Mainscreen} options={{ headerShown: false }}/>  
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>  
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>  
          <Stack.Screen name="PLOMOS" component={PLOMOS} />
          <Stack.Screen name="TaskScreen" component={TasksWrapper} 
            options={{ title: 'Tasks', 
              // headerRight:(props)=>()
              headerStyle:{
                backgroundColor: '#AA304E',
                borderBottomEndRadius:20,
                borderBottomStartRadius:20,
              }
            }}/>
          <Stack.Screen name="Driver" component={DriverWrapper} 
            options={{ title: 'Drivers', 
              // headerRight:(props)=>()
              headerStyle:{
                backgroundColor: '#AA304E',
                borderBottomEndRadius:20,
                borderBottomStartRadius:20,
              }
            }}/>
          <Stack.Screen name="TruckDetails" component={TruckDetails}
            options={{
              headerRight: () =>(
                <View >
                  <TouchableOpacity style={ButtonStyle}>
                  <MaterialIcons name="delete" size={30} color="lightgrey" />
                  </TouchableOpacity>
                </View>
              ),
              headerStyle: {
                backgroundColor: '#AA304E',
                borderBottomEndRadius:20,
                borderBottomStartRadius:20,
                // height:150
              }
            }}
           />
           <Stack.Screen name="DriverDetails" component={DriverDetails}
            options={{
              headerRight: () =>(
                <View >
                  <TouchableOpacity style={ButtonStyle}>
                  <MaterialIcons name="delete" size={30} color="lightgrey" />
                  </TouchableOpacity>
                </View>
              ),
              headerStyle: {
                backgroundColor: '#AA304E',
                borderBottomEndRadius:20,
                borderBottomStartRadius:20,
                // height:150
              }
            }}
           />
           <Stack.Screen name="TaskDetails" component={TaskDetails}
            options={{
              headerRight: () =>(
                <View >
                  <TouchableOpacity style={ButtonStyle}>
                  <MaterialIcons name="delete" size={30} color="lightgrey" />
                  </TouchableOpacity>
                </View>
              ),
              headerStyle: {
                backgroundColor: '#AA304E',
                borderBottomEndRadius:20,
                borderBottomStartRadius:20,
                // height:150
              }
            }}
           />
             <Stack.Screen name="AssignTask" component={AssignTaskScreen} /> 
          <Stack.Screen name="MapScreen" component={MapScreen} 
            options={{ title: 'Available Tasks', 
              // headerRight:(props)=>()
              headerStyle:{
                backgroundColor: '#AA304E',
                borderBottomEndRadius:20,
                borderBottomStartRadius:20,
              }
            }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default App;