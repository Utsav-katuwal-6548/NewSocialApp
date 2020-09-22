import React from "react";
import{View, Text, StyleSheet, TextInput, TouchableOpacity,Image,StatusBar,} from "react-native";
import * as firebase from "firebase";

export default class RegisterScreen extends React.Component{
    static navigationOptions={
        
        headerShown: false
    };


    state={
        name:"",

        email:"",
        password:"",
        errorMessage: null
    };

    handleSignUp=()=>{
        firebase.auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(userCredentials =>{
            return userCredentials.user.updateProfile({
                displayName:this.state.name
            });
        })
        .catch(error => this.setState({errorMessage: error.message}));

    };
    
    render(){
        return(
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <Image source={require("../assets/header1.png")} style={{marginTop:-250, marginLeft: -50}} ></Image>
                <Image source={require("../assets/header1.png")} style={{position:"absolute", bottom:-325, right: -225}} ></Image>
                
                <Text style={styles.greeting}>
                    {'Hello .\n Sign up to start'}
                </Text>

                <View style={styles.errormessage}>
        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}

                </View>
                
                <View style={styles.form}>
                <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput style={styles.input} autoCapitalize="none" 
                        onChangeText={name=> this.setState({name})}
                        value={this.state.nepal}>

                        </TextInput>
                    </View>
                    <View style={{marginTop:32}}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput style={styles.input} autoCapitalize="none" 
                        onChangeText={email=> this.setState({email})}
                        value={this.state.email}>

                        </TextInput>
                    </View>

                    <View styles={{marginTop:32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput style={styles.input} secureTextEntry autoCapitalize="none"
                        onChangeText={password=> this.setState({password})}
                        value={this.state.password} >

                        </TextInput>
                    </View>

                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{color:"#FFF", fontWeight:"500"}}>SIGN UP</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf:"center", marginTop:30}} onPress={()=>this.props.navigation.navigate("Login")}>
                    <Text style={{color:"#414959", fontSize:13}}>Dont have account?

                        <Text style={{fontWeight:"500", color:"#E9446A"}}>Sing In</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }




}
const styles= StyleSheet.create({
    container:{
        flex: 1,
       

    }, 
    greeting:{
        marginTop: -65,
        fontSize: 18,
        fontWeight:"400",
        textAlign:"center"
    },
    errormessage:{
        height:72,
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:30
    },
    error:{
        color:"#E9446A",
        fontSize:13,
        fontWeight:"600",
        textAlign:"center"

    },
    form:{
        marginBottom:50,
        marginHorizontal:30
    },
    inputTitle:{
        color:"#8A8F9E",
        fontSize:10,
        textTransform:"uppercase"
    },
    input:{
        borderBottomColor:"#8A8F9E",
        borderBottomWidth:StyleSheet.hairlineWidth,
        height:40,
        fontSize: 15,
        color:"#161F3D"
    },
    button:{
        marginHorizontal:30,
        backgroundColor:"#E9446A",
        borderRadius:4,
        height:52,
        alignItems:"center",
        justifyContent:"center"
    }


});