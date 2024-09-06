import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground
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
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <ImageBackground source={require('../../assets/background3.jpg')} style={styles.bgimage}>
    <View style={styles.container}>
      <Text style={styles.headerTxt}>WELCOME TO</Text>
      <Image source={require('../../assets/Logo-png-1.png')} style={imagestyles.image}/>
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
    </ImageBackground>
  );
};

const imagestyles = StyleSheet.create({
  image:{
    marginTop:130,
    alignSelf:'center',
    objectFit:'contain',
    height:120,
  }
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(200, 0, 54, 0.3)',
    // backgroundColor: '#C80036',
    height: 'auto',
  },
  subView: {
    backgroundColor: 'white',
    height: 630,
    width:340,
    marginTop: 70,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    // alignItems:'center',
    alignSelf:'center',
    fontFamily:'Poppins-Regular'
  },
  headerTxt: {
    fontSize: 30,
    // marginLeft: 40,
    alignSelf:'center',
    color: 'black',
    position: 'absolute',
    marginTop: 40,
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
  bgimage:{
    objectFit:'fill',
    height:'100%',
  //   borderRadius: 12,
    overflow: 'hidden',
  },
});

export default SignIn;