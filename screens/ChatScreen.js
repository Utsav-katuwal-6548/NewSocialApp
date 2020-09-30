import React from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../constants/Fire";

export default class ChatScreen extends React.Component {
    state = {
        messages: [],
    };

    get user() {
        return {
            _id: Fire.shared.uid,
            name: this.props.navigation.state.params.name
        };
    }

    componentDidMount() {
        //Fire.shared.get(message=>
            //this.setState(previousState=>({
                //messages:GiftedChat.append(previousState.messages,message)
            //})
            //)
            //);
    }

    componentWillUnmount() {
        Fire.shared.off();


    }

    render() {
        return(
            <GiftedChat
            messages={this.state.messages}
            onSend={Fire.shared.send}
            user={this.user}
            />
        );

        

    }


}



