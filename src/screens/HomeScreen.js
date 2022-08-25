import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import tmdb from '../api/tmdb';
import SearchResult from '../components/SearchResult';
import Filter from '../components/Filter';

//reactNavigation tem por padrao, qualquer tela criada com ele possui uma propriedade Navigation
// objeto navigation permtie a navegação
const HomeScreen = ({navigation}) => {
  //text é uma variavel de estado
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);
  const [infoType, setInfoType] = useState('');

  const imgPath = 'https://image.tmdb.org/t/p/original';
  

  useEffect(() => {  
    //executa o effect a cada atualização de tela 
    //coloca uma busca padrao - multi pesquisa as 3 categorias
    searchTmdb('jones', 'multi');
    //array vazio executa somente na primeia execução
  },[]);

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
    //flex para a lista nao ocupar a tela inteira <> = //<View style={{flex:1}}>
    <>
      <SearchBar 
        onChangeText={(t) => setText(t)}
        onEndEditing={(t) => searchTmdb(t, 'multi')}
        value={text}
      />
      <View style={styles.filter}>
        <TouchableOpacity onPress={() => searchTmdb(text, 'movie')}>
          <Filter value="Movies" />
        </TouchableOpacity>        
        <TouchableOpacity onPress={() => searchTmdb(text, 'tv')}>
          <Filter value="TV" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => searchTmdb(text, 'person')}>
          <Filter value="People" />
        </TouchableOpacity>
      </View> 
      <FlatList 
        data={results}
        //função que retira identificador de cada item
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => {
          return(
          //para cada item da array, renderiza apenas titulo original  
          //TouchableOpacity torna o objeto clicável
          //parametros do TouchableOpacity definem oque será feito quando clicado
          //informação de id esta sendo passada para outra tela
          <TouchableOpacity
            onPress={() => navigation.navigate("Details",{
              id: item.id,
              type: infoType
            }
            )}
        > 
            <SearchResult 
              texto={ item.original_title || item.original_name || item.name }
              imagem={`${imgPath}${item.poster_path || item.profile_path}`}
            />

          </TouchableOpacity>
          )
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  filter: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'space-between'
  }
});

export default HomeScreen;
