// UpdateDriverModal.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Driver, Tasks } from '../types/types';
import { getAllDrivers, updateDriver, updateTask } from './Api/api';
import { Picker } from '@react-native-picker/picker'; // Install if necessary


interface UpdateTaskModalProps {
  isVisible: boolean;
  onClose: () => void;
  task: Tasks;
  onUpdateSuccess: (updatedTask: Tasks) => void;
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({ isVisible, onClose, task, onUpdateSuccess }) => {
  const [updatedTask, setUpdatedTask] = useState<Tasks>(task);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    setUpdatedTask(task);
    fetchAllDrivers(); // Fetch drivers when the modal opens
  }, [task]);
  
  const fetchAllDrivers = async () => {
    try {
      const driversList = await getAllDrivers();
      setDrivers(driversList);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };
  const handleUpdateTask = async () => {
    try {
      const result = await updateTask(updatedTask);
      onUpdateSuccess(result);
      Alert.alert('Success', 'Task information updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating task:', error);
      Alert.alert('Error', 'Failed to update task information');
    }
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.modalTitle}>Update Task Information</Text>
            <Text style={styles.pickerLabel}>Assigned Driver</Text>
            <Picker
              selectedValue={updatedTask.driver?.id}
              onValueChange={(driverId) => {
                const selectedDriver = drivers.find(driver => driver.id === driverId);
                setUpdatedTask({ ...updatedTask, driver: selectedDriver || null });
              }}
              style={styles.picker}
            >
              {drivers.map((driver) => (
                <Picker.Item key={driver.id} label={driver.nom} value={driver.id} />
              ))}
            </Picker>
            <TextInput
              style={styles.input}
              value={updatedTask.details}
              onChangeText={(text) => setUpdatedTask({ ...updatedTask, details: text })}
              placeholder="Details"
            />
            <TextInput
              style={styles.input}
              value={updatedTask.provider}
              onChangeText={(text) => setUpdatedTask({ ...updatedTask, provider: text })}
              placeholder="Provider"
            />
            <TextInput
              style={styles.input}
              value={updatedTask.observation}
              onChangeText={(text) => setUpdatedTask({ ...updatedTask, observation: text })}
              placeholder="Observation"
            />
            <TextInput
              style={styles.input}
              value={updatedTask.cloture.toString()}
            //   value={updatedTask.cloture.toISOString().split('T')[0]} // Convert Date to string in YYYY-MM-DD format
              onChangeText={(text) => setUpdatedTask({ ...updatedTask,  cloture: new Date(text) })}
              placeholder="Cloture"
              multiline
            />
            <Text style={styles.pickerLabel}>Task Status</Text>
            <Picker
              selectedValue={updatedTask.status}
              onValueChange={(status) => setUpdatedTask({ ...updatedTask, status })}
              style={styles.picker}
            >
              <Picker.Item label="AVAILABLE" value="AVAILABLE" />
              <Picker.Item label="IN_PROGRESS" value="IN_PROGRESS" />
              <Picker.Item label="COMPLETED" value="COMPLETED" />
            </Picker>
            <TextInput
              style={styles.input}
              value={updatedTask.completedAt}
              onChangeText={(text) => setUpdatedTask({ ...updatedTask, completedAt: text })}
              placeholder="Completed At"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleUpdateTask}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#E5114D',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pickerLabel: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default UpdateTaskModal;