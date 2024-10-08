import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import React from 'react';
import { Props, Text } from "react-native-paper";
import { css } from '@emotion/native';
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";
import { AnimatedView } from "react-native-reanimated/lib/typescript/reanimated2/component/View";
import Animated, { FadeInUp } from "react-native-reanimated";

type WelcomeRouteProp = RouteProp<RootStackParamList, 'Welcome'>;
type WelcomeNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type WelcomeProps = {
  navigation: WelcomeNavigationProp;
  route: WelcomeRouteProp;
};

const Welcome:React.FC<WelcomeProps> = ({ navigation }) =>{
      console.log('Rendering Welcome page');
    return(
        <ImageBackground source={require('../../assets/background9.jpg')} style={styles.bgimage}>
            <View style={styles.view}>
                <Image source={require('../../assets/Logo-png-1.png')} style={styles.image}/>
                <Image source={require('../../assets/welcome_text.png')} style={styles.image2}/>
                <Text style={styles.text}>
                    to your trusted partner in Tracking, transit and consulting services.
                </Text>
                <Animated.View style={styles.buttons} entering={FadeInUp.delay(200).duration(1000)}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={textStyle}>SignUp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('SignIn')}>
                        <Text style={textStyle}>SignIn</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </ImageBackground>
    )
    
};

const styles = StyleSheet.create({
    image:{
      marginTop:100,
      alignSelf:'center',
      resizeMode:'contain',
      height:130,
    },
    bgimage:{
        objectFit:'fill',
        height:'100%',
        //   borderRadius: 12,
        overflow: 'hidden',
    },
    view:{
        flex:1,
        // justifyContent:'center',
        backgroundColor: 'rgba(150, 10, 44, 0.4)',
    },
    buttons:{
        top:30,
    },
    buttonStyle:{
        marginHorizontal:20,
        marginTop:15,
        alignItems:'center',
        justifyContent:'center',
        height:60,
        borderRadius:20,
        borderWidth:2,
        borderColor:'black',
        // backgroundColor: 'rgba(255, 98, 98, 0.3)',
        backgroundColor:'#FFCFCF'
    },
    image2:{
        marginTop:180,
        alignSelf:'center',
        objectFit:'cover',
        height:100,
        width:300,
    },
    text:{
        fontSize:17,
        fontFamily:'Poppins-Regular',
        color:'white',
        textAlign:'center',
        // marginTop:20,
        // width:300
    }
});
  const textStyle = css`
  font-size: 24px;
  padding-top:5px;  
  font-family:'Poppins-Bold';
  text-align: center;
  color:rgba(150, 10, 44, 1);
`;
export default Welcome;