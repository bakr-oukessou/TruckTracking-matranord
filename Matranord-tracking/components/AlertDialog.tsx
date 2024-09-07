import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface AlertDialogProps {
  visible: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  visible,
  title,
  message,
  onCancel,
  onConfirm,
  cancelText = 'Cancel',
  confirmText = 'Confirm'
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
      animationType="fade"
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get('window').width * 0.8
  },
  modalTitle: {
    fontSize: 20,
    // fontWeight: 'bold',
    fontFamily:'Poppins-Bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily:'Poppins-Regular',
    fontSize: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop:10,
    minWidth: 120
},
cancelButton: {
    backgroundColor: '#9D9FA2'
},
confirmButton: {
    backgroundColor: '#AA304E'
},
buttonText: {
    fontFamily:'Poppins-Bold',
    color: 'white',
    textAlign: 'center'
  }
});

export default AlertDialog;