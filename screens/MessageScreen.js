import React from "react";
import{View,Text,StyleSheet, Button, Image, StatusBar,TouchableOpacity} from "react-native";

import  Fire from "../Fire";



export default class MessageScreen extends React.Component{

    

    state={
        user:{},
        name:""
    };

    continue =()=>{
        this.props.navigation.navigate("Chat",{name:this.state.name});

    };



    componentDidMount(){
        const user = this.props.uid || Fire.shared.uid

        this.unsubscribe= Fire.shared.firestore
        .collection("users")
        .doc(user)
        .onSnapshot(doc => {
            this.setState({user: doc.data() });

        });

    }
    

render(){
return(
    <View style={styles.container}>
        <View style={{marginTop:64,alignItems:"center"}}>
            <Text style={styles.headerTitle}>ChatList</Text>

            </View>
            <TouchableOpacity
            onPress={this.continue}
           
             style={{padding:10, borderBottomColor:"#ccc",borderBottomWidth:1}}>
            <Text style ={styles.name}>{this.state.user.name}</Text>

            </TouchableOpacity>
            
            
       
       
        

    </View>
);

}

}
const styles= StyleSheet.create({
    container:{

        flex:1,
      
    },
    headerTitle:{
        fontSize:30,
        fontWeight:"500",
        
     
    },
    
    name:{
        marginTop:24,
        fontSize:20,
        fontWeight:"600"
    },
    
    
   
    statTitle:{
        
        fontSize:12,
        fontWeight:"500",
        marginTop:4
    }
   
});