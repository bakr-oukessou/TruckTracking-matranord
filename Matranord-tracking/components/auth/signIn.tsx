import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import firebase from '../Api/firebaseConfig';
// import firebase from 'react-native-firebase';

interface State {
  email: string;
  pass: string;
}

interface Props {
  navigation: any;
}

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
    }
  }

//   logIn = () => {
//     const { email, pass } = this.state
//     try {
//       firebase
//         .auth()
//         .signInWithEmailAndPassword(email, pass)
//         .then((user: any) => {
//           Alert.alert('Welcome')
//         })
//     }
//     catch (error) {
//       console.log('error');
//     }
//   }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTxt}>WELCOME</Text>
        <View style={styles.subView}>
          <Text style={styles.subTxt}>Login</Text>
          <TextInput style={styles.nameInput} placeholder="Email" onChangeText={(email) => { this.setState({ email }) }} />
          <TextInput style={styles.nameInput} placeholder="Password" onChangeText={(pass) => { this.setState({ pass }) }} />
          <TouchableOpacity style={styles.btn} >
            <Text style={styles.btnTxt}>Login</Text>
          </TouchableOpacity>
          <View style={styles.endView}>
            <Text style={styles.endTxt}>Create an account?</Text>
            <TouchableOpacity
              style={styles.endBtn}
              onPress={() => this.props.navigation.navigate('signup')}>
              <Text style={styles.loginTxt}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#521be3',
    height: 700,
  },
  subView: {
    backgroundColor: 'white',
    height: 430,
    marginTop: 240,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  headerTxt: {
    fontSize: 40,
    marginLeft: 40,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    marginTop: 140,
  },
  subTxt: {
    color: 'black',
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  nameInput: {
    height: 40,
    width: 270,
    marginLeft: 40,
    borderBottomWidth: 1,
    marginTop: 30,
  },
  btn: {
    height: 50,
    width: 200,
    backgroundColor: 'blue',
    borderRadius: 80,
    borderWidth: 2,
    marginLeft: 70,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  endView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  endTxt: {
    fontSize: 15,
    marginTop: 30,
    marginLeft: 60,
    fontWeight: 'bold',
  },
  endBtn: {
    marginRight: 80,
  },
  loginTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
  },
});