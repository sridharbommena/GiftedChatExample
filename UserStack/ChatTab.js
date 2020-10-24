import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {firebase} from '../config/firebase'
import { Avatar, Header } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';

const ChatTab = ({route , navigation}) => {

  const [messages, setMessages] = useState([]);
  // const [ dp , setDp ] = useState("https://180dc.org/wp-content/uploads/2017/11/profile-placeholder.png");
  // const [ name , setName ] = useState("Default User");

  const { friendId , myId , username , dp } = route.params ;
  const db_path = "/messages/"+myId+"/"+friendId ;
  const friend_db_path = "/messages/"+friendId+"/"+myId ;

  const db = firebase.database();

  const fetchData = useCallback( async()=>
  {
    await db.ref(db_path).limitToLast(20)
    .on('child_added', (snapshot) => {


    const {_id , text , user , createdAt } = snapshot.val()

    if( typeof(_id)!= "undefined" && typeof(text)!="undefined" && typeof(user)!= "undefined" )
    {
      

      const msg = {
        _id ,
        text , 
        createdAt ,
        user 
      }
      
  
      console.log(msg)
      console.log(".....")
  
      setMessages(previousMessages => GiftedChat.append(previousMessages, msg) );
  
      return;

    }
  });

  },[]
  );


  useEffect(() => {

  console.log("..............start.......................");

  fetchData();
 
  console.log(".............end.................");
  

  }, [])



  async function myPush(ele) {
    
   await db.ref(db_path).push( ele , (error) => {
      if (error) {
          console.log("messages not saved");
      } else {
        console.log("messages saved..");
      }
    });
  }

  async function friendPush(ele) {
    await db.ref(friend_db_path).push( ele , (error) => {
      if (error) {
          console.log("messages not saved");
      } else {
        console.log("messages saved..");
      }
    });
  }

  const onSend = useCallback((messages = []) => {
    // setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    messages.forEach(element => {
      const { _id ,text, user } = element;
      const msg = {
        _id,
        text,
        createdAt : firebase.database.ServerValue.TIMESTAMP,
        user
      };
     

      myPush(msg);
      friendPush(msg);
    
    });


  }, [])

  const leftComponent = ()=>
  {
      return(           
            <TouchableOpacity
            style={
              { width : 45 , 
                height : 45 ,
                justifyContent : "center" ,
                alignItems : "center"
              }
            }
            
            onPress={()=>navigation.goBack()} >
            <Ionicons name="md-arrow-round-back" size={31} color="white" />
            </TouchableOpacity>
      
      );
  }

  const rightComponent = () =>
  {
    return(
      <View style={{  }} >
            <Avatar rounded size="small" source={{uri: dp }} />
            </View>
    );
  }

  const centerComponent = () =>
  {
    return(
          <View style={{ marginLeft : 15 }} >
            <Text style={{ fontSize : 25 , color : "white" , fontWeight : "700" }} >{username}</Text>
          </View>
    );
  }

  const loading = ()=>
  {
    return(
      <View style={{flex : 1 , alignItems : "center" , justifyContent : "center"}} >
        <ActivityIndicator 
      size="large"
      animating
      color="black"
      />
      </View>
    );
  }

  return (
    <>
    <Header 
    leftComponent={leftComponent}
    rightComponent={rightComponent}
    centerComponent={centerComponent}
    containerStyle={{ borderBottomColor : "grey" ,backgroundColor: "#264653" , borderBottomWidth : 0.5 } }
    />
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: myId,
      }}
      renderLoading={loading}
      messagesContainerStyle={{backgroundColor : "white"}}
    />
    </>
  )
}

export default ChatTab

const styles = StyleSheet.create({})
