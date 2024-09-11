import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Animated, ImageBackground} from 'react-native';

import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Tasks } from '../types/types';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, SafeAreaView,TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import UpdateTaskModal from '../components/UpdateTaskModal';
import { DeleteTask } from '../components/Api/api';
import AlertDialog from '../components/AlertDialog';
import Alert from '../components/Alert';
import { format } from 'date-fns';

type TaskDetailsRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;
type TaskDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskDetails'>;

const TaskDetails = ({ route }: { route: TaskDetailsRouteProp}) => {
  
  const { task: initialTask } = route.params;
  const navigation = useNavigation<TaskDetailsScreenNavigationProp>();
  const [task, setTask] = useState<Tasks>(initialTask);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [Alertmessage, setAlert] = useState({ visible: false,title:'', message: '', type: 'success' as 'success' | 'error' |'warning'|'info'});

  const handleUpdateSuccess = (updatedTask: Tasks) => {
    setAlert({ visible: true,title:'Success', message: 'Task Information Updated successfully', type: 'success' });
    setTask(updatedTask);
  };

  const handleDelete = async () => {
    setIsAlertVisible(true);
  };

  const onConfirmDelete = async () => {
    setIsAlertVisible(false);
    try {
      await DeleteTask(task.id);
      setAlert({ visible: true,title:'Success', message: 'Task deleted successfully please reload page', type: 'success' });
      setTimeout(() => navigation.goBack(), 3000);
    } catch (error) {
      console.error("Error deleting task:", error);
      setAlert({ visible: true,title:'Error', message: 'Failed to delete task', type: 'error' });
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return 'N/A';
    try {
      return format(new Date(date), 'yyyy-MM-dd');
    } catch {
      return 'Invalid Date';
    }
  };
  const safeString = (value: any): string => {
    if (value === null || value === undefined) return 'N/A';
    return String(value);
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
            {/* <Text style={styles.taskName}>{task.details}</Text> */}
          {/* <Text style={styles2.taskName}>task Details</Text> */}
          <View style={styles2.tabContainer}>
            <TouchableOpacity style={[styles2.tab, styles2.activeTab]}>
              <Text style={styles2.activeTabText}>task Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles2.tab}>
              <Text style={styles2.tabText}>Related Driver</Text>
            </TouchableOpacity>
          </View>
            <View style={styles2.detailsContainer}>
              <DetailItem title="id" value={task.id.toString()} />
              <DetailItem title="details" value={task.details} />
              <DetailItem title="provider" value={task.provider} />
              <DetailItem title="observation" value={task.observation} />
              <DetailItem title="dateHeureCreation" value={task.dateheurecreation} />
              <DetailItem title="cloture" value={formatDate(task.cloture)} />
              <DetailItem title="Status" value={task.status} />
              <DetailItem title="StartedAt" value={formatDate(task.startedAt)} />
              <DetailItem title="CompletedAt" value={formatDate(task.completedAt)} />
              {/* <DetailItem title="Driver" value={task.driver?.nom} /> */}
            </View>
        </View>
    <View style={styles.buttons}>
      <TouchableOpacity style={styles2.updateButton} onPress={() => setIsUpdateModalVisible(true)}>
        <Text style={styles2.updateButtonText}>Update Task Info</Text>
      </TouchableOpacity>
    </View>
    
    </ScrollView>
    </ImageBackground>
    <UpdateTaskModal
        isVisible={isUpdateModalVisible}
        onClose={() => setIsUpdateModalVisible(false)}
        task={task}
        onUpdateSuccess={handleUpdateSuccess}
      />
      <AlertDialog
          visible={isAlertVisible}
          title="Delete Task"
          message="Are you sure you want to delete this Task?"
          onCancel={() => setIsAlertVisible(false)}
          onConfirm={onConfirmDelete}
          cancelText="Cancel"
          confirmText="Delete"
        />
        <Alert
          visible={Alertmessage.visible}
          title={Alertmessage.title}
          message={Alertmessage.message}
          type={Alertmessage.type}
          onClose={() => setAlert(prev => ({ ...prev, visible: false }))}
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
  taskName: {
    fontSize: 24,
    // fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
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
  taskName: {
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

export default TaskDetails;