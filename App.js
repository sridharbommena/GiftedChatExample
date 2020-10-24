import { firebase } from './config/firebase'
import  React, { useState, useEffect, useContext, useMemo, useReducer } from 'react';
import {  View, Text, ActivityIndicator, Alert, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthStackScreen from './AuthStack/AuthStackScreen';
import  { AuthContext } from './config/AuthContext';

import {  Overlay } from 'react-native-elements';
import ChatStack from './UserStack/ChatStack';

const App = () => {

  const db = firebase.database();


    const data = 
  {
    isLoading : true,
    userId : null ,
    username : null
  };

  const [ IndicatorisLoading , setIndicatorisLoading ] = useState(false);
  
  const LoginReducer = (prevState , action) =>
  {
    switch(action.type)
  {
    case "RETRIEVE" : 
    return { 
      ...prevState,
      isLoading : false,
      userId : action.id
    };
    case "LOGIN" : 
    
    return { 
      ...prevState,
      isLoading : false,
      userId : action.id,
      username : action.username
    };
    case "LOGOUT" : 
    return { 
      ...prevState,
      isLoading : false,
      userId : null,
      username : null
    };
    case "REGISTER" : 
    return { 
      ...prevState,
      isLoading : false,
      userId : action.id,
      username : action.username
    };
  }
  }


  const globalMethods = useMemo( () =>({

    signIn : (UserName , password) => {
      
      setIndicatorisLoading(true);

      let userId = null;
      firebase.auth().signInWithEmailAndPassword(UserName, password).
      then( () =>
      {
        setIndicatorisLoading(false);
        dispatch({ type: "LOGIN" ,  id : firebase.auth().currentUser.uid , username : UserName });
      }).catch((error) => {
        setIndicatorisLoading(false);
        Alert.alert("Error",error.message + " Please Start From Begining..",["Ok"]);
      });

    },
    signUp : ( UserName , password ) => {

      setIndicatorisLoading(true);

      let userId = null;
      firebase.auth().createUserWithEmailAndPassword(UserName, password)
      .then( ()=> 
      {
      const uid = firebase.auth().currentUser.uid;
        const root = db.ref("/users/"+uid);
        const details = {
          username : "default user" ,
          dp : "" ,
          about : "default about status" ,
        }

        root.set( details , (error) => {
          if (error) {
              console.log("data is not saved");
          } else {
            console.log("data saved successfully");
          }
        });

      setIndicatorisLoading(false);
         dispatch({ type:"REGISTER" , id : firebase.auth().currentUser.uid , username : UserName })
      })
      .catch( (error) =>
      {
      setIndicatorisLoading(false);
      Alert.alert("Error",error.message + "Please Start Over" ,["Ok"]);
      });
      // dispatch({ type:"REGISTER" , id : userId , username : UserName })
      
    },
    signOut : () => {

      firebase.auth().signOut().then( () =>{
        dispatch({type : "LOGOUT" });
      }).catch(function(error) {
        Alert.alert("Error",error.message,["Ok"]);
      });
            
    }
  }),[]
  );

  const [loginState , dispatch ] = useReducer(LoginReducer , data);

useEffect( ()=>
{
  let userId = null ;
  
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
         userId = user.uid;
         loginState.isLoading = true ;
         dispatch({ type : "RETRIEVE" , id : userId });
        }
	else
	{
	dispatch({ type : "RETRIEVE" , id : null});
	}
  })
	

},[]
);

  if(loginState.isLoading)
  {
    return(
      <View style={{flex:1,alignItems : "center",backgroundColor : "#264653" ,justifyContent :"center"}} >
        <Image
        source = {require('./assets/Letschat.png') }
       resizeMode = "contain"
       style={{width:"96%" , height : "96%"}}
        />
      </View>
    );
  }

  if(IndicatorisLoading)
  {
    return(
      <View style={{flex:1,alignItems : "center",backgroundColor : "#264653" ,justifyContent :"center"}} >
      <Overlay isVisible={IndicatorisLoading} >
       
       <View style={{padding : 20}} >
         <ActivityIndicator 
         animating={IndicatorisLoading}
         color="black"
         size="large"
         />
      <Text style={{fontSize:20 , fontWeight : "bold"}} >Loading...</Text>
       </View>

      </Overlay>
      </View>
      
    );
  }

  

  return (
    <AuthContext.Provider value={globalMethods} >
      <NavigationContainer>
      {
        ( loginState.userId == null) ?
        <AuthStackScreen />
        :
        < ChatStack />
      }
    </NavigationContainer>
    </AuthContext.Provider>
  );
}


export default App;
