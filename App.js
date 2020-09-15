import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'
import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

import * as firebase from 'firebase'

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


const AppStack = createStackNavigator({
  Home: HomeScreen
})

const AuthStack =createStackNavigator({
  Login:LoginScreen,
  Register:RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App : AppStack,
      Auth : AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
);