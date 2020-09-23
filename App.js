import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import{createBottomTabNavigator} from 'react-navigation-tabs'
import { createStackNavigator} from 'react-navigation-stack'
import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import React from 'react'
import{Ionicons} from"@expo/vector-icons";

import MessageScreen from "./screens/MessageScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PostScreen from "./screens/PostScreen";
import NotificationScreen from "./screens/NotificationScreen";

import * as firebase from 'firebase'
import { color } from 'react-native-reanimated'

var firebaseConfig = {
  apiKey: "AIzaSyBnvKh30KPuGrrPFzd33PTYikzrfZYZVYw",
  authDomain: "newsocialapp-ec1e2.firebaseapp.com",
  databaseURL: "https://newsocialapp-ec1e2.firebaseio.com",
  projectId: "newsocialapp-ec1e2",
  storageBucket: "newsocialapp-ec1e2.appspot.com",
  messagingSenderId: "492264735593",
  appId: "1:492264735593:web:9f14334bae9950cafe73f8"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppContainer = createStackNavigator(
  {
   default: createBottomTabNavigator(
      {
        Home:{
          screen:HomeScreen,
          navigationOptions:{
            tabBarIcon:({tintColor})=> <Ionicons name="ios-home" size={24} color={tintColor}/>
          }
    
        },
        Message:{
          screen:MessageScreen,
          navigationOptions:{
            tabBarIcon:({tintColor})=> <Ionicons name="ios-chatboxes" size={24} color={tintColor}/>
          }
    
        },
        Post:{
          screen:PostScreen,
          navigationOptions:{
            tabBarIcon:({tintColor})=> <Ionicons
             name="ios-add-circle" 
             size={48}
              color="#E9446A" 
              style={{
                shadowColor:"#E9446A",
                shadowOffset:{width:0,height:0},
                shadowRadius:10,
                shadowOpacity:0.3
              
              }}/>
          }
    
        },
        Notification:{
          screen:NotificationScreen,
          navigationOptions:{
            tabBarIcon:({tintColor})=> <Ionicons name="ios-alert" size={24} color={tintColor}/>
          }
    
        },
        Profile:{
          screen:ProfileScreen,
          navigationOptions:{
            tabBarIcon:({tintColor})=> <Ionicons name="ios-person" size={24} color={tintColor}/>
          }
    
        }
    
       
      },
      {
        defaultNavigationOptions:{
          tabBarOnPress:({navigation,defaultHandler})=>{
            if(navigation.state.key==="Post"){
              navigation.navigate("postModal")
            }else{
              defaultHandler()
            }
          }
        },
        tabBarOptions:{
          activeTintColor:"#161F3D",
          inactiveTintColor:"#B8BBC4",
          showLabel:false
        },
        initialRouteName:"Profile"
      }
      
   ),
   postModal:{
     screen:PostScreen
   }

  },
  {
    mode:"modal",
    headerMode:"none",
    
  }
);



const AuthStack =createStackNavigator({
  
  Login:LoginScreen,
  Register:RegisterScreen
},
{
  initialRouteName:"Register"
}
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App : AppContainer,
      Auth : AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
);