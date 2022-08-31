import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

function LoginScreen({navigation}){
    return(
        <View>
            <Text>LoginScreen</Text>
            <Button
                title='Login'
                onPress={() => navigation.navigate("Home")}
            />
        </View>
    )
}

export default LoginScreen;