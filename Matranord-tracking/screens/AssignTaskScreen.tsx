import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAvailableTasks, assignTaskToDriver } from '../components/Api/api';
import Alert from '../components/Alert';

type AssignTaskScreenRouteProp = RouteProp<RootStackParamList, 'AssignTask'>;
type AssignTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AssignTask'>;

const AssignTaskScreen = ({ route }: { route: AssignTaskScreenRouteProp }) => {
  const { driverCin } = route.params;
  const navigation = useNavigation<AssignTaskScreenNavigationProp>();
  const [availableTasks, setAvailableTasks] = useState([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [Alertmessage, setAlert] = useState({ visible: false,title:'', message: '', type: 'success' as 'success' | 'error' |'warning'|'info'});


  useEffect(() => {
    fetchAvailableTasks();
  }, []);

  const fetchAvailableTasks = async () => {
    try {
      const tasks = await getAvailableTasks();
      setAvailableTasks(tasks);
    } catch (error) {
      console.error('Error fetching available tasks:', error);      
      setAlert({ visible: true,title:'Error', message: 'Failed to fetch available tasks', type: 'error' });
    }
  };

  const handleAssignTask = async (taskId: string) => {
    setIsAlertVisible(false);

    try {
      await assignTaskToDriver(taskId, driverCin);
      setAlert({ visible: true,title:'Success', message: 'Task assigned successfully', type: 'success' });
      setTimeout(() => navigation.goBack(), 3000);
    } catch (error) {
      console.error('Error assigning task:', error);
      setAlert({ visible: true,title:'Error', message: 'Failed to assign task please try again', type: 'error' });
    }
  };

  const renderTask = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.taskItem} onPress={() => handleAssignTask(item.id)}>
      <Text style={styles.taskTitle}>{item.details}</Text>
      <Text style={styles.taskProvider}>{item.provider}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Tasks</Text>
      <FlatList
        data={availableTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
      />
      <Alert
          visible={Alertmessage.visible}
          title={Alertmessage.title}
          message={Alertmessage.message}
          type={Alertmessage.type}
          onClose={() => setAlert(prev => ({ ...prev, visible: false }))}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF5E1',
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    fontFamily:'Poppins-Bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  taskItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderColor:'black',
    borderWidth:1
  },
  taskTitle: {
    fontSize: 18,
    fontFamily:'Poppins-Bold',
    // fontWeight: 'bold',
  },
  taskProvider: {
    fontFamily:'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
});

export default AssignTaskScreen;