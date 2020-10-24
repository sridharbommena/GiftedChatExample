import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../config/AuthContext'
import React, { useState, useCallback, useEffect , useContext} from 'react'
import { GiftedChat , Send  } from 'react-native-gifted-chat'
import { FontAwesome } from '@expo/vector-icons';
import {firebase} from '../config/firebase'
import { AntDesign } from '@expo/vector-icons';


const UserHome = () => {

    const { signOut } = useContext(AuthContext);

    const [messages, setMessages] = useState([]);

    console.log(firebase.auth().currentUser.uid )

    useEffect(() => {
      setMessages([
        {
            _id: 0,
            text: 'New room created.',
            createdAt: new Date().getTime(),
            user: {
                _id: 2,
                name: 'Test User'
              }
          },
          // example of chat message
          {
            _id: 1,
            text: 'Henlo!',
            createdAt: new Date().getTime(),
            user: {
              _id: 2,
              name: 'Test User'
            }
          },
          {
            _id: "868166af-07db-4c49-a2cc-7756b27401bb",
            createdAt : new Date().getTime(),
            text :  "Fffff" ,
            user : { _id: 1, name: 'User Test' }
          },
      ])
    }, []);

    function renderSend(props) {
        return (
          <Send {...props}>
            <View style={styles.sendingContainer}>
            <FontAwesome name="send" size={25} color="black" />
            </View>
          </Send>
        );
      }
  
      function scrollToBottomComponent() {
        return (
          <View style={styles.bottomComponentContainer}>
           <AntDesign name="arrowdown" size={25} color="black" />
          </View>
        );
      }


    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])

      return (
        <GiftedChat
        messagesContainerStyle={{backgroundColor : "white"}}
          messages={messages}
          onSend={messages => onSend(messages)}
          showUserAvatar
          renderSend={renderSend}
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
          user={{ _id: 1, name: 'User Test' }}
        />
      )
}

export default UserHome;

const styles = StyleSheet.create(
{

    logout :
    {
        backgroundColor : "skyblue" ,
        padding : 10 ,
        justifyContent : "center" ,
        alignItems : "center"
    },
    sendingContainer: {
       paddingBottom : 10 ,
       paddingRight : 15 ,
    }

});
