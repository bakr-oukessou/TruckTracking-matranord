import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity,Modal } from 'react-native';
import { Portal, TextInput, Button } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';

interface AddTaskModalProps {
  visible: boolean;
  hideModal: () => void;
  handleSubmit: (newTask: any) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ visible, hideModal, handleSubmit }) => {
  const [details, setDetails] = useState('');
  const [provider, setProvider] = useState('');
  const [observation, setObservation] = useState('');
  const [cloture, setCloture] = useState('');
  const [dateHeureCreation, setDateHeureCreation] = useState('');
  const [status, setStatus] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (selectedDate: Date) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setDateHeureCreation(formattedDate);
    hideDatePicker();
  };

  const onSubmit = () => {
    const newTask = {
      details,
      provider,
      observation,
      cloture: new Date(cloture),
      dateHeureCreation,
      status,
    };
    handleSubmit(newTask);
    hideModal();
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

  return (
    <Portal>
        <Modal visible={visible} onDismiss={hideModal} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <ScrollView>
                <Text style={styles.modalTitle}>Add New Task</Text>
                <TextInput
                    label="Details"
                    value={details}
                    style={styles.textinput}
                    onChangeText={text => setDetails(text)}
                />
                <TextInput
                    label="Provider"
                    value={provider}
                    onChangeText={text => setProvider(text)}
                    style={styles.textinput}
                    // editable={false}
                    />
                <TextInput
                    label="Date Heure de creation"
                    value={provider}
                    onChangeText={text => setProvider(text)}
                    style={styles.textinput}
                    // editable={false}
                    onFocus={showDatePicker}
                />
                <DateTimePicker
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={dateHeureCreation ? new Date(dateHeureCreation) : new Date()}
                />
                <TextInput
                    label="Observation"
                    value={observation}
                    style={styles.textinput}
                    onChangeText={text => setObservation(text)}
                />
                <TextInput
                    label="cloture"
                    value={cloture}
                    style={styles.textinput}
                    onFocus={showDatePicker}
                    onChangeText={text => setCloture(text)}
                />
                <DateTimePicker
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={cloture ? new Date(cloture) : new Date()}
                />
                <TextInput
                    label="Status"
                    value={status}
                    style={styles.textinput}
                    onChangeText={text => setStatus(text)}
                />
                <View style={styles.buttonContainer}>
                    <Button icon="check" mode="contained" onPress={handleSubmit} style={styles.submitButton}>
                        Enregister
                    </Button>
                    <Button mode="outlined" onPress={hideModal} style={styles.cancelButton}>
                        Cancel
                    </Button>
                </View>
            </ScrollView>
        </View>
        </View>
        </Modal>
    </Portal> 
  );
};

const styles = StyleSheet.create({
//   modalContainer: {
//     backgroundColor: 'white',
//     padding: 20,
//     margin: 20,
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
  submitButton: {
    // marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#729762',
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    marginBottom: 10,
    backgroundColor: 'lightgrey',
    // padding: 10,
    // borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
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
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textinput:{
    // padding:10,
    height:45,
    margin:10,
    borderColor:'#AF8260',
    borderWidth:1,
  },
});

export default AddTaskModal;