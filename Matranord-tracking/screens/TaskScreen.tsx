import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, StyleSheet, Pressable, RefreshControl, StyleProp, ViewStyle, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { createTask, getAllTasks } from '../components/Api/api';
import { Driver, RootStackParamList, Tasks, TasksProps } from '../types/types';
import axios from 'axios';
import { ActivityIndicator, PaperProvider } from 'react-native-paper';
import { MasonryFlashList } from '@shopify/flash-list';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';


type TaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskScreen'> & TasksProps;

const TaskScreen: React.FC<TasksProps> = ({
  animatedValue,  
  visible,
  extended,
  label,
  animateFrom,
  style,
  iconMode,
}) => {
  //////////////////// API Call//////////////////
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'available' | 'inProgress' | 'completed'>('available');

  useEffect(() => {
    filterTasks();
  }, [searchQuery, tasks]);

  useEffect(() => {
    fetchTasks();
  }, []);
  
  useEffect(() => {
    // console.log("Drivers state updated:", drivers);
  }, [tasks]);

  useEffect(() => {
    filterTasks();
  }, [searchQuery, tasks, activeTab]);
  
  useEffect(() => {
    console.log("Filtered tasks state updated:", filteredTasks);
  }, [filteredTasks]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true); 
      const data = await getAllTasks();
      // console.log("Fetched trucks:", data);
      setTasks(data);
    //   console.log(Date.now());
      // console.log("Drivers state:", drivers);
      setFilteredTasks(data);
      // console.log("Filtered drivers state:", filteredDrivers);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching Tasks:", err);
      if (axios.isAxiosError(err)) {
        console.error("Response data:", err.response?.data);
        console.error("Response status:", err.response?.status);
        console.error("Response headers:", err.response?.headers);
      }
      setError('Failed to fetch drivers: ' + (err as Error).message);
      setIsLoading(false);
    }
  };

  // const filterTasks = () => {
  //   const filtered = tasks.filter(task => 
  //     task && (task.status ? task.status.toLowerCase().includes(searchQuery.toLowerCase()) : false)
  //   );
  //   setFilteredTasks(filtered);
  // };

  const filterTasks = () => {
    const filtered = tasks.filter(task => {
      if (activeTab === 'available') {
        return task.status.toLowerCase() === 'available';
      } else if (activeTab === 'inProgress') {
        return task.status.toLowerCase() === 'in progress';
      } else {
        return task.status.toLowerCase() === 'completed';
      }
    });
    setFilteredTasks(filtered);
  };

  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    type: 'success', // or 'error'
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTasks().then(() => setRefreshing(false));
  }, []);

    /////////// Add FAB button ///////////////////////
    const [isExtended, setIsExtended] = React.useState(true);

    const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
  
      setIsExtended(currentScrollPosition <= 0);
    };
  
    const fabStyle: StyleProp<ViewStyle> = { [animateFrom]: 16 };
  
    const [details,setDetails] = useState('');
    const [provider,setProvider] = useState('');
    const [Observation,setObservation] = useState('');
    const [Cloture,setCloture]=useState('');
    const [DateHeureCreation,setDateHeureCreation] = useState('');
    const [status,setStatus]=useState('');
    const [startedAt,setStartedAt] = useState('');
    const [completedAt,setCompletedAt] = useState('');
    const [driverCin, setDriverCin] = useState({});

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
    

//   const handleSubmit = async () => {
//     try {
//       const newTask = {
//         details,
//         provider,
//         Observation,
//         Cloture:new Date(Cloture),
//         DateHeureCreation,
//         status,
//         startedAt,
//         completedAt,
//         driverCin
//       };
  
//       const createdDriver = await createTask(newTask);
//       console.log('Driver added successfully:', createdDriver);
    
//       setDetails('');
//       setProvider('');
//       setObservation('');
//       setCloture('');
//       setDateHeureCreation('');
//       setStatus('');
//       setStartedAt('');
//       setCompletedAt('');
//       setDriverCin('');
      

//       hideModal();

      
//       setSnackbar({
//         visible: true,
//         message: 'Driver added successfully!',
//         type: 'success',
//       });
//       // getAllTrucks();

//     } catch (error) {
//       console.error('Error adding driver:', error);
//       setSnackbar({
//         visible: true,
//         message: 'Error adding driver. Please try again.',
//         type: 'error',
//       }); 
//     }
//   };
  /////////////////////////////////////////

//   const navigation = useNavigation<TaskScreenNavigationProp>();
  
  const renderItem = ({ item }: { item: Tasks }) => (
    <View style={itemStyles.container}>
      {/* <Pressable onPress={() => navigation.navigate('TaskDetails', { task: item })}android_ripple={{color: 'grey'}} style={({pressed}) => [
        {
          backgroundColor: pressed ? '#EAD196' : 'white',
        },
        itemStyles.item,
      ]}> */}
        <View style={itemStyles.info2}>
          <View style={itemStyles.info}>
            <Text style={itemStyles.text}><Text style={itemStyles.bold}>Provider:</Text> {item.provider}</Text>
            <Text style={itemStyles.text}><Text style={itemStyles.bold}>{item.observation}</Text> </Text>
            <Text style={itemStyles.text}><Text style={itemStyles.bold}>{item.driverCin}</Text> </Text>
            <Text style={itemStyles.text}><Text style={itemStyles.bold}>{item.dateHeureCreation}</Text> </Text>
            <Text style={itemStyles.text}><Text style={itemStyles.bold}>Status:</Text> {item.status}</Text>
            {/* <Text style={[itemStyles.text, itemStyles.status]}><Text style={[itemStyles.bold, itemStyles.statusData]}>Validite:</Text>{item.cloture ? item.cloture.toLocaleDateString() : 'N/A'}</Text> */}
          </View>
        </View>
      {/* </Pressable> */}
    </View>
  );

  return (
    <SafeAreaView style={styles2.container}>
    <ImageBackground source={require('../assets/phoneBackground.jpg')} style={styles.image}>
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles2.infoContainer}>
          <View style={styles2.tabContainer}>
            <TouchableOpacity 
              style={[styles2.tab, activeTab === 'available' && styles2.activeTab]}
              onPress={() => setActiveTab('available')}>
              <Text style={activeTab === 'available' ? styles2.activeTabText : styles2.tabText}>AVAILABLE</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles2.tab, activeTab === 'inProgress' && styles2.activeTab]}
              onPress={() => setActiveTab('inProgress')}>
              <Text style={activeTab === 'inProgress' ? styles2.activeTabText : styles2.tabText}>IN PROGRESS</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles2.tab, activeTab === 'completed' && styles2.activeTab]}
              onPress={() => setActiveTab('completed')}>
              <Text style={activeTab === 'completed' ? styles2.activeTabText : styles2.tabText}>COMPLETED</Text>
            </TouchableOpacity>
          </View>
            <View style={styles2.detailsContainer}>
              <PaperProvider>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <MasonryFlashList
                  data={filteredTasks}
                  numColumns={1}
                  renderItem={renderItem}
                  estimatedItemSize={100}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />)}
                </PaperProvider>
            </View>
        </View>
        {/* <View style={styles.buttons}>
            <TouchableOpacity style={styles2.updateButton}>
                <Text style={styles2.updateButtonText}>Update Driver Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles2.updateButton}>
                <Text style={styles2.updateButtonText}>Assign Task</Text>
            </TouchableOpacity>
        </View> */}
    
    </ScrollView>
    </ImageBackground>
    </SafeAreaView>
  );
};

// const DetailItem: React.FC<{ title: string; value: string }> = ({ title, value }) => (
//   <View style={styles2.detailItem}>
//     <Text style={styles2.detailTitle}>{title}:</Text>
//     <Text style={styles2.detailValue}>{value}</Text>
//   </View>
// );

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 245, 225, 0.7)',
    fontFamily: 'Poppins-Regular',
    padding: 5,
    height:'100%',
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
    height:'100%'
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
  driverImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoContainer: {
    paddingLeft: 16,
    paddingBottom: 16,
    paddingRight: 16,
    width:'100%',
    height:'100%'
  },
  driverName: {
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
    height:'100%'
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
    width:350,
    height:60,
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'center',
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
    alignSelf:'baseline',
    borderRadius:20,
    // margin:20
  },
  info:{
    display:'flex',
    flexDirection:'column',
    // justifyContent: 'flex-end',
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
    
  }

});
export default TaskScreen;

