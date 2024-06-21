import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Animated, ImageBackground } from 'react-native';

import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Truck } from './types';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

type TruckDetailsRouteProp = RouteProp<RootStackParamList, 'TruckDetails'>;
type TruckDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TruckDetails'>;

const TruckDetails = ({ route }: { route: TruckDetailsRouteProp}) => {
  const { truck } = route.params;
  const navigation = useNavigation<TruckDetailsScreenNavigationProp>();
  return (
    <ImageBackground source={require('../assets/phoneBackground.jpg')} style={styles.image}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.details}>
        <Text style={styles.header}>Truck Details</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Date: </Text>{truck.date}</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Matricule: </Text>{truck.matricule} </Text>
        <Text style={styles.detail}><Text style={styles.bold}>Numero de Dossier: </Text>{truck.numeroDeDossier}</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Trajet: </Text> {truck.trajet}</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Chargement: </Text>{truck.chargement}</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Dechargement: </Text> {truck.dechargement}</Text>
        <Text style={styles.detail}><Text style={styles.bold}>Status: </Text> {truck.status}</Text>
      </View>

    <View style={styles.buttons}>
        
      <Pressable 
       style={styles.button}
       android_ripple={{color: 'grey'}}
       onPress={() => navigation.navigate('MapScreen', { truck })}>
      <MaterialIcons name="location-on" size={30} color="black" />
        <Text style={styles.detail}>Positionnement</Text>
      </Pressable>
      
      <Pressable style={styles.button} android_ripple={{color: 'grey'}}>
      <MaterialIcons name="local-shipping" size={30} color="black" />
        <Text style={styles.detail}>Chargement</Text>
      </Pressable>
      
      <Pressable style={styles.button} android_ripple={{color: 'grey'}}>
      <MaterialIcons name="moving" size={30} color="black" />
        <Text style={styles.detail}>En Route</Text>
      </Pressable>
      
      <Pressable style={styles.button} android_ripple={{color: 'grey'}}>
      <View style={{flexDirection:'row'}}>
        <MaterialIcons name="east" size={25} color="black" />
        <MaterialIcons name="maps-home-work" size={30} color="black" />
      </View>
        <Text style={styles.detail}>Entree Douane</Text>
      </Pressable>
      
      <Pressable style={styles.button} android_ripple={{color: 'grey'}}>
      <View style={{flexDirection:'row'}}>
        <MaterialIcons name="maps-home-work" size={30} color="black" />
        <MaterialIcons name="east" size={25} color="black" />
      </View>
        <Text style={styles.detail}>Sortie Douane</Text>
      </Pressable>
      
      <Pressable style={styles.button} android_ripple={{color: 'grey'}}>
      <MaterialIcons name="how-to-reg" size={30} color="black" />
        <Text style={styles.detail}>Arriver Client</Text>
      </Pressable>
      
      <Pressable style={styles.button} android_ripple={{color: 'grey'}}>
      <MaterialIcons name="cancel" size={30} color="black" />
        <Text style={styles.detail}>Cloturer</Text>
      </Pressable>
      
      <Pressable style={styles.button} android_ripple={{color: 'grey'}}>
      <MaterialIcons name="report" size={30} color="black" />
        <Text style={styles.detail}>Rien a Charger</Text>
      </Pressable>

      <Pressable style={styles.button2} android_ripple={{color: 'grey',radius:58}}>
      <MaterialIcons name="verified" size={30} color="green" />
        <Text style={styles.detail}>Valider</Text>
      </Pressable>

      <Pressable style={styles.button2} android_ripple={{color: 'grey',radius:58}}>
      <MaterialIcons name="delete" size={30} color="red" />
        <Text style={styles.detail}>Supprimer</Text>
      </Pressable>
      
    </View>
    
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 245, 225, 0.7)',
    fontFamily: 'Poppins-Regular',
    padding: 10,
  },
  header: {
    fontSize: 24,
    alignSelf:'center',
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
    lineHeight:20,
    textAlign:'justify',
    alignContent:'space-evenly'
  },
  button: {
    padding: 10,
    marginHorizontal: 9,
    marginVertical:9,
    borderColor:'black',
    borderWidth:1,
    width: 177,
    height:70,
    backgroundColor: '#ADD8E6',
    borderRadius: 5,
    textAlign:'center',
    fontFamily: 'Poppins-Regular',
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 5, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  button2:{
    padding: 10,
    paddingLeft:10,
    marginHorizontal: 37,
    marginVertical:9,
    width: 120,
    height:70,
    backgroundColor: '#ADD8',
    borderRadius: 45,
    textAlign:'justify',
    alignItems: 'center',
    alignContent:'space-evenly'
  },
  buttons:{
    // marginHorizontal: 5,
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    fontFamily: 'Poppins-Regular',
    flex:1,
    flexGrow:1,
  },
  bold:{
    fontSize: 16,
    // alignItems:'flex-end',
    fontFamily: 'Poppins-Bold',
    textAlign:'right',
    marginLeft:10
  },
  details:{
      flex:1,
  },
  image:{
    objectFit:'fill',
    // borderRadius: 12,
    overflow: 'hidden',
    
  }
});

export default TruckDetails;
