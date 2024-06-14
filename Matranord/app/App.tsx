import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Tracking from './(tabs)/Tracking';
import CMR from './(tabs)/CMR';
import PLOMOS from './(tabs)/Plomos';

const Stack = createStackNavigator();

type RootStackParamList = {
  Main: undefined;
  Tracking: undefined;
  CMR: undefined;
  PLOMOS: undefined;
};

type MainScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;
type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type MainScreenProps = {
  navigation: MainScreenNavigationProp;
  route: MainScreenRouteProp;
};

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Main Page</Text>
      <Button title="Tracking" onPress={() => navigation.navigate('Tracking')} />
      <Button title="CMR" onPress={() => navigation.navigate('CMR')} />
      <Button title="PLOMOS" onPress={() => navigation.navigate('PLOMOS')} />
    </View>
  );
};

const MainScreenWrapper: React.FC = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const route = useRoute<MainScreenRouteProp>();

  return <MainScreen navigation={navigation} route={route} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainScreenWrapper}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Tracking" component={Tracking} />
        <Stack.Screen name="CMR" component={CMR} />
        <Stack.Screen name="PLOMOS" component={PLOMOS} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;