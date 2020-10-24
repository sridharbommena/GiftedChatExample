
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Alert, Keyboard, StatusBar, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from "../config/AuthContext";


export default function LoginScreen({navigation }) {

    const [data ,setData] = useState(
        {
            email : "",
            password : "",
            isEntered : false ,
            secureTextEntry : true
        }
    );

      const { signIn } = useContext(AuthContext);


    const setCheckLogo = (val) =>
    {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(reg.test(val))
        setData(
            {
                ...data,
                email : val, 
                isEntered : true
            }
        );
        else
        setData(
            {
                ...data,
                email : val ,
                isEntered : false
            }
        );
    }

    const updatePassword = (val) =>
    {
        setData({
            ...data ,
            password : val
        });
    }
    const toggleIcon = () =>
    {
        setData({
            ...data,
            secureTextEntry : !data.secureTextEntry
        });
    }

    const loginUser = (username , password) =>
    {
      if(data.isEntered)
      {
        if(username != "" && password != "" )
        {
          signIn(username , password);
        }
        else
        {
          
          Alert.alert("Error","Please Enter details",["Ok"]);
        }
      }
      else
      {
        Alert.alert("Error","Please Enter Valid Email Address",["Ok"]);
      }

    }




  return (
    <View style={styles.container}>
  
  <TouchableOpacity style={styles.back} onPress={ () => navigation.navigate("SignUp") } >
      <Ionicons name="ios-arrow-forward" size={30} color="white" />
  </TouchableOpacity>


  <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>



    <Animatable.View style={styles.footer}
      animation = "fadeInUpBig"
      duration = {1000}
      >
       <Text style={styles.welcome} >Log in</Text>
          
        <Text style={styles.name} >Email </Text>
        <View style={styles.action} >
          <Ionicons name="ios-mail" size={30} color="black" />
          <TextInput style={styles.textInput} 
          placeholder="E-Mail" 
          autoCapitalize="none" 
          keyboardType="email-address"
          onChangeText = { (value)=> setCheckLogo(value) }
          />
          { data.isEntered ? 
            <Animatable.View animation="bounceIn" duration={1500} >
            <Feather style={{left: 20}}  name="check-circle" size={24} color="green" />
            </Animatable.View>
          : null }

        </View>
        <Text style={styles.name} >Password </Text>
        <View style={styles.action} >
        <Ionicons name="md-key" size={30} color="black" />
          <TextInput style={styles.textInput} 
          placeholder ="Password" 
          secureTextEntry={data.secureTextEntry?true:false}
          onChangeText ={ value => updatePassword(value) }
          />
          
          <TouchableOpacity onPress={toggleIcon } style={{left: 20}}  >
         
            { data.secureTextEntry ?
                <Feather   name="eye-off" size={26} color="black" />
            :
                <Feather   name="eye" size={26} color="black" />
           } 
          </TouchableOpacity>
          
        </View>
        <View>
           <TouchableOpacity style={styles.Btn} onPress={()=>{Keyboard.dismiss() ;loginUser(data.email,data.password); } } >
           <LinearGradient 
            colors = {["#366476", "#3e7287"]}
            style = {styles.btn}
            >
                <Text style={{color: "white",fontSize : 18 , fontWeight : "bold"}} >Sign In</Text>
            </LinearGradient>
           </TouchableOpacity>

           <TouchableOpacity style={styles.SignUpBtn} onPress={()=> navigation.navigate("SignUp")} >
           
                <Text style={{color: "#264653",fontSize : 18 , fontWeight : "bold"}} >Sign Up</Text>
           </TouchableOpacity>
        </View>
          
      </Animatable.View>


    </ScrollView>

    
    </View>
  );
}

const {height , width } = Dimensions.get("screen");


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#264653'
  },
  footer :
  {
    flex : 1 ,
    backgroundColor : "white",
    borderTopLeftRadius : 35 ,
    borderTopRightRadius : 35,
    paddingHorizontal : 30,
    paddingVertical : 25 ,
  },
  welcome :
  {
      color : "black" ,
      fontSize : 40 ,
      fontWeight : "bold",
      alignSelf : "center",
      alignItems : "center",
      justifyContent : "center",
      padding : 20 ,
  },
  name: 
  {
      fontWeight : "bold",
      fontSize : 18,
      paddingTop : 10
  },
  action :
  {
      flexDirection : "row",
      alignItems : "center",
      justifyContent : "center",
  },
  textInput :
  {
      flex : 1 ,
      left : 10 ,
      borderBottomWidth : 0.8,
      borderBottomColor : "grey",
      paddingVertical : 8,
      fontSize : 18,
      paddingLeft : 10,
  },
  btn:
  {
      paddingVertical : 15,
      alignItems : "center",
      justifyContent : "center",
      borderRadius : 15,
      
  },
  Btn :
  {
      top : 35,
      marginHorizontal : 10, 
  },
  SignUpBtn :
  {
    marginTop : 50,
    marginHorizontal : 12, 
    paddingVertical : 15,
    alignItems : "center",
    justifyContent : "center",
    borderRadius : 15,
    borderWidth : 1 ,
    borderColor : "#264653"
  } ,
  back:
  {
    flexDirection : "row-reverse" ,
    padding : 15 ,
    paddingLeft : 25 ,
  },
});
