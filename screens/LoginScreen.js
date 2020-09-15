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

                    <View styles={{marginTop:32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput style={styles.input} secureTextEntry autoCapitalize="none"></TextInput>
                    </View>

                </View>

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
        marginBottom:48,
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
    }


});