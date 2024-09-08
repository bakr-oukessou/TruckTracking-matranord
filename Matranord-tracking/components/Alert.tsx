import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

interface AlertProps {
    visible: boolean;
    title: string;
    message: string;
    onClose: () => void;
    type: 'success' | 'error' | 'warning' | 'info';
  }

const Alert: React.FC<AlertProps> = ({
    visible,
    title,
    message,
    onClose,
    type,
}) => {

    useEffect(() => {
        if (visible) {
          const timer = setTimeout(() => {
            onClose();
          }, 3000);
          return () => clearTimeout(timer);
        }
      }, [visible, onClose]);

    return (
        <Modal
          transparent={true}
          visible={visible}
          onRequestClose={onClose}
          animationType="fade"
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, type === 'success' ? styles.successModal : type === 'error' ? styles.errorModal : type === 'warning' ? styles.warningModal : styles.infoModal]}>
              <View style={styles.iconContainer}>
                <Image source={type === 'success' ? require('../assets/check-circle.png') : type === 'error' ? require('../assets/times-circle.png') : type === 'warning' ? require('../assets/exclamation-triangle.png') : require('../assets/info-circle.png')}
                       style={[styles.icon, type === 'success' ? styles.iconSuccess : type === 'error' ? styles.iconError : type === 'warning' ? styles.iconWarning : styles.iconInfo]}
                />
              </View>
              <Text style={[styles.modalTitle, type === 'success' ? styles.successText : type === 'error' ? styles.errorText : type === 'warning' ? styles.warningText : styles.infoText]}>{title}</Text>
              <Text style={styles.modalText}>{message}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, type === 'success' ? styles.successButton : type === 'error' ? styles.errorButton : type === 'warning' ? styles.warningButton : styles.infoButton]} onPress={onClose}>
                  <Text style={styles.buttonText}>OK</Text>
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
    iconContainer: {
      marginBottom: 20
    },
    icon: {
      width: 40,
      height: 40
    },
    modalTitle: {
      fontSize: 20,
      fontFamily: 'Poppins-Bold',
      marginBottom: 15,
      textAlign: 'center'
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontFamily: 'Poppins-Regular',
      fontSize: 16
    },
    buttonContainer: {
      width: '100%'
    },
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      marginTop: 10,
      minWidth: 120
    },
    buttonText: {
      fontFamily: 'Poppins-Bold',
      color: 'white',
      textAlign: 'center'
    },
    successModal: {
      borderColor: '#2ecc71',
      borderWidth: 2
    },
    successText: {
      color: '#2ecc71'
    },
    successButton: {
      backgroundColor: '#2ecc71'
    },
    errorModal: {
      borderColor: '#e74c3c',
      borderWidth: 2
    },
    errorText: {
      color: '#e74c3c'
    },
    errorButton: {
      backgroundColor: '#e74c3c'
    },
    warningModal: {
      borderColor: '#f1c40f',
      borderWidth: 2
    },
    warningText: {
      color: '#f1c40f'
    },
    warningButton: {
      backgroundColor: '#f1c40f'
    },
    infoModal: {
      borderColor: '#3498db',
      borderWidth: 2
    },
    infoText: {
      color: '#3498db'
    },
    infoButton: {
      backgroundColor: '#3498db'
    },
    iconSuccess: {
        tintColor: '#2ecc71',
        width: 50,
        height: 50,
    },
    iconError: {
        // tintColor: '#e74c3c'
        width: 60,
        height: 50,
    },
    iconWarning: {
        // tintColor: '#fff',
        width: 60,
        height: 50,
    },
    iconInfo: {
        tintColor: '#3498db',
        width: 50,
        height: 50,
    },
  });

export default Alert;