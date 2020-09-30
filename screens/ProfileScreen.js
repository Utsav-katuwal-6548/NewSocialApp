import React from "react";
import { FlatList, TouchableOpacity, Image, StyleSheet, Text, View, StatusBar } from "react-native";
import Fire from "../constants/Fire";
import posts from "../data/postdata";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";


export default class ProfileScreen extends React.Component {
    state = {
        user: {}
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

    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <StatusBar hidden />
                <Image source={post.avatar} style={styles.avatar}/>
                <View style={{ flex: 1 }}>
                    <Text style={styles.post}>{post.text} </Text>
                    <Image source={post.image} style={styles.postImage} resizeMode="cover"/>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginTop: 64, alignItems: "center" }}>
                    <View style={styles.avatarContainer}>
                        <Image
                            style={styles.avatarMain}
                            source={
                                this.state.user.avatar
                                    ? { uri: this.state.user.avatar }
                                    : require("../assets/new.png")
                            }
                        />
                    </View>
                    <Text style={styles.nameMain}>{this.state.user.name}</Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.state}>
                        <Text style={styles.statAmount}>21</Text>
                        <Text style={styles.statTitle}>post</Text>
                    </View>
                    <View style={styles.state}>
                        <Text style={styles.statAmount}>200</Text>
                        <Text style={styles.statTitle}>Followers</Text>
                    </View>
                    <View style={styles.state}>
                        <Text style={styles.statAmount}>63</Text>
                        <Text style={styles.statTitle}>Following</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        Fire.shared.signOut();
                    }}
                    title="Log out"
                    style={{backgroundColor: '#0098e3', padding: 12, color: 'white'}}
                >
                    <Text style={{ color: "#FFF", fontWeight: "500", textAlign: "center" }}>LOG OUT</Text>
                </TouchableOpacity>

                <View style={styles.postsContainer}>
                    <FlatList
                        style={styles.feed} data={posts}
                        renderItem={({ item }) => this.renderPost(item)}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>


            </View>
        );

    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarContainer: {
        shadowColor: "#151734",
        shadowRadius: 30,
        shadowOpacity: 0.4
    },
    avatarMain: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    nameMain: {
        marginTop: 24,
        fontSize: 20,
        fontWeight: "600"
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 32

    },
    state: {
        alignItems: "center"
    },
    statAmount: {
        color: "#4F566D",
        fontSize: 18,
        fontWeight: "500",
    },
    statTitle: {
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4
    },
    postsContainer: {
        flex: 1,
        padding: 10,
    },
    postContainer: {
        backgroundColor: 'white',
        borderRadius: 4,
        width: "49%",
        marginRight: 6,
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65",
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#838899"
    },
    postImage: {
        height: 150,
        borderRadius: 5,
        marginVertical: 16,
        width: "100%",
        resizeMode: 'cover'
    }

});
