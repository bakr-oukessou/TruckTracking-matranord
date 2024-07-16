import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import React from 'react';
import { Props, Text } from "react-native-paper";

const Mainscreen= () =>{
    return(
        <View>
            <ImageBackground source={require('../../assets/pngwing.com.png')}/>
            <Image source={require('../../assets/Logo-png-1.png')} style={imagestyles.image}/>
            <TouchableOpacity>
                <Text>Click</Text>
            </TouchableOpacity>
        </View>
    )
};

const imagestyles = StyleSheet.create({
    image:{
      margin:30,
      alignSelf:'center',
      objectFit:'contain',
      height:110,
    }
  });

export default Mainscreen;