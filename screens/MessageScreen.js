import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Fire from "../constants/Fire";

export default class MessageScreen extends React.Component {

    /**
     * State Init
     * @type {{name: string, user: {}}}
     */
    state = {
        user: {},
        name: ""
    };

    continue = () => {
        this.props.navigation.navigate("Chat", { name: this.state.name });
    };
    unsubscribe = null;

    componentDidMount() {
        const user = this.props.uid || Fire.shared.uid
        this.unsubscribe = Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot(doc => {
                this.setState({ user: doc.data() });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    /**
     * Return Messages Screen
     * @returns {*}
     */
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar hidden />
                <View style={{ marginTop: 54, alignItems: "center" }}>
                    <Text style={styles.headerTitle}>CHAT LIST</Text>
                </View>
                <TouchableOpacity
                    onPress={this.continue}
                    style={{ padding: 10, borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                    <Text style={styles.name}>{this.state.user.name}</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

/**
 * Styles for Messages Screen
 * @type {{}}
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: "500",
    },
    name: {
        marginTop: 24,
        fontSize: 20,
        fontWeight: "600"
    },
    statTitle: {
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4
    }
});
