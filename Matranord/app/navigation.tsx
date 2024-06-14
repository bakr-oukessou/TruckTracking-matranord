import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';
import Tracking from './(tabs)/Tracking';
import CMR from './(tabs)/CMR';
import PLOMOS from './(tabs)/Plomos';


const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="App" component={App} />
      <Stack.Screen name="Tracking" component={Tracking} />
      <Stack.Screen name="CMR" component={CMR} />
      <Stack.Screen name="PLOMOS" component={PLOMOS} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;