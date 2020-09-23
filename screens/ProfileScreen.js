import React from "react";
import{View,Text,StyleSheet, Button, Image, StatusBar} from "react-native";
import  Fire from "../Fire";


export default class ProfileScreen extends React.Component{

    state={
        user:{}
    };


    unsubscribe =null;

    componentDidMount(){
        const user = this.props.uid || Fire.shared.uid

        this.unsubscribe= Fire.shared.firestore
        .collection("users")
        .doc(user)
        .onSnapshot(doc => {
            this.setState({user: doc.data() });

        });

    }
    componentWillUnmount(){

        this.unsubscribe();
    }

render(){
return(
    <View style={styles.container}>
        <View style={{marginTop:64,alignItems:"center"}}>
            <View  style={styles.avatarContainer}>
                <Image style={styles.avatar} source={ this.state.user.avatar
                     ? { uri: this.state.user.avatar} :require("../assets/new.png")
                     }
                     /> 

            </View>
            <Text style ={styles.name}>{this.state.user.name}</Text>
        </View>
        <View style={styles.statsContainer}>
            <View style={styles.state}>
                <Text style={styles.statAmount}>21</Text>
                <Text style={styles.statTitle}>post</Text>
            </View>
            <View style={styles.state}>
                <Text style={styles.statAmount}>200</Text>
                <Text style={styles.statTitle}>Followere</Text>
            </View>
            <View style={styles.state}>
                <Text style={styles.statAmount}>63</Text>
                <Text style={styles.statTitle}>Following</Text>
            </View>
        </View>
        <Button onPress={()=>{Fire.shared.signOut()}} title="Log out"/>

    </View>
);

}

}
const styles= StyleSheet.create({
    container:{

        flex:1,
      
    },
    avatarContainer:{
        shadowColor:"#151734",
        shadowRadius: 30,
        shadowOpacity:0.4
    },
    avatar:{
        width: 136,
        height: 136,
        borderRadius:68
    },
    name:{
        marginTop:24,
        fontSize:20,
        fontWeight:"600"
    },
    statsContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        margin:32
        
    },
    state:{
        alignItems:"center"
    }, 
    statAmount:{
        color:"#4F566D",
        fontSize:18,
        fontWeight:"500",

    },
    statTitle:{
        
        fontSize:12,
        fontWeight:"500",
        marginTop:4
    }
   
});