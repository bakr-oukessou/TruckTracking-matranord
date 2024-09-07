import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Animated, ImageBackground, Alert } from 'react-native';

import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, SafeAreaView,TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Truck } from '../types/types';
import { DeleteTruck, DeleteTruckByMatricule } from '../components/Api/api';
import { Snackbar } from 'react-native-paper';

type TruckDetailsRouteProp = RouteProp<RootStackParamList, 'TruckDetails'>;
type TruckDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TruckDetails'>;

const TruckDetails = ({ route }: { route: TruckDetailsRouteProp}) => {
  const { truck } = route.params;
  const navigation = useNavigation<TruckDetailsScreenNavigationProp>();
  
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    type: 'success | error', // or 'error'
  });

  const handleDelete = async () => {
    if (truck.matricule === undefined || truck.matricule === null) {
      Alert.alert("Error", "Invalid truck ID. Cannot delete this truck.");
      return;
    }
    Alert.alert(
      "Delete Truck",
      "Are you sure you want to delete this truck?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await DeleteTruckByMatricule(truck.matricule);
              setSnackbar({
                visible: true,
                message: 'Truck deleted successfully!',
                type: 'success',
              });
              navigation.goBack(); // Navigate back to the truck list
            } catch (error) {
              console.error("Error deleting truck:", error);
              setSnackbar({
                visible: true,
                message: 'Error deleting truck. Please try again.',
                type: 'error',
              });
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleDelete} style={{ marginRight: 15 }}>
          <MaterialIcons name="delete" size={30} color="lightgrey" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles2.container}>
    <ImageBackground source={require('../assets/phoneBackground.jpg')} style={styles.image}>
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles2.infoContainer}>
          {/* <Text style={styles2.truckName}>Truck Details</Text> */}
          <View style={styles2.tabContainer}>
            <TouchableOpacity style={[styles2.tab, styles2.activeTab]}>
              <Text style={styles2.activeTabText}>Truck Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles2.tab}>
              <Text style={styles2.tabText}>About Driver</Text>
            </TouchableOpacity>
          </View>
            <View style={styles2.detailsContainer}>
              <DetailItem title="Date" value={truck.date} />
              <DetailItem title="Matricule" value={truck.matricule} />
              <DetailItem title="Numero de Dossier" value={truck.numeroDossier} />
              <DetailItem title="Trajet" value={truck.trajet} />
              <DetailItem title="Chargement" value={truck.chargement} />
              <DetailItem title="Dechargement" value={truck.dechargement} />
              <DetailItem title="Status" value={truck.status} />
            </View>
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

      {/* <Pressable style={styles.button2} android_ripple={{color: 'grey',radius:58}}>
      <MaterialIcons name="verified" size={30} color="green" />
        <Text style={styles.detail}>Valider</Text>
      </Pressable>

      <Pressable style={styles.button2} android_ripple={{color: 'grey',radius:58}}>
      <MaterialIcons name="delete" size={30} color="red" />
        <Text style={styles.detail}>Supprimer</Text>
      </Pressable> */}
      <TouchableOpacity style={styles2.updateButton}>
        <Text style={styles2.updateButtonText}>Update Truck Info</Text>
      </TouchableOpacity>
    </View>
        <Snackbar
          visible={snackbar.visible}
          onDismiss={() => setSnackbar(prev => ({ ...prev, visible: false }))}
          action={{
            label: 'Close',
            onPress: () => setSnackbar(prev => ({ ...prev, visible: false })),
          }}
          duration={3000}
          style={{ backgroundColor: snackbar.type === 'success' ? '#4CAF50' : '#F44336' }}>
          {snackbar.message}
        </Snackbar>
    
    </ScrollView>
    </ImageBackground>
    </SafeAreaView>
  );
};

const DetailItem: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <View style={styles2.detailItem}>
    <Text style={styles2.detailTitle}>{title}:</Text>
    <Text style={styles2.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 245, 225, 0.7)',
    fontFamily: 'Poppins-Regular',
    padding: 5,
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
    width: 167,
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
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    fontFamily: 'Poppins-Regular',
    flex:1,
    flexGrow:1,
    justifyContent:'center',
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


const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5114D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    color: 'white',
    fontSize: 24,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  truckImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoContainer: {
    paddingLeft: 16,
    paddingBottom: 16,
    paddingRight: 16,
    width:'100%'
  },
  truckName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignSelf:'center'
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#E5114D',
  },
  tabText: {
    color: 'gray',
  },
  activeTabText: {
    color: '#E5114D',
    fontWeight: 'bold',
  },
  detailsContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailTitle: {
    color: 'gray',
  },
  detailValue: {
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: '#AA304E',
    padding: 16,
    alignItems: 'center',
    width:'100%'
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TruckDetails;