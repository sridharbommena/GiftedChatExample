import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../config/AuthContext'

const SettingsScreen = () => {

    const { signOut } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logout} onPress={signOut} >
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({

    container :
    {
        flex : 1 ,
        backgroundColor : "white",
    } ,
    logout : 
    {
        backgroundColor : "skyblue" ,
        padding : 15
    }

})
