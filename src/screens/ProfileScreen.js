import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

function ProfileScreen({navigation}){
    return(
        <View>
            <Text>ProfileScreen</Text>
            <Button
                title='Logout'
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    )
}

export default ProfileScreen;