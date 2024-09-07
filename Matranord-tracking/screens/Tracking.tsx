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
import { RootStackParamList, TrackingProps, Truck } from '../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { MasonryFlashList } from "@shopify/flash-list";
import { createTruck, getAllTrucks } from '../components/Api/api';
import { AnimatedFAB, Button, Modal, PaperProvider, Portal, Searchbar, Snackbar, TextInput } from 'react-native-paper';
import axios from 'axios';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';

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

type TrackingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Tracking'> & TrackingProps;
const Tracking: React.FC<TrackingProps> = ({
  animatedValue,  
  visible,
  extended,
  label,
  animateFrom,
  style,
  iconMode,
}) => {
  

  //////////////////// API Call//////////////////
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [filteredTrucks, setFilteredTrucks] = useState<Truck[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    filterTrucks();
  }, [searchQuery, trucks]);

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    try {
      setIsLoading(true); 
      const data = await getAllTrucks();
      // console.log("Fetched trucks:", data);
      setTrucks(data);
      setFilteredTrucks(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching trucks:", err);
      if (axios .isAxiosError(err)) {
        console.error("Response data:", err.response?.data);
        console.error("Response status:", err.response?.status);
        console.error("Response headers:", err.response?.headers);
      }
      setError('Failed to fetch trucks: ' + (err as Error).message);
      setIsLoading(false);
    }
  };
  const filterTrucks = () => {
    const filtered = trucks.filter(truck => 
      truck.matricule.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTrucks(filtered);
  };
  /////////////////////////////////////////

 /////////// random background images//////////////////
  const getRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };
 /////////////////////////////////////////////////////



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
    fetchTrucks().then(() => setRefreshing(false));
  }, []);

  const handleSubmit = async () => {
    try {
      const newTruck = {
        matricule,
        date,
        numeroDossier,
        trajet,
        chargement,
        dechargement,
        status,
      };
  
      const createdTruck = await createTruck(newTruck);
      console.log('Truck added successfully:', createdTruck);
    
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
        message: 'Truck added successfully!',
        type: 'success',
      });
      // getAllTrucks();

    } catch (error) {
      console.error('Error adding truck:', error);
      setSnackbar({
        visible: true,
        message: 'Error adding truck. Please try again.',
        type: 'error',
      }); 
    }
  };
  /////////////////////////////////////////////////


  const navigation = useNavigation<TrackingScreenNavigationProp>();
  const renderItem = ({ item }: { item: Truck }) => (
    <View style={itemStyles.container}>
      
      <ImageBackground source={getRandomImage()} style={itemStyles.imageBackground}>
      <Pressable onPress={() => navigation.navigate('TruckDetails', { truck: item })}android_ripple={{color: 'grey'}} style={({pressed}) => [
        {
          backgroundColor: pressed ? '#EAD196' : 'white',
        },
        itemStyles.item,
      ]}> 
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Date:</Text> {item.date}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Matricule:</Text> {item.matricule}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Numero de Dossier:</Text> {item.numeroDossier}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Trajet:</Text> {item.trajet}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Chargement:</Text> {item.chargement}</Text>
        <Text style={itemStyles.text}><Text style={itemStyles.bold}>Dechargement:</Text> {item.dechargement}</Text>
        <Text style={[itemStyles.text, itemStyles.status]}><Text style={[itemStyles.bold, itemStyles.statusData]}>Status:</Text> {item.status}</Text>
      </Pressable>
      </ImageBackground>
    </View>
  );

  const [Visible, setVisible] = React.useState(false);


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
      placeholder="Search by matricule"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={itemStyles.searchBar}
      />
      </ImageBackground>
    <View style={styles}>
      {/* <Text style={itemStyles.title}>TRUCKS</Text> */}
      <MasonryFlashList
        onScroll={onScroll}
        data={filteredTrucks}
        numColumns={1}
        renderItem={renderItem}
        estimatedItemSize={100}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
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
      <Portal>
        <Modal visible={Visible} onDismiss={hideModal} contentContainerStyle={containerStyle.containerStyle}>
          <TextInput
            label="Matricule"
            value={matricule}
            style={itemStyles.textinput}
            onChangeText={text => setMatricule(text)}
          />
          <TextInput
            label="DATE"
            value={date}
            onChangeText={text => setDate(text)}
            style={itemStyles.textinput}
            onFocus={showDatePicker}
            // editable={false}
          />
          <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            date={date ? new Date(date) : new Date()}
          />
          <TextInput
            label="Numero de dossier"
            value={numeroDossier}
            style={itemStyles.textinput}
            onChangeText={text => setNumeroDossier(text)}
          />
          <TextInput
            label="Trajet"
            value={trajet}
            style={itemStyles.textinput}
            onChangeText={text => setTrajet(text)}
          />
          <TextInput
            label="Chargement"
            value={chargement}
            style={itemStyles.textinput}
            onChangeText={text => setChargement(text)}
          />
          <TextInput
            label="Dechargement"
            value={dechargement}
            style={itemStyles.textinput}
            onChangeText={text => setDechargement(text)}
          />
          <TextInput
            label="Status"
            value={status}
            style={itemStyles.textinput}
            onChangeText={text => setStatus(text)}
          />
          <Button icon="check" mode="contained" onPress={handleSubmit} style={{backgroundColor:'#729762'}}>
            Enregister
          </Button>
        </Modal>
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

export default Tracking;
