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
  RefreshControl,
  Image, } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { css } from '@emotion/native';
import { useNavigation } from '@react-navigation/native';
import { Driver, DriverProps, RootStackParamList, Truck } from '../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { MasonryFlashList } from "@shopify/flash-list";
import { createDriver, createTruck, getAllDrivers } from '../components/Api/api';
import { ActivityIndicator, AnimatedFAB, Button, Modal, PaperProvider, Portal, Searchbar, Snackbar, TextInput } from 'react-native-paper';
import axios from 'axios';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import AddDriverModal from '../components/AddDriverModal';

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
    const [modalVisible, setModalVisible] = useState(false);
  
    useEffect(() => {
      filterDrivers();
    }, [searchQuery, drivers]);
  
    useEffect(() => {
      fetchDrivers();
    }, []);
    
    useEffect(() => {
      // console.log("Drivers state updated:", drivers);
    }, [drivers]);
    
    useEffect(() => {
      // console.log("Filtered drivers state updated:", filteredDrivers);
    }, [filteredDrivers]);
  
    const fetchDrivers = async () => {
      try {
        setIsLoading(true); 
        const data = await getAllDrivers();
        // console.log("Fetched trucks:", data);
        setDrivers(data);
        // console.log("Drivers state:", drivers);
        setFilteredDrivers(data);
        // console.log("Filtered drivers state:", filteredDrivers);
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
        driver && (driver.cin ? driver.cin.toLowerCase().includes(searchQuery.toLowerCase()) : false)
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

  const handleSubmit = async (newDriver: Driver) => {
    try {
      const createdDriver = await createDriver(newDriver);
      console.log('Driver added successfully:', createdDriver);
      
      setSnackbar({
        visible: true,
        message: 'Driver added successfully!',
        type: 'success',
      });
      
      fetchDrivers(); // Refresh the driver list
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
        <View style={itemStyles.info2}>
          <View style={itemStyles.img2}>
            <Image
              style={itemStyles.img}
              source={{uri: `data:image/jpeg;base64,${item.profilePicture}`}}
            />
          </View>
          <View style={itemStyles.info}>
            <Text style={itemStyles.text}><Text style={itemStyles.bold}>CIN:</Text> {item.cin}</Text>
            <Text style={itemStyles.text}><Text style={itemStyles.bold}>{item.nom}</Text> </Text>
            <Text style={itemStyles.text}><Text style={itemStyles.bold}>IdVehicule:</Text> {item.idVehicule}</Text>
            {/* <Text style={itemStyles.text}><Text style={itemStyles.bold}>{item.email}</Text> </Text> */}
            <Text style={itemStyles.text}><Text style={itemStyles.bold}>(+212){item.mobileNumber}</Text> </Text>
            {/* <Text style={itemStyles.text}><Text style={itemStyles.bold}>Adresse:</Text> {item.adresse}</Text> */}
            <Text style={itemStyles.text}><Text style={itemStyles.bold}>Experience:</Text> {item.experience} Years</Text>
            <Text style={[itemStyles.text, itemStyles.status]}><Text style={[itemStyles.bold, itemStyles.statusData]}>Validite:</Text> {item.validitePermit}</Text>
          </View>
        </View>
      </Pressable>
      </ImageBackground>
    </View>
  );

  


  return (
    <PaperProvider>
      {/* <ImageBackground source={require('../assets/stack.png')} style={itemStyles.bgimage}> */}
      <Searchbar
      placeholder="Search by CIN"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={itemStyles.searchBar}
      />
      {/* </ImageBackground> */}
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
        onPress={() => setModalVisible(true)} visible={visible}
        animateFrom={animateFrom}
        // iconMode={iconMode}
        style={[itemStyles.fabStyle, style, fabStyle]}
      />
      <Portal>
      <AddDriverModal
        visible={modalVisible}
        hideModal={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
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
    </Portal>
    </View>
    </PaperProvider>
  );
};



const itemStyles = StyleSheet.create({
  container: {
    // backgroundColor: '#000',
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
    // position:'absolute',
    color:'#000',
    // right:0,
    padding:4,
    // height:40,
    // top:130,
    // marginTop:20,
    // bottom:-10,
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
    width:350,
    height:60,
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'center',
    marginTop:6,
    zIndex: 99,
    fontFamily:'Poppins-Regular',
    backgroundColor:'rgba(208, 58, 95,0.4)', 
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
  img:{
    width: 70,
    height: 70,
    objectFit:'cover',
    // alignSelf:'baseline',
    borderRadius:20,
    // position:'absolute',
    // margin:20
  },
  info:{
    display:'flex',
    flexDirection:'column',
    justifyContent: 'flex-end',
    // marginLeft:10,
    right:0,
    // left:20,
    // top:20,
    alignSelf:'flex-end',
    // alignItems:'center',
    textAlign:'right',
  },
  info2:{
    display:'flex',
    flexDirection:'row',
    
  },
  img2:{
    alignItems:'flex-end',
    // justifyContent:'center',
    position:'absolute',
    // backgroundColor:'red',
    width:'100%',
  }

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

  const containerStyle = StyleSheet.create({
    containerStyle: {
    backgroundColor: '#FFF5E1',
    padding: 40,
    bottom:10,
    width:350,
    alignSelf:'center',
    justifyContent:'center',
    // flexWrap:'nowrap'
    }
  });

export default DriverScreen;



