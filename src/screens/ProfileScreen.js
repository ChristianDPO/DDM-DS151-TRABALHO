
import React, {useContext, useEffect, useState} from 'react';
import { Text, View, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/general';

import { IMAGES_URL } from '../Constants';

import tmdb from '../api/tmdb';

import { AuthContext } from '../context/AuthContext';

function ProfileScreen({ navigation }) {
    const [profile, setProfile] = useState({});
    const [image_uri, setImageUri] = useState(null);

    const { authState, signOut } = useContext(AuthContext);
    
    async function getProfile(){
        const response = await tmdb.get("/account", {
            params: {
                session_id: authState.session_id
            }
        });
        setProfile(response.data);
        setImageUri(IMAGES_URL + response.data.avatar.tmdb?.avatar_path);
    }
    useEffect( async () => {

        await getProfile();
    }, []);


    return (
        <SafeAreaView style={styles.containerBack}>
            <Text style={styles.textTitle2}>Perfil</Text>
            <View style={styles.container}>
            <Image
                style={styles.imagePerfil}
                source={{ uri: image_uri }}
                />
            </View>
            <View style={styles.containerText}>
                <Text>
                    <Text style={styles.textTitle} >Nome: </Text>
                    <Text style={styles.text}>
                        {profile.name}
                    </Text>
                </Text>
                <Text>
                    <Text style={styles.textTitle} >Nome de Usuário: </Text>
                    <Text style={styles.text}>
                        {profile.username}
                    </Text>
                </Text>
            </View>
            <TouchableOpacity
                    style={profileStyles.button}
                    onPress={() => signOut()}
                >
                    <Text style={profileStyles.textButton}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const profileStyles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        margin: 10,
        padding: 10
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold'
    }
})



export default ProfileScreen;