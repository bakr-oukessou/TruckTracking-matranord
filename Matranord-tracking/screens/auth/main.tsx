import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import React from 'react';
import { Props, Text } from "react-native-paper";

const Mainscreen= () =>{
    return(
        <ImageBackground source={require('../../assets/background7.jpg')} style={imagestyles.bgimage}>
            <View style={imagestyles.view}>
                <Image source={require('../../assets/Logo-png-1.png')} style={imagestyles.image}/>
                <TouchableOpacity>
                    <Text>Click</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
};

const imagestyles = StyleSheet.create({
    image:{
      marginTop:70,
      alignSelf:'center',
      objectFit:'contain',
      height:110,
    },  
    bgimage:{
      objectFit:'fill',
      height:'100%',
      // borderRadius: 12,
      overflow: 'hidden',
    },
    view:{
        flex:1,
        // justifyContent:'center',
        backgroundColor: 'rgba(150, 10, 44, 0.4)',
    }
  });

export default Mainscreen;