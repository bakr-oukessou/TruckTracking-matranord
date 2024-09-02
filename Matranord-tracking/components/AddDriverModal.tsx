import React, { useState } from 'react';
import { View, StyleSheet,Modal, ScrollView } from 'react-native';
import { Portal, TextInput, Button, Text } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';

interface AddDriverModalProps {
  visible: boolean;
  hideModal: () => void;
  onSubmit: (driverData: any) => void;
}

const AddDriverModal: React.FC<AddDriverModalProps> = ({ visible, hideModal, onSubmit }) => {
  const [cin, setCin] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [adresse, setAdresse] = useState('');
  const [validitePermit, setValiditePermit] = useState('');
  const [idVehicule, setIdVehicule] = useState('');
  const [experience, setExperience] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (selectedDate: Date) => {
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    setValiditePermit(formattedDate);
    hideDatePicker();
  };

  const handleSubmit = () => {
    const newDriver = {
      cin,
      nom,
      email,
      mobileNumber,
      adresse,
      validitePermit,
      idVehicule,
      experience,
    };
    onSubmit(newDriver);
    resetForm();
    hideModal();
  };

  const resetForm = () => {
    setCin('');
    setNom('');
    setEmail('');
    setMobileNumber('');
    setAdresse('');
    setValiditePermit('');
    setIdVehicule('');
    setExperience('');
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        <ScrollView>
        <Text style={styles.modalTitle}>Add New Driver</Text>
            <TextInput
            label="CIN"
            value={cin}
            style={styles.textinput}
            onChangeText={setCin}
            />
            <TextInput
            label="Nom"
            value={nom}
            onChangeText={setNom}
            style={styles.textinput}
            />
            <TextInput
            label="Email"
            value={email}
            style={styles.textinput}
            onChangeText={setEmail}
            />
            <TextInput
            label="Mobile Number"
            value={mobileNumber}
            style={styles.textinput}
            onChangeText={setMobileNumber}
            />
            <TextInput
            label="Adresse"
            value={adresse}
            style={styles.textinput}
            onChangeText={setAdresse}
            />
            <TextInput
            label="Validite Permit"
            value={validitePermit}
            style={styles.textinput}
            onFocus={showDatePicker}
            // editable={false}
            />
            <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            date={validitePermit ? new Date(validitePermit) : new Date()}
            />
            <TextInput
            label="Experience"
            value={experience}
            style={styles.textinput}
            onChangeText={setExperience}
            />
            <TextInput
            label="Id Vehicule"
            value={idVehicule}
            style={styles.textinput}
            onChangeText={setIdVehicule}
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

export default AddDriverModal;