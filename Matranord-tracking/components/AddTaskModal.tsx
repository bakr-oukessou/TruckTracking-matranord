import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity,Modal } from 'react-native';
import { Portal, TextInput, Button } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { Driver } from '../types/types';
import { createTask, getAllDrivers } from './Api/api';

interface AddTaskModalProps {
  visible: boolean;
  hideModal: () => void;
  onSubmit: (newTask: any) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ visible, hideModal, onSubmit }) => {
  const [details, setDetails] = useState('');
  const [provider, setProvider] = useState('');
  const [Dateheurecreation, setDateHeureCreation] = useState('');
  const [observation, setObservation] = useState('');
  const [cloture, setCloture] = useState('');
  const [status, setStatus] = useState('AVAILABLE');
  const [driverId, setDriverID] = useState('');
  const [started_at, setStarted_at] = useState('');
  const [completed_at, setCompleted_at] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<'date' | 'time'>('date');
  const [Alertmessage, setAlert] = useState({ visible: false,title:'', message: '', type: 'success' as 'success' | 'error' |'warning'|'info'});
  const [currentDateField, setCurrentDateField] = useState<'dateHeureCreation' | 'cloture' | 'startedAt' | 'completedAt'>('dateHeureCreation');



  const showDatePicker = (mode: 'date' | 'time', field: 'dateHeureCreation' | 'cloture' | 'startedAt' | 'completedAt') => {
    setDatePickerMode(mode);
    setCurrentDateField(field);
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (selectedDate: Date) => {
    const formattedDate = datePickerMode === 'date' 
      ? selectedDate.toISOString().split('T')[0]
      : selectedDate.toTimeString().split(' ')[0];

    switch (currentDateField) {
      case 'dateHeureCreation':
        setDateHeureCreation(formattedDate);
        break;
      case 'cloture':
        setCloture(formattedDate);
        break;
      // case 'startedAt':
      //   setStartedAt(formattedDate);
      //   break;
      // case 'completedAt':
      //   setCompletedAt(formattedDate);
      //   break;
    }
    hideDatePicker();
  };

  const handleSubmit = async () => {
    try {
      const newTask = {
        details,
        provider,
        observation,
        cloture: new Date(cloture),
        // Dateheurecreation: new Date(Dateheurecreation),
        status,
        started_at,
        completed_at,
        // driverId
      };
      // Reset form fields
      setDetails('');
      setProvider('');
      setObservation('');
      setCloture('');
      setDateHeureCreation('');
      setStatus('AVAILABLE');
      // setDriverID('');

      onSubmit(newTask);
      hideModal();

    } catch (error) {
      console.error('Error adding task:', error);
      // Handle error (e.g., show an error message to the user)
    }
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
                   onChangeText={setDetails}
                 />
                 <TextInput
                   label="Provider"
                   value={provider}
                   onChangeText={setProvider}
                   style={styles.textinput}
                 />
                 <TextInput
                   label="Observation"
                   value={observation}
                   style={styles.textinput}
                   onChangeText={setObservation}
                 />
                 <TextInput
                   label="Cloture"
                   value={cloture}
                   style={styles.textinput}
                   onFocus={() => showDatePicker('date', 'cloture')}
                 />
                
                 <Text style={styles.pickerLabel}>Task Status</Text>
                 <Picker
                   selectedValue={status}
                   onValueChange={setStatus}
                   style={styles.picker}
                 >
                   <Picker.Item label="AVAILABLE" value="AVAILABLE" />
                   <Picker.Item label="IN_PROGRESS" value="IN_PROGRESS" />
                   <Picker.Item label="COMPLETED" value="COMPLETED" />
                 </Picker>
                 <View style={styles.buttonContainer}>
                   <Button icon="check" mode="contained" onPress={handleSubmit} style={styles.submitButton}>
                     Enregistrer
                   </Button>
                   <Button mode="outlined" onPress={hideModal} style={styles.cancelButton}>
                     Cancel
                   </Button>
                 </View>
               </ScrollView>
             </View>
           </View>
         </Modal>
         <DateTimePicker
           isVisible={isDatePickerVisible}
           mode={datePickerMode}
           onConfirm={handleConfirm}
           onCancel={hideDatePicker}
           date={new Date()}
         />
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
    // fontWeight: 'bold',
    fontFamily:'Poppins-Bold',
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
  pickerLabel: {
    marginLeft:15,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  picker: {
    borderWidth: 2,
    borderColor: 'blacks',
    backgroundColor:'#e7e0ec',
    maxWidth: 295,
    marginLeft:10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default AddTaskModal;