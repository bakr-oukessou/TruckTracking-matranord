// UpdateDriverModal.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Driver } from '../types/types';
import { updateDriver } from './Api/api';

interface UpdateModalProps {
  isVisible: boolean;
  onClose: () => void;
  driver: Driver;
  onUpdateSuccess: (updatedDriver: Driver) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ isVisible, onClose, driver, onUpdateSuccess }) => {
  const [updatedDriver, setUpdatedDriver] = useState<Driver>(driver);

  useEffect(() => {
    setUpdatedDriver(driver);
  }, [driver]);

  const handleUpdateDriver = async () => {
    try {
      const result = await updateDriver(updatedDriver);
      onUpdateSuccess(result);
      Alert.alert('Success', 'Driver information updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating driver:', error);
      Alert.alert('Error', 'Failed to update driver information');
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.modalTitle}>Update Driver Information</Text>
            <TextInput
              style={styles.input}
              value={updatedDriver.nom}
              onChangeText={(text) => setUpdatedDriver({ ...updatedDriver, nom: text })}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              value={updatedDriver.email}
              onChangeText={(text) => setUpdatedDriver({ ...updatedDriver, email: text })}
              placeholder="Email"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              value={updatedDriver.mobileNumber}
              onChangeText={(text) => setUpdatedDriver({ ...updatedDriver, mobileNumber: text })}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              value={updatedDriver.adresse}
              onChangeText={(text) => setUpdatedDriver({ ...updatedDriver, adresse: text })}
              placeholder="Address"
              multiline
            />
            <TextInput
              style={styles.input}
              value={updatedDriver.experience}
              onChangeText={(text) => setUpdatedDriver({ ...updatedDriver, experience: text })}
              placeholder="Experience"
            />
            <TextInput
              style={styles.input}
              value={updatedDriver.validitePermit}
              onChangeText={(text) => setUpdatedDriver({ ...updatedDriver, validitePermit: text })}
              placeholder="Permit Validity"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleUpdateDriver}>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
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
});

export default UpdateModal;