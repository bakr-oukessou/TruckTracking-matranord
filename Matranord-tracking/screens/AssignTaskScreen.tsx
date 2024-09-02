import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { getAvailableTasks, assignTaskToDriver } from '../components/Api/api';

type AssignTaskScreenRouteProp = RouteProp<RootStackParamList, 'AssignTask'>;
type AssignTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AssignTask'>;

const AssignTaskScreen = ({ route }: { route: AssignTaskScreenRouteProp }) => {
  const { driverCin } = route.params;
  const navigation = useNavigation<AssignTaskScreenNavigationProp>();
  const [availableTasks, setAvailableTasks] = useState([]);

  useEffect(() => {
    fetchAvailableTasks();
  }, []);

  const fetchAvailableTasks = async () => {
    try {
      const tasks = await getAvailableTasks();
      setAvailableTasks(tasks);
    } catch (error) {
      console.error('Error fetching available tasks:', error);
      Alert.alert('Error', 'Failed to fetch available tasks');
    }
  };

  const handleAssignTask = async (taskId: string) => {
    try {
      await assignTaskToDriver(taskId, driverCin);
      Alert.alert('Success', 'Task assigned successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error assigning task:', error);
      Alert.alert('Error', 'Failed to assign task');
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