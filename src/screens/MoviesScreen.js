import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import tmdb from '../api/tmdb';
import SearchResult from '../components/SearchResult';
import Filter from '../components/Filter';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/general';

function MoviesScreen({ navigation }) {
    const [text, setText] = useState('');
    const [results, setResults] = useState([]);
    const [infoType, setInfoType] = useState('');

    const imgPath = 'https://image.tmdb.org/t/p/w500';

    useEffect(() => {
        //executa o effect a cada atualização de tela 
        //coloca uma busca padrao - multi pesquisa as 3 categorias
        searchTmdb('shrek', 'movie');
        //array vazio executa somente na primeia execução
    }, []);

    //endpoint é o parametro para definir qual o tipo de busca
    async function searchTmdb(query, endpoint) {
        try {
            //para onde vai a rewuisiçao
            //await para esperar a chamada - função assincrona
            const response = await tmdb.get(`/search/${endpoint}`, {
                params: {
                    query,
                    include_adult: false
                }
            });
            //coloca results em uma array estado de resultados
            //console.log(response.data.results);
            setInfoType(endpoint);

            setResults(response.data.results);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <SafeAreaView style={styles.containerBack}>
            <SearchBar
                onChangeText={(t) => setText(t)}
                onEndEditing={(t) => searchTmdb(t, 'movie')}
                value={text}
            />
            <FlatList
                data={results}
                //função que retira identificador de cada item
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => {
                    return (
                        //para cada item da array, renderiza apenas titulo original  
                        //TouchableOpacity torna o objeto clicável
                        //parametros do TouchableOpacity definem oque será feito quando clicado
                        //informação de id esta sendo passada para outra tela
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Details", {
                                id: item.id,
                                type: infoType
                            }
                            )}
                        >
                            <SearchResult
                                texto={item.original_title || item.original_name || item.name}
                                imagem={`${imgPath}${item.poster_path}`}
                            />

                        </TouchableOpacity>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default MoviesScreen;