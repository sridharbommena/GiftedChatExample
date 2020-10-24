
import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function SplashScreen({navigation}) {


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#264653" />
      <View style={styles.header}>
        <Animatable.Image
        duration = {2000}
        animation= "bounceIn"
        source = {require('../assets/Letschat.png') }
       resizeMode = "contain"
          style={styles.logo}
        />
      </View>
      <Animatable.View 
      animation = "fadeInUpBig"
      duration = {1500}
      style={styles.footer}
      >
      <Text style={styles.title} >Stay connected with everyone!</Text>
      <Text style={styles.note} >Sign In to get connected</Text>
      <TouchableOpacity 
      style={styles.sideBtn}
      onPress={()=>navigation.navigate("Login")}
      >
      <LinearGradient 
        colors = {["#1e88e5", "#1976d2"]}
        style = {styles.btn}

      >
        <Text 
        style={{color:"white" , fontWeight :"bold" , fontSize : 18 , left : 5 }}
        >Get Started </Text>
        <MaterialIcons name="navigate-next" size={25} color="white" />
      </LinearGradient>

      </TouchableOpacity>

      </Animatable.View>
    </View>
  );
}

const {height , width } = Dimensions.get("screen");
const logo_height = 350;
const logo_width = 350 ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#264653'
  },
  header :
  {
    flex : 2 ,
    alignItems : "center",
    justifyContent : "center"
  },
  footer :
  {
    flex : 1,
    backgroundColor : "white",
    borderTopLeftRadius : 35 ,
    borderTopRightRadius : 35,
    paddingHorizontal : 30,
    paddingVertical : 40
  },
  logo :
  {
    flex : 0,
    width : logo_width ,
    height : logo_height 
  },
  title :
  {
    flex : 1,
    color : "#264653",
    fontWeight : "bold",
    fontSize : 33
  },
  note :
  {
    fontSize : 17 ,
    fontWeight : "bold",
    top : 5,
    color : "#264653"
  },
  btn :
  {
    flex : 0 ,
    width : 150,
    height : 55 ,
    justifyContent : "center",
    alignItems : "center" ,
    borderRadius : 50 ,
    flexDirection : "row"
  },
  sideBtn :
  {
    alignItems : "flex-end",
    marginTop : 30
  }
});
