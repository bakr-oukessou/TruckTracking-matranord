import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import React from 'react';
import { Props, Text } from "react-native-paper";
import { css } from '@emotion/native';


const Mainscreen= () =>{
    return(
        <ImageBackground source={require('../../assets/background7.jpg')} style={imagestyles.bgimage}>
            <View style={imagestyles.view}>
                <Image source={require('../../assets/Logo-png-8.png')} style={imagestyles.image}/>
                <View style={imagestyles.buttons}>
                    <TouchableOpacity style={imagestyles.buttonStyle} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={textStyle}>SignUp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={imagestyles.buttonStyle}>
                        <Text style={textStyle}>SignIn</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
};

const imagestyles = StyleSheet.create({
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
        top:350,
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
  });
  const textStyle = css`
  font-size: 24px;
  padding-top:5px;  
  font-family:'Poppins-Bold';
  text-align: center;
  color:rgba(150, 10, 44, 1);
`;
export default Mainscreen;