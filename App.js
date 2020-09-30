import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";

import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import MessageScreen from "./screens/MessageScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PostScreen from "./screens/PostScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ChatScreen from './screens/ChatScreen';

import * as firebase from 'firebase'
import { firebaseConfig } from "./constants/Fire";

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

/**
 * App Container
 * @type {import("react-navigation").NavigationNavigator<any, import("react-navigation").NavigationProp<import("react-navigation").NavigationState>>}
 */
const AppContainer = createStackNavigator(
    {
        default: createBottomTabNavigator(
            {
                Home: {
                    screen: HomeScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) =>
                            <Ionicons name="ios-home" size={24} color={tintColor}/>
                    }
                },
                Message: {
                    screen: MessageScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) =>
                            <Ionicons name="ios-chatboxes" size={24} color={tintColor}/>
                    }
                },
                Post: {
                    screen: PostScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) =>
                            <Ionicons
                                name="ios-add-circle"
                                size={48}
                                color="#0098e3"
                                style={{
                                    shadowColor: "#0098e3",
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowRadius: 10,
                                    shadowOpacity: 0.3
                                }}
                            />
                    }
                },
                Notification: {
                    screen: NotificationScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) =>
                            <Ionicons name="ios-alert" size={24} color={tintColor}/>
                    }
                },
                Profile: {
                    screen: ProfileScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) =>
                            <Ionicons name="ios-person" size={24} color={tintColor}/>
                    }
                }
            },
            {
                defaultNavigationOptions: {
                    tabBarOnPress: ({ navigation, defaultHandler }) => {
                        if (navigation.state.key === "Post") {
                            navigation.navigate("postModal")
                        } else {
                            defaultHandler()
                        }
                    }
                },
                tabBarOptions: {
                    activeTintColor: "#0098e3",
                    inactiveTintColor: "#B8BBC4",
                    showLabel: false
                },
                initialRouteName: "Profile"
            }
        ),
        postModal: {
            screen: PostScreen
        }

    },
    {
        mode: "modal",
        headerMode: "none",
    }
);

const AuthStack = createStackNavigator(
    {
        Login: LoginScreen,
        Register: RegisterScreen,
        Chat: ChatScreen
    },
    {
        initialRouteName: "Register"
    }
);

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            App: AppContainer,
            Auth: AuthStack
        },
        {
            initialRouteName: "Loading"
        }
    )
);
