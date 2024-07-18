import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Button } from 'react-native';
import {TextInput} from 'react-native-paper';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import Animated, { BounceIn, BounceInDown, BounceInUp } from 'react-native-reanimated';
import loadFonts from '../../components/LoadFonts';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
interface Props {
  navigation: any;
}

const SignUp: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  useEffect(() => {
    loadFonts();
    }, []);

    const [loaded] = useFonts({
      Poppins_400Regular,
      Poppins_700Bold,
    });
    if (!loaded) {
      return null;
    }
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <View style={styles.container}>
      {!pendingVerification && (
        <>
      <Text style={styles.headerTxt}>WELCOME</Text>
      <Animated.View style={styles.subView} entering={BounceInDown.delay(200).duration(1000)} exiting={BounceInUp.delay(200).duration(1000)}>
        <Text style={styles.subTxt}>Signup</Text>
        <TextInput style={styles.nameInput} label="Username" activeUnderlineColor='#9c0327' />
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
        <TouchableOpacity style={styles.btn} onPress={onSignUpPress}>
          <Text style={styles.btnTxt}>SignUp</Text>
        </TouchableOpacity>
        <View style={styles.endView}>
          <Text style={styles.endTxt}>Already have an account?</Text>
          <TouchableOpacity
            style={styles.endBtn}
            onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.loginTxt}>Login</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      </>
      )}
      {pendingVerification && (
        <>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 5,
              marginBottom: 10,
            }}
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <Button 
            title="Verify Email"
            onPress={onPressVerify}
             />
        </>
      )}
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
    backgroundColor:'#F3E0E4',
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

export default SignUp;