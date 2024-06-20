import React from 'react';
import { View, Text, StatusBar, StyleSheet, Pressable } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { css } from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, Truck } from './types';
import { StackNavigationProp } from '@react-navigation/stack';
import { MasonryFlashList } from "@shopify/flash-list";

const DATA: Truck[] = [
  {
    date: "2024-06-14",
    matricule: "ABC123",
    numeroDeDossier: "001",
    trajet: "Route A to B",
    chargement: "Goods A",
    dechargement: "Goods B",
    status: "En route",
  },
  {
    date: "2024-06-15",
    matricule: "XYZ789",
    numeroDeDossier: "002",
    trajet: "Route C to D",
    chargement: "Goods C",
    dechargement: "Goods D",
    status: "Delivered",
  },
];

type TrackingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Tracking'>;
const Tracking = () => {
  const styles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-evenly;
    flex-grow: 1;
    flex: 1;
    background-color: #FFF5E1;
    padding: 20px;
    & > * {
      color: black;
      font-size: 18px;
      font-family: 'Poppins-Regular';
    }
  `;
  const navigation = useNavigation<TrackingScreenNavigationProp>();
  const renderItem = ({ item }: { item: Truck }) => (
    <View style={itemStyles.container}>
      <Pressable  onPress={() => navigation.navigate('TruckDetails', { truck: item })}android_ripple={{color: 'grey'}} style={({pressed}) => [
        {
          backgroundColor: pressed ? '#EAD196' : 'white',
        },
        itemStyles.item,
      ]}>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Date:</Text> {item.date}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Matricule:</Text> {item.matricule}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Numero de Dossier:</Text> {item.numeroDeDossier}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Trajet:</Text> {item.trajet}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Chargement:</Text> {item.chargement}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Dechargement:</Text> {item.dechargement}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Status:</Text> {item.status}</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles}>
      <Text style={itemStyles.title}>TRUCKS</Text>
      <MasonryFlashList
        data={DATA}
        numColumns={1}
        renderItem={renderItem}
        estimatedItemSize={100}
      />
    </View>
  );
};

const itemStyles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 3,
    marginVertical: 8,
    borderRadius: 13,
    marginHorizontal: 12,
  },
  text: {
    fontSize: 16,
    paddingLeft:5,  
    fontFamily: 'Poppins-Regular',
  },
  item: {
    padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
    backgroundColor: '#E9B384',
    borderRadius: 10,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 5, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    alignSelf:'center',
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  bold:{
    fontSize: 16,
    paddingLeft:5,  
    fontFamily: 'Poppins-Bold',
  }
});

export default Tracking;
