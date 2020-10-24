import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import  SplashScreen  from './SplashScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';



const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
      <RootStack.Navigator headerMode="none" >
        <RootStack.Screen name="Splash" component={ SplashScreen }  />
        <RootStack.Screen name="Login" component = { LoginScreen } />
        <RootStack.Screen name="SignUp" component = { SignUpScreen } />
      </RootStack.Navigator>
  );
}

export default RootStackScreen;
