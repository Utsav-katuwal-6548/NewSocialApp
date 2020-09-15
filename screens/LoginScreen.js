import React from "react";
import{View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";

export default class LoginScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.greeting}>
                    {'Hello Again.\n welcome back'}
                </Text>
                <View style={styles.errormessage}>
                    <Text>Error</Text>

                </View>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput style={styles.input} autoCapitalize="none"></TextInput>
                    </View>

                    <View styles={{marginTop:30}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput style={styles.input} secureTextEntry autoCapitalize="none"></TextInput>
                    </View>

                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={{color:"#FFF", fontWeight:"500"}}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf:"center", marginTop:30}}>
                    <Text style={{color:"#414959", fontSize:13}}>Dont have account?

                        <Text style={{fontWeight:"500", color:"#E9446A"}}>Sing Up</Text>
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
        marginTop: 32,
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