import React from "react";
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Fire from "../constants/Fire";
import { Ionicons } from "@expo/vector-icons";
import UserPermissions from "../utilities/UserPermissions";
import * as ImagePicker from "expo-image-picker";

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };

    state = {
        user: {
            name: "",
            email: "",
            password: "",
            avatar: null
        },
        errorMessage: null
    };
    handelPickAvatar = async () => {
        await UserPermissions.getCameraPermission();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            this.setState({ user: { ...this.state.user, avatar: result.uri } })
        }
    };

    handleSignUp = () => {
        Fire.shared.creatUser(this.state.user);
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden/>
                <View
                    style={{
                        backgroundColor: '#0098e3',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 200
                    }}/>

                <View style={{ position: "absolute", top: 140, alignItems: "center", width: "100%" }}>
                    <Text style={styles.greeting}>
                        {'HELLO\n SIGN UP TO PROCEED'}
                    </Text>
                    <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handelPickAvatar}>
                        <Image source={{ uri: this.state.user.avatar }} style={styles.avatar}/>
                        <Ionicons
                            name="ios-add"
                            size={40}
                            color="#FFF"
                            style={{ marginTop: 5, marginLeft: 2 }}
                        >
                        </Ionicons>
                    </TouchableOpacity>
                </View>

                <View style={styles.errormessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={name => this.setState({
                                user: {
                                    ...this.state.user, name
                                }
                            })}
                            value={this.state.user.name}
                        >
                        </TextInput>
                    </View>
                    <View style={{ marginTop: 32, marginBottom: 32 }}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({
                                user: {
                                    ...this.state.user, email
                                }
                            })}
                            value={this.state.user.email}
                        >
                        </TextInput>
                    </View>

                    <View styles={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({
                                user: {
                                    ...this.state.user, password
                                }
                            })}
                            value={this.state.user.password}
                        >
                        </TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>SIGN UP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 30 }}
                    onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text style={{ color: "#414959", fontSize: 13 }}>Dont have account?
                        <Text style={{ fontWeight: "500", color: "#0098e3" }}>{' Sign in'}</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: -65,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    errormessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
        marginTop: 220,
        marginBottom: 50,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 12,
        textTransform: "uppercase",
        fontWeight: "bold"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 16,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#0098e3",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 4
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50,
    }
});
