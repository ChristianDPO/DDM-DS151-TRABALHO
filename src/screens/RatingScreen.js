import React, { useContext, useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchResult from '../components/SearchResult';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/general';

import { AuthContext } from '../context/AuthContext';

import tmdb from '../api/tmdb';

function RatingScreen({ navigation }) {
    
    const [favoriteMovies, setfavoriteMovies] = useState([]);
    const { authState } = useContext(AuthContext);

    const imgPath = 'https://image.tmdb.org/t/p/original';

    //recarrega as informacoes do filme
    function refresh(){
        getFavoriteMovies();
    }

    //pega a lista de filmes favoritados pelo usuario
    async function getFavoriteMovies(){
        const response = await tmdb.get(`/account/${authState.session_id}/favorite/movies`, {
            params: {
                session_id: authState.session_id
            }
        });
        //console.log(response);
        setfavoriteMovies(response.data.results);
    }

    useEffect( async () => {
        await getFavoriteMovies();
    }, []);

    return (
        <SafeAreaView style={styles.containerBack}>
            <Text style={styles.textTitle2}>Filme Favoritos</Text>
            <View style={styles.iconContainer2}>
                <Icon.Button
                    name="refresh"
                    size={35}
                    backgroundColor="black"
                    onPress={() => { refresh() }} >
                    Atualizar
                </Icon.Button>
            </View>
            <FlatList
                data={favoriteMovies}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate("Details", { id: item.id })}>
                            <SearchResult
                                texto={item.original_title || item.original_name || item.name}
                                imagem={`${imgPath}${item.poster_path || item.profile_path}`}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default RatingScreen;