import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Animated, ImageBackground, Alert } from 'react-native';

import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, SafeAreaView,TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Driver } from '../types/types';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { getTaskByDriverCIN } from '../components/Api/api';
import { FlashList } from '@shopify/flash-list';
import UpdateModal from '../components/UpdateModal';

type DriverDetailsRouteProp = RouteProp<RootStackParamList, 'DriverDetails'>;
type DriverDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DriverDetails'>;

const DriverDetails = ({ route }: { route: DriverDetailsRouteProp}) => {
  
  const { driver: initialDriver } = route.params;
  const navigation = useNavigation<DriverDetailsScreenNavigationProp>();
  const [driver, setDriver] = useState<Driver>(initialDriver);
  const [activeTab, setActiveTab] = useState<'info' | 'tasks'>('info');
  const [relatedTasks, setRelatedTasks] = useState<any[]>([]);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  useEffect(() => {
    if (activeTab === 'tasks') {
      fetchRelatedTasks();
    }
  }, [activeTab]);

  const fetchRelatedTasks = async () => {
    try {
      const tasks = await getTaskByDriverCIN(driver.cin);
      setRelatedTasks(tasks);
    } catch (error) {
      console.error('Error fetching related tasks:', error);
      Alert.alert('Error', 'Failed to fetch related tasks');
    }
  };
  
  const uploadProfilePicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to grant camera roll permissions to upload a profile picture.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const formData = new FormData();
      formData.append('profilePicture', {
        uri: result.assets[0].uri,
        type: 'image/jpg',
        name: 'profile.jpg',
      } as any);

      try {
        const response = await axios.post(`http://10.0.2.2:8080/api/drivers/${driver.id}/profile-picture`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          setDriver({ ...driver, profilePicture: result.assets[0].uri });
          Alert.alert("Success", "Profile picture uploaded successfully");
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        Alert.alert("Error", "Failed to upload profile picture");
      }
    }
  };

  const handleUpdateSuccess = (updatedDriver: Driver) => {
    setDriver(updatedDriver);
  };
  
  const renderTask = ({ item }: { item: any }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.details}</Text>
      <Text style={styles.taskProvider}>{item.provider}</Text>
      <Text style={styles.taskStatus}>Status: {item.status}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles2.container}>
    <ImageBackground source={require('../assets/phoneBackground.jpg')} style={styles.image}>
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles2.infoContainer}>
        <TouchableOpacity onPress={uploadProfilePicture} style={styles.profileImageContainer}>
              {driver.profilePicture ? (
                <Image source={{uri: `data:image/jpeg;base64,${driver.profilePicture}`}} style={styles.profileImage} />
              ) : (
                <View style={styles.placeholderImage}>
                  <Text style={styles.placeholderText}>{driver.nom.charAt(0)}</Text>
                </View>
              )}
              <Text style={styles.uploadText}>Tap to upload photo</Text>
            </TouchableOpacity> 
            <Text style={styles.driverName}>{driver.nom}</Text>
          {/* <Text style={styles2.driverName}>Driver Details</Text> */}
          <View style={styles2.tabContainer}>
            <TouchableOpacity 
                style={[styles2.tab, activeTab === 'info' && styles2.activeTab]}
                onPress={() => setActiveTab('info')}>
              <Text style={activeTab === 'info' ? styles2.activeTabText : styles2.tabText}>
                Driver Info
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles2.tab, activeTab === 'tasks' && styles2.activeTab]}
                onPress={() => setActiveTab('tasks')}>
              <Text style={activeTab === 'tasks' ? styles2.activeTabText : styles2.tabText}>Related Tasks</Text>
            </TouchableOpacity>
          </View>
          {activeTab === 'info' ? (
            <View style={styles2.detailsContainer}>
              <DetailItem title="CIN" value={driver.cin} />
              <DetailItem title="Idvehicule" value={driver.idVehicule} />
              <DetailItem title="Nom" value={driver.nom} />
              <DetailItem title="Email" value={driver.email} />
              <DetailItem title="Telephone" value={driver.mobileNumber} />
              <DetailItem title="Adresse" value={driver.adresse} />
              <DetailItem title="Experience" value={driver.experience} />
              <DetailItem title="ValiditePermit" value={driver.validitePermit} />
            </View>
            ) : (
              <FlashList
                data={relatedTasks}
                renderItem={renderTask}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={() => (
                  <Text style={styles.emptyText}>No related tasks found.</Text>
                )}
              />
            )}
        </View>
    <View style={styles.buttons}>
      <TouchableOpacity 
            style={styles2.updateButton}
            onPress={() => setIsUpdateModalVisible(true)}>
        <Text style={styles2.updateButtonText}>Update Driver Info</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles2.updateButton} 
        onPress={() => navigation.navigate('AssignTask', { driverCin: driver.cin })}>
        <Text style={styles2.updateButtonText}>Assign Task</Text>
      </TouchableOpacity>
    </View>
    
    </ScrollView>
    </ImageBackground>
    <UpdateModal
        isVisible={isUpdateModalVisible}
        onClose={() => setIsUpdateModalVisible(false)}
        driver={driver}
        onUpdateSuccess={handleUpdateSuccess}
      />
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
    
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    objectFit:'cover',
    height: 120,
    borderRadius: 60,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E5114D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
    color: 'white',
  },
  uploadText: {
    marginTop: 8,
    color: '#E5114D',
    fontSize: 14,
  },
  driverName: {
    fontSize: 24,
    // fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
  },
  taskItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskProvider: {
    fontSize: 14,
    color: '#666',
  },
  taskStatus: {
    fontSize: 14,
    color: '#E5114D',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});


const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
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
    fontFamily: 'Poppins-Bold',
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
    width:'100%'
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
    width:'100%',
    marginTop:10,
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily:'Poppins-Regular',
  },
});

export default DriverDetails;