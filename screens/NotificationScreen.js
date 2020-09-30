import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import posts from "../data/postdata";
import notificationData from "../data/notificationData";

export default class NotificationScreen extends React.Component {

    renderNotification = notification => {
        return (
            <View style={styles.notificationWrapper}>
                <View style={{
                    padding: 16,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Text>{notification.text}</Text>
                    <Ionicons name="ios-close" size={24} color="#73788B"/>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>NOTIFICATIONS</Text>
                </View>

                <FlatList
                    style={styles.feed} data={notificationData}
                    renderItem={({ item }) => this.renderNotification(item)}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold"
    },
    notificationWrapper: {
        backgroundColor: "white",
        marginTop: 12,
        borderRadius: 4,
        elevation: 1,
        marginHorizontal: 12,
    }
});
