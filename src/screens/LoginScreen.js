import React, {useState, useEffect, useContext} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthContext } from '../context/AuthContext';

function LoginScreen({navigation}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { authState, tryLocalSignIn, signIn } = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignIn();
    },[]);

    return(
            <View style={styles.container}>
                <View>
                    <Image 
                        style={{
                            width:300, 
                            height:250, 
                        }}
                        source={require("../../images/logo.png")} />
                </View>

                <View style={styles.loginInput}>
                    <TextInput style={styles.txtInput}
                        multiline={false}
                        autoCorrect={true}
                        autoCapitalize="none"
                        placeholder="Login"
                        placeholderTextColor="white"
                        onChangeText={(value) => setUsername(value)}
                        value={username}
                    />                
                </View>

                <View style={styles.passInput}>
                    <TextInput style={styles.txtInput}
                        multiline={false}
                        autoCorrect={true}
                        autoCapitalize="none"
                        placeholder="Senha"
                        placeholderTextColor="white"
                        secureTextEntry={true}
                        onChangeText={(value) => setPassword(value)}
                        value={password}
                    />                
                </View>

                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => {
                            signIn(username, password);
                        }}>
                            

                    <Text style={styles.txtBttn}>Entrar</Text>
                    </TouchableOpacity>
                </View>
                {authState.error ? <Text style={styles.txtErr}>{authState.error} </Text> : null}
            </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"black",
    },
    loginInput:{
        fontSize:30,
        height:35,
        width:200,
        borderRadius:5,
        backgroundColor:"darkgrey",
        margin:10,
    },
    passInput:{
        fontSize:30,
        height:35,
        width:200,
        borderRadius:5,
        backgroundColor:"grey",
        margin:10,
    },
    txtInput:{
        fontSize:10,
        padding:10,
        color:"white",
    },
    button:{
        backgroundColor:"black",
        borderWidth: 2,
        borderColor: "white",
        height:35,
        width:200,
        margin:10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius:5,
        boxShadow: "0 0 1em gray",
    },
    txtBttn:{
        fontSize:12,
        fontWeight:"bold",
        color:"white",
        padding:5,
        paddingBottom:10,
    },
    txtErr:{
        fontSize:12,
        color:"red",
        justifyContent: "center",
        textAlignVertical:"bottom",
    }
});


export default LoginScreen;