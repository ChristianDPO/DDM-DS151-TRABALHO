import React, { useState, useEffect, useContext } from 'react';
import { Text, Image, View, ScrollView, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RatingContext } from '../context/RatingContext';
import tmdb from '../api/tmdb';
import { PLACEHOLDER_IMAGE_PATH, IMAGES_URL } from '../Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/general';

import { AuthContext } from '../context/AuthContext';


const DetailsScreen = ({ navigation, route }) => {
    const { likedMovies, setLikedMovies } = useContext(RatingContext);
    //Armazena o objedo do filme
    const [movie, setMovie] = useState({});
    const [movieAccountState, setmovieAccountState] = useState({
        favorite: false
    });

    const { authState } = useContext(AuthContext);

    //Recupera o filme da API de filmes
    async function getMovie(id) {
        try {
            const response = await tmdb.get(`/movie/${id}`, { params: {} })
            setMovie(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    //Recupera os detalhes do filme da conta logada (movie account state)
    async function getMovieAccountState(id) {
        try {
            const response = await tmdb.get(`/movie/${id}/account_states`, 
            { 
                params: {
                    session_id: authState.session_id
                } 
            });
            // console.log(response);
            setmovieAccountState(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }


    //Adiciona o filme aos favoritos (favorite = true) ou remove (favorite = false)
    async function favoriteMovie(id, favorite){
        
        try{
            const response = await tmdb.post(`/account/${authState.session_id}/favorite`,
                {
                    media_type: 'movie',
                    media_id: id,
                    favorite: favorite
                },
                {
                    params: {session_id: authState.session_id}
                }
            );
            //console.log(response);
            setmovieAccountState( (oldState) => ({...oldState, favorite: favorite}))
        }
        catch (err) {
            console.log(err);
            return;
        }
    }

    //Inicializa o filme
    useEffect(() => {
        getMovie(route.params.id);
        getMovieAccountState(route.params.id);
    }, []);

    function renderMovie(movie) {

        const backdrop_path = movie.backdrop_path;
        const image_uri = backdrop_path ? IMAGES_URL + backdrop_path : PLACEHOLDER_IMAGE_PATH;

        return (
            <SafeAreaView style={styles.containerBack}>
                <ScrollView>
                    <View style={styles.container}>
                        <Image
                            style={styles.imageMovie}
                            source={{ uri: image_uri ? image_uri : undefined }}
                        />

                        <View style={styles.iconContainer}>
                            <Icon.Button
                                name={movieAccountState.favorite? "star-remove": "star-plus-outline"}
                                title='Gostei'
                                size={35}
                                backgroundColor="black"
                                onPress={() => { favoriteMovie(movie.id, !movieAccountState.favorite) }} >
                            </Icon.Button>
                            {/* <Button color={'#1C1C1C'} title='Gostei' onPress={() => { setLikedMovies(arrayAntiga => [...arrayAntiga, { nome: movie.title, id: movie.id }]) }} /> */}
                        </View>
                    </View>
                    <View style={styles.containerText}>
                        <Text>
                            <Text style={styles.textTitle} >Título: </Text>
                            <Text style={styles.text}>
                                {movie.title}
                            </Text>
                        </Text>
                        <Text>
                            <Text style={styles.textTitle} >Título Original: </Text>
                            <Text style={styles.text}>
                                {movie.original_title}
                            </Text>
                        </Text>
                        <Text>
                            <Text style={styles.textTitle} >Data de lançamento: </Text>
                            <Text style={styles.text}>
                                {movie.release_date}
                            </Text>
                        </Text>
                        <Text>
                            <Text style={styles.textTitle} >Orçamento (dólares): </Text>
                            <Text style={styles.text}>
                                {movie.budget != 0 ? movie.budget : 'sem dados'}
                            </Text>
                        </Text>
                        <Text>
                            <Text style={styles.textTitle} >Rendimento (dólares): </Text>
                            <Text style={styles.text}>
                                {movie.revenue != 0 ? movie.revenue : 'sem dados'}
                            </Text>
                        </Text>
                        <Text>
                            <Text style={styles.textTitle} >Sinopse: </Text>
                            <Text style={styles.text}>
                                {movie.overview}
                            </Text>
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
    return renderMovie(movie);
}

export default DetailsScreen;

