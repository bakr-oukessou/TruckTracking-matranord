import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable, Image, Animated, ImageBackground, Platform, TouchableOpacity, LogBox } from 'react-native';
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
import SignUp from './screens/auth/signUp';
import SignIn from './screens/auth/signIn';
import Driver from './screens/Driver';
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo"
import { ActivityIndicator, Icon, TouchableRipple } from 'react-native-paper';
import DriverDetails from './screens/DriverDetails';
import TaskScreen from './screens/TaskScreen';
import TaskDetails from './screens/TaskDetails';
import AssignTaskScreen from './screens/AssignTaskScreen';
import { ErrorBoundary, ErrorFallback } from './components/ErrorBoundary';
import MainScreen from './screens/MainScreen';
import Welcome from './screens/auth/Welcome';

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

// const [fontsLoaded] = useFonts({
//   'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
//   'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
// });

// const onLayoutRootView = useCallback(async () => {
//   if (fontsLoaded) {
//     await SplashScreen.hideAsync();
//   }
// }, [fontsLoaded]);



// const WelcomeWrapper: React.FC = () => {
//   const navigation = useNavigation<MainScreenNavigationProp>();
//   const route = useRoute<MainScreenRouteProp>();

//   return <MainScreen navigation={navigation} route={route} />;
// };




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

  // const {isSignedIn} = useAuth();

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); // Hide the splash screen after fonts load (optional)
    }
  }, [fontsLoaded]);

  // If the fonts are not loaded yet, show a loading spinner
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#AA304E" />
      </View>
    );
  }
  LogBox.ignoreAllLogs();


  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{
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
        }}
        // redirect={!isSignedIn}
        >
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Tracking" component={TrackingWrapper} options={{ title: 'Trucks' }}/>
          <Stack.Screen name="CMR" component={CMR} />  
          <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }}/>  
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
             <Stack.Screen name="AssignTask" component={AssignTaskScreen}options={{ title: 'Available Tasks', 
              // headerRight:(props)=>()
              headerStyle:{
                backgroundColor: '#AA304E',
                borderBottomEndRadius:20,
                borderBottomStartRadius:20,
              }
            }} /> 
          <Stack.Screen name="MapScreen" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </View>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <React.Suspense fallback={<Text>Loading...</Text>}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </React.Suspense>
  );
};


export default AppWrapper;