import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Truck } from './types';
import { MaterialIcons } from '@expo/vector-icons';

type TruckDetailsRouteProp = RouteProp<RootStackParamList, 'TruckDetails'>;


const TruckDetails = ({ route }: { route: TruckDetailsRouteProp}) => {
  const { truck } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Truck Details</Text>
      <Text style={styles.detail}><Text style={styles.bold}>Date: </Text>{truck.date}</Text>
      <Text style={styles.detail}><Text style={styles.bold}>Matricule: </Text>{truck.matricule} </Text>
      <Text style={styles.detail}><Text style={styles.bold}>Numero de Dossier: </Text>{truck.numeroDeDossier}</Text>
      <Text style={styles.detail}><Text style={styles.bold}>Trajet: </Text> {truck.trajet}</Text>
      <Text style={styles.detail}><Text style={styles.bold}>Chargement: </Text>{truck.chargement}</Text>
      <Text style={styles.detail}><Text style={styles.bold}>Dechargement: </Text> {truck.dechargement}</Text>
      <Text style={styles.detail}><Text style={styles.bold}>Status: </Text> {truck.status}</Text>
    <View style={styles.buttons}>
        
      <Pressable style={styles.button}>
      <MaterialIcons name="location-on" size={30} color="black" />
        <Text>Positionnement</Text>
      </Pressable>
      
      <Pressable style={styles.button}>
      <MaterialIcons name="local-shipping" size={30} color="black" />
        <Text>Chargement</Text>
      </Pressable>
      
      <Pressable style={styles.button}>
      <MaterialIcons name="moving" size={30} color="black" />
        <Text>En Route</Text>
      </Pressable>
      
      <Pressable style={styles.button}>
      <View style={{flexDirection:'row'}}>
        <MaterialIcons name="east" size={25} color="black" />
        <MaterialIcons name="maps-home-work" size={30} color="black" />
      </View>
        <Text>Entree Douane</Text>
      </Pressable>
      
      <Pressable style={styles.button}>
      <View style={{flexDirection:'row'}}>
        <MaterialIcons name="maps-home-work" size={30} color="black" />
        <MaterialIcons name="east" size={25} color="black" />
      </View>
        <Text>Sortie Douane</Text>
      </Pressable>
      
      <Pressable style={styles.button}>
      <MaterialIcons name="how-to-reg" size={30} color="black" />
        <Text>Arriver Client</Text>
      </Pressable>
      
      <Pressable style={styles.button}>
      <MaterialIcons name="cancel" size={30} color="black" />
        <Text>Cloturer</Text>
      </Pressable>
      
      <Pressable style={styles.button}>
      <MaterialIcons name="report" size={30} color="black" />
        <Text>Rien a Charger</Text>
      </Pressable>

      <Pressable style={styles.button}>
        <Text>Valider</Text>
      </Pressable>

      <Pressable style={styles.button}>
        <Text>Supprimer</Text>
      </Pressable>
      
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5E1',
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
    alignContent:'space-evenly'
  },
  button: {
    padding: 10,
    marginHorizontal: 9,
    marginVertical:9,
    width: 177,
    height:70,
    backgroundColor: '#ADD8E6',
    borderRadius: 5,
    textAlign:'center',
    alignItems: 'center',
  },
  buttons:{
    // marginHorizontal: 5,
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    flex:1,
    flexGrow:1,
    // alignContent:'center',
    // alignItems:'center',
    // alignSelf:'center'
  },
  bold:{
    fontSize: 16,
    alignItems:'flex-end',
    fontFamily: 'Poppins-Bold',
  }
});

export default TruckDetails;
