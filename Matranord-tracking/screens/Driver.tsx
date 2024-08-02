import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StatusBar, StyleSheet, Pressable, ImageBackground ,
  Animated,StyleProp,
  ViewStyle,
  Platform,
  ScrollView,
  SafeAreaView,
  I18nManager,
  NativeSyntheticEvent,
  NativeScrollEvent,
  RefreshControl, } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { css } from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { Driver, DriverProps, RootStackParamList, Truck } from '../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { MasonryFlashList } from "@shopify/flash-list";
import { createTruck, getAllDrivers } from '../components/Api/api';
import { ActivityIndicator, AnimatedFAB, Button, Modal, PaperProvider, Portal, Searchbar, Snackbar, TextInput } from 'react-native-paper';
import axios from 'axios';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';

type DriverScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Driver'> & DriverProps;

const DriverScreen: React.FC<DriverProps> = ({
  animatedValue,  
  visible,
  extended,
  label,
  animateFrom,
  style,
  iconMode,
}) => {

    //////////////////// API Call//////////////////
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    // useEffect(() => {
    //   filterDrivers();
    // }, [searchQuery, drivers]);
  
    useEffect(() => {
      fetchDrivers();
    }, []);
    
    useEffect(() => {
      console.log("Drivers state updated:", drivers);
    }, [drivers]);
    
    useEffect(() => {
      console.log("Filtered drivers state updated:", filteredDrivers);
    }, [filteredDrivers]);
  
    const fetchDrivers = async () => {
      try {
        setIsLoading(true); 
        const data = await getAllDrivers();
        console.log("Fetched trucks:", data);
        setDrivers(data);
        console.log("Drivers state:", drivers);
        setFilteredDrivers(data);
        console.log("Filtered drivers state:", filteredDrivers);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching drivers:", err);
        if (axios .isAxiosError(err)) {
          console.error("Response data:", err.response?.data);
          console.error("Response status:", err.response?.status);
          console.error("Response headers:", err.response?.headers);
        }
        setError('Failed to fetch drivers: ' + (err as Error).message);
        setIsLoading(false);
      }
    };

    const filterDrivers = () => {
      const filtered = drivers.filter(driver => 
        driver && (driver.CIN ? driver.CIN.toLowerCase().includes(searchQuery.toLowerCase()) : false)
      );
      setFilteredDrivers(filtered);
    };
    /////////////////////////////////////////

    /////////// Add FAB button ///////////////////////
  const [isExtended, setIsExtended] = React.useState(true);

  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle: StyleProp<ViewStyle> = { [animateFrom]: 16 };

  const [refreshing, setRefreshing] = useState(false);

  const [matricule, setMatricule] = useState('');
  const [date, setDate] = useState('');
  const [numeroDossier, setNumeroDossier] = useState('');
  const [trajet, setTrajet] = useState('');
  const [chargement, setChargement] = useState('');
  const [dechargement, setDechargement] = useState('');
  const [status, setStatus] = useState('');

  // const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    type: 'success', // or 'error'
  });


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDrivers().then(() => setRefreshing(false));
  }, []);

  const handleSubmit = async () => {
    try {
      const newDriver = {
        matricule,
        date,
        numeroDossier,
        trajet,
        chargement,
        dechargement,
        status,
      };
  
      const createdDriver = await createTruck(newDriver);
      console.log('Driver added successfully:', createdDriver);
    
      setMatricule('');
      setDate('');
      setNumeroDossier('');
      setTrajet('');
      setChargement('');
      setDechargement('');
      setStatus('');

      hideModal();

      
      setSnackbar({
        visible: true,
        message: 'Driver added successfully!',
        type: 'success',
      });
      // getAllTrucks();

    } catch (error) {
      console.error('Error adding driver:', error);
      setSnackbar({
        visible: true,
        message: 'Error adding driver. Please try again.',
        type: 'error',
      }); 
    }
  };
  /////////////////////////////////////////////////
 /////////// random background images//////////////////
 
const images = [
  require("../assets/background.jpg"),
  require("../assets/background2.jpg"),
  require("../assets/background3.jpg"),
  require("../assets/background4.avif"),
  require("../assets/background5.webp"),
  require("../assets/background6.jpg"),
  require("../assets/background7.jpg"),
  require("../assets/background8.jpg"),
  require("../assets/background9.jpg"),
  require("../assets/background10.jpg"),
  require("../assets/background11.jpg")
];

 const getRandomImage = () => {
  return images[Math.floor(Math.random() * images.length)];
};
/////////////////////////////////////////////////////

  const navigation = useNavigation<DriverScreenNavigationProp>();
  const renderItem = ({ item }: { item: Driver }) => (
    <View style={itemStyles.container}>
      <ImageBackground source={getRandomImage()} style={itemStyles.imageBackground}>
      <Pressable onPress={() => navigation.navigate('DriverDetails', { driver: item })}android_ripple={{color: 'grey'}} style={({pressed}) => [
        {
          backgroundColor: pressed ? '#EAD196' : 'white',
        },
        itemStyles.item,
      ]}> 
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>CIN:</Text> {item.CIN}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Nom chauffeur:</Text> {item.nom}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Matricule:</Text> {item.idvehicule}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Email:</Text> {item.email}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Telephone:</Text> {item.telephone}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Adresse:</Text> {item.adresse}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Experience:</Text> {item.experience}</Text>
        <Text style={[itemStyles.text, itemStyles.status]}><Text style={[itemStyles.bold, itemStyles.statusData]}>Validite:</Text> {item.validitePermit}</Text>
      </Pressable>
      </ImageBackground>

    </View>
  );

  const [Visible, setVisible] = React.useState(false);

  const [text, setText] = React.useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    setDate(formattedDate);
    hideDatePicker();
  };

  return (
    <PaperProvider>
      <ImageBackground source={require('../assets/stack.png')} style={itemStyles.bgimage}>
      <Searchbar
      placeholder="Search by CIN"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={itemStyles.searchBar}
      />
      </ImageBackground>
    <View style={styles}>
    {isLoading ? (
  <ActivityIndicator size="large" color="#0000ff" />
  ) : (
      <MasonryFlashList
        onScroll={onScroll}
        data={filteredDrivers}
        numColumns={1}
        renderItem={renderItem}
        estimatedItemSize={100}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />)}
      <AnimatedFAB
        icon={'plus'}
        label={'NEW'}
        extended={isExtended}
        onPress={showModal}
        visible={visible}
        animateFrom={animateFrom}
        // iconMode={iconMode}
        style={[itemStyles.fabStyle, style, fabStyle]}
      />
    </View>
    </PaperProvider>
  );
};



const itemStyles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 3,
    marginVertical: 8,
    borderRadius: 13,
    marginHorizontal: 12,
    position:'relative'

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
    backgroundColor: 'rgba(222, 143, 95, 0.6)',
    // backgroundColor: 'rgba(173, 216, 230, 0.7)',
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
  },
  imageBackground: {
    // marginHorizontal: 9,
    // marginVertical: 9,
    // width: 177,
    // height: 70,
    objectFit:'fill',
    borderRadius: 12,
    overflow: 'hidden', // Ensures the border radius is applied to the image background
  },
  status:{
    alignSelf:'flex-end',
    alignItems:'center',
    textAlign:'right',
    color:'#000',
    padding:4,
    borderRadius:8,
    fontWeight:'700',
    backgroundColor:'#ffebb096'
  },
  statusData:{
    color:'#ff080096',
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
  textinput:{
    // padding:10,
    height:45,
    margin:10,
    borderColor:'#AF8260',
    borderWidth:1,
  },
  searchBar:{
    flexDirection:'row',
    alignItems:'center',
    zIndex: 99,
    fontFamily:'Poppins-Regular',
    // backgroundColor:'#fff', 
  },
  bgimage:{
    objectFit:'cover',
    height:100,
    zIndex:-100,
    borderBottomEndRadius:40,
    borderBottomStartRadius:40,
    backgroundColor:'rgba(150, 10, 44, 0.8)',
    overflow: 'hidden',
    position: 'relative',
    top: 0,
    // left: 13,
    // zIndex: 99,
    // width:360,
    // marginLeft: 5,
    // marginBottom:20
},
});

const styles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-evenly;
    flex-grow: 1;
    flex: 1;
    background-color: #FFF5E1;
    // padding: 20px;
    // padding-top:13px;
    padding-left:20px;
    padding-right:20px;
    z-index:100;
    & > * {
      color: black;
      font-size: 18px;
      font-family: 'Poppins-Regular';
    }
  `;

export default DriverScreen;



