import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';

import tmdb from '../api/tmdb';
import { PLACEHOLDER_IMAGE_PATH, IMAGES_URL } from '../Constants';

//Pegar rating/favoritos/watchlist
//https://developers.themoviedb.org/3/movies/get-movie-account-states

//Postar rating
//https://developers.themoviedb.org/3/movies/rate-movie

const DetailsScreen = ({ navigation, route }) => {
    
    //Armazena o objedo do filme
    const [movie, setMovie] = useState({});

    //Recupera o filme da API de filmes
    async function getMovie(id) {
        try{
            const response = await tmdb.get(`/movie/${id}`, {params: {}})
            setMovie(response.data);
        }
        catch(err){
            console.log(err);
        }
    }

    //Inicializa o filme
    useEffect(() => {

        getMovie(route.params.id);

    }, []);
  

    function renderMovie(movie){

        const backdrop_path = movie.backdrop_path;
        const image_uri = backdrop_path? IMAGES_URL + backdrop_path : PLACEHOLDER_IMAGE_PATH;

        return (
            <View style={styles.container}>
            <Image
                style={styles.imageMovie}
                source={{uri: image_uri}}
            />
            <Text>
                <Text style={{fontWeight: "bold"}} >Título: </Text> 
                {movie.title}
            </Text>
            <Text>
                <Text style={{fontWeight: "bold"}} >Título Original: </Text> 
                {movie.original_title}
            </Text>
            <Text>
                <Text style={{fontWeight: "bold"}} >Data de lançamento: </Text> 
                {movie.release_date}
            </Text>
            <Text>
                <Text style={{fontWeight: "bold"}} >Orçamento (dólares): </Text> 
                {movie.budget != 0?  movie.budget : 'sem dados'}
            </Text>
            <Text>
                <Text style={{fontWeight: "bold"}} >Rendimento (dólares): </Text> 
                {movie.revenue != 0?  movie.revenue : 'sem dados'}
            </Text>
            <Text>
                <Text style={{fontWeight: "bold"}} >Sinopse: </Text> 
                {movie.overview}
            </Text>
            </View>
        )
    }

  return renderMovie(movie);

}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 30,
    margin: 30,
  },
  imageMovie: {
    width: 300,
    height: 300
  }
});

export default DetailsScreen;

