import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import React from 'react';
import { Props, Text } from "react-native-paper";
import { css } from '@emotion/native';
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/types";

type MainScreenRouteProp = RouteProp<RootStackParamList, 'MainScreen'>;
type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainScreen'>;

type MainScreenProps = {
  navigation: MainScreenNavigationProp;
  route: MainScreenRouteProp;
};

const Mainscreen:React.FC<MainScreenProps> = ({ navigation }) =>{
    return(
        <ImageBackground source={require('../../assets/background6.jpg')} style={styles.bgimage}>
            <View style={styles.view}>
                <Image source={require('../../assets/Logo-png-8.png')} style={styles.image}/>
                <Text style={styles.text}>
                    Welcome to
                    your trusted partner in transit, Tracking and consulting services.
                </Text>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={textStyle}>SignUp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('SignIn')}>
                        <Text style={textStyle}>SignIn</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    image:{
      marginTop:100,
      alignSelf:'center',
      objectFit:'contain',
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
        top:250,
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
    text:{
        fontSize:20,
        fontFamily:'Poppins-Regular',
        color:'white',
        textAlign:'center',
        marginTop:20,
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
export default Mainscreen;