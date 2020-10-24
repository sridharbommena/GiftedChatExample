import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View  , StatusBar, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { ListItem, Avatar, BottomSheet, Header } from 'react-native-elements'
import {firebase} from '../config/firebase'
import { AuthContext } from '../config/AuthContext'
import { Entypo } from '@expo/vector-icons';


const db = firebase.database();

const List = ({navigation}) => {

    const { signOut } = useContext(AuthContext);


    const [ list , setList ] = useState([
            
            {
                about : "default about status",
                dp : "https://180dc.org/wp-content/uploads/2017/11/profile-placeholder.png" ,
                username: "default user",
            },
           

    ]);

    const [isVisible, setIsVisible] = useState(false);
    const items = [
    { 
        title: 'Log Out',
        onPress:  signOut ,
    
    },
    {
        title: 'Cancel',
        containerStyle: { backgroundColor: 'red' ,   },
        titleStyle: { color: 'white' },
        onPress: () => setIsVisible(false),
    },
    ];

    useEffect(() => {
        const uid = firebase.auth().currentUser.uid;
        db.ref("/users").on("value",(snapshot)=>{
            const Innerlist = [];
            snapshot.forEach((child)=>{
                if(child.key!= uid )
                {
                    Innerlist.push({
                        about : child.val().about,
                        dp : child.val().dp ,
                        username : child.val().username ,
                        uid : child.key 
                    });
                }
            });
            setList(Innerlist);
         });

    }, [])


    const handleClick = (id , dpUrl , name) =>
    {
        const uid = firebase.auth().currentUser.uid;

     navigation.navigate("Chat" , { friendId : id , myId : uid , dp : dpUrl , username : name });   
    }

    const leftComponent = ()=>
    {
        return(
            <View style={{width : 200}} >
                <Text
            style={{fontWeight: "bold" , fontSize : 23 , color : "white" }}
            >Let's Chat</Text>
            </View>
        );
    }

    const rightComponent = () =>
    {
        return(
            <TouchableOpacity onPress={()=>setIsVisible(true)} >
                <Entypo name="dots-three-vertical" size={20} color="white" />
            </TouchableOpacity>
        );
    }

    return (
    <>
    <Header 
    leftComponent={leftComponent}
    rightComponent={rightComponent}
    containerStyle={{ borderBottomColor : "grey" ,backgroundColor: "#264653" , borderBottomWidth : 0.5 } }
    />
    
        <ScrollView>
    {
      list.map((l, i) => (
      <ListItem key={i} bottomDivider onPress={()=>handleClick(l.uid , l.dp , l.username )} >
       <Avatar rounded size="medium" source={{uri: l.dp }} />
        <ListItem.Content>
          <ListItem.Title>{l.username}</ListItem.Title>
          <ListItem.Subtitle>{l.about}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
        ))
    }


    <BottomSheet isVisible={isVisible} >
    {
        items.map((l, i) => (
        <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
        <ListItem.Content>
            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
        </ListItem.Content>
        </ListItem>
    ))
    }
    </BottomSheet>


    </ScrollView>
    </>
    )
}

export default List

const styles = StyleSheet.create({

    container : 
    {
        flex : 1 ,
        backgroundColor : "white" ,
    },
    item :
    {
        backgroundColor : "red"
    }
})
