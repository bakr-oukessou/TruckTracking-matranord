import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Truck } from './types';

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
        <Text>Positionnement</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text>Chargement</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text>En Route</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text>Entree Douane</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text>Sortie Douane</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text>Arriver Client</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text>Cloturer</Text>
      </Pressable>
      <Pressable style={styles.button}>
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
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5E1',
    padding: 20,
  },
  header: {
    fontSize: 24,
    alignSelf:'center',
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    marginHorizontal: 9,
    marginVertical:9,
    width: '40%',
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
