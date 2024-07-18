import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
// import firebase from '../Api/firebaseConfig';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import Animated, { BounceIn, BounceInDown, BounceInUp } from 'react-native-reanimated';
import { TextInput } from 'react-native-paper';
interface Props {
  navigation: any;
}

const SignIn: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const logIn = () => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then((user: any) => {
          Alert.alert('Welcome');
        })
        .catch((error) => {
          console.log('error');
        });
    } catch (error) {
      console.log('error');
    }
  };
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>WELCOME</Text>
      <Animated.View style={styles.subView} entering={BounceInDown.delay(200).duration(1000)} exiting={BounceInUp.delay(200).duration(1000)}>
        <Text style={styles.subTxt}>Login</Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          style={styles.nameInput}
          label="Email"
          activeUnderlineColor='#9c0327'
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput
           value={password}
           style={styles.nameInput}
           label="Password"
           secureTextEntry={true}
           activeUnderlineColor='#9c0327'
           onChangeText={(pass) => setPassword(pass)}
        />
        <TouchableOpacity style={styles.btn} onPress={onSignInPress}>
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>
        <View style={styles.endView}>
          <Text style={styles.endTxt}>Create an account?</Text>
          <TouchableOpacity
            style={styles.endBtn}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.loginTxt}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C80036',
    height: 'auto',
  },
  subView: {
    backgroundColor: 'white',
    height: 530,
    width:340,
    marginTop: 240,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    // alignItems:'center',
    alignSelf:'center',
    fontFamily:'Poppins-Regular'
  },
  headerTxt: {
    fontSize: 40,
    marginLeft: 40,
    color: 'white',
    position: 'absolute',
    marginTop: 140,
    fontFamily:'Poppins_700Bold'
  },
  subTxt: {
    color: 'black',
    marginTop: 20,
    fontSize: 30,
    fontFamily:'Poppins-Bold',
    textAlign:'center'
  },
  nameInput: {
    height: 50,
    width: 270,
    alignSelf:'center',
    borderBottomWidth: 1,
    fontFamily:'Poppins-Regular',
    marginTop: 30,
  },
  btn: {
    height: 50,
    width: 200,
    backgroundColor: '#9c0327',
    borderRadius: 80,
    borderWidth: 2,
    // marginLeft: 70,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center'
  },
  btnTxt: {
    fontFamily:'Poppins-Bold',
    color: 'white',
    fontSize: 20,
  },
  endView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  endTxt: {
    fontSize: 15,
    marginTop: 20,
    // marginLeft: 40,
    fontFamily:'Poppins-Regular',
    textAlign:'center'
  },
  endBtn: {
    marginTop: -10,
    alignSelf:'center'
  },
  loginTxt: {
    fontSize: 17,
    fontFamily:'Poppins-Bold',
    marginTop: 17,
  },
});

export default SignIn;