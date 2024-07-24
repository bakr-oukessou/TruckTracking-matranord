import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Button, TextInput, Image, ImageBackground } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import Animated, { BounceIn, BounceInDown, BounceInUp } from 'react-native-reanimated';
import loadFonts from '../../components/LoadFonts';
import type { TextInput as RNPTextInput } from 'react-native-paper';
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

  const [verificationCode, setVerificationCode] = useState(['', '', '', '','','']);
  const inputRefs = useRef<Array<TextInput | null>>([]);


  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...verificationCode];
    newCode[index] = text;
    setVerificationCode(newCode);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

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
      const fullCode = verificationCode.join('');
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: fullCode,
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
    <ImageBackground source={require('../../assets/background3.jpg')} style={styles.bgimage}>
    <View style={styles.container}>
      {!pendingVerification && (
        <>
      <Text style={styles.headerTxt}>WELCOME TO </Text>
      <Image source={require('../../assets/Logo-png-1.png')} style={imagestyles.image}/>
      <Animated.View style={styles.subView} entering={BounceInDown.delay(200).duration(1000)}>
        <Text style={styles.subTxt}>Signup</Text>
        <PaperTextInput
         style={styles.nameInput}
         label="Username" 
         activeUnderlineColor='#9c0327'
        />
        <PaperTextInput
          autoCapitalize="none"
          value={emailAddress}
          style={styles.nameInput}
          label="Email"
          activeUnderlineColor='#9c0327'
          onChangeText={(email) => setEmailAddress(email)}
        />
        <PaperTextInput
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
          <View style={styles.verificationContainer}>
          <Text style={styles.verificationTitle}>Verify Code</Text>
          <Text style={styles.verificationSubtitle}>
            Please check your Email and{'\n'}enter verification code we just send you
          </Text>
          <Text style={styles.phoneNumber}>{emailAddress}</Text>

          <View style={styles.codeContainer}>
            {verificationCode.map((digit, index) => (
              <PaperTextInput
                key={index}
                ref={(ref: any) => {
                  if (ref) {
                    inputRefs.current[index] = ref;
                  }
                }}
                style={[styles.codeInput, index === 0 && styles.activeCodeInput]}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
                mode="outlined"
                dense
              />
            ))}
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={onPressVerify}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        </>
      )}
    </View>
    </ImageBackground>
  );
};

const imagestyles = StyleSheet.create({
  image:{
    marginTop:110,
    alignSelf:'center',
    objectFit:'contain',
    height:120,
  }
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(200, 0, 54, 0.3)',
    height: 'auto',
  },
  subView: {
    backgroundColor: 'white',
    height: 630,
    width:340,
    marginTop: 40,
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
    color: '#FFCFCF ',
    position: 'absolute',
    marginTop: 50,
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
  verificationContainer: {
    // flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop:200
  },
  verificationTitle: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Poppins_700Bold',
  },
  verificationSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
  phoneNumber: {
    fontSize: 14,
    marginBottom: 20,
    fontFamily: 'Poppins_700Bold',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    fontSize: 24,
    textAlign: 'center',
  },
  activeCodeInput: {
    borderColor: '#9c0327',
    borderWidth: 2,
  },
  submitButton: {
    backgroundColor: '#9c0327',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '80%',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins_700Bold',
  },  
  bgimage:{
    objectFit:'fill',
    height:'100%',
  //   borderRadius: 12,
    overflow: 'hidden',
  },
});

export default SignUp;