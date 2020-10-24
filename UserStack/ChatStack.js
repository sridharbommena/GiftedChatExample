import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import List from './List';
import ChatTab from './ChatTab';

const Stack = createStackNavigator();


const ChatStack = () => {

    return (
        <Stack.Navigator headerMode="none" >
            <Stack.Screen name="ChatList"  component={List} />
            <Stack.Screen name="Chat" component={ChatTab} />
        </Stack.Navigator>
    )
}

export default ChatStack;

const styles = StyleSheet.create({})
