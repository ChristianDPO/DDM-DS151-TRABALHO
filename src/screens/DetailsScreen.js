import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import tmdb from '../api/tmdb';

const DetailsScreen = ({ navigation, route }) => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    getInfo(route.params.id, route.params.type);
  }, []);
  
  async function getInfo(id, endpoint) {
    try {
      //para onde vai a requisição
      //await para esperar a chamada - função assincrona
      const response = await tmdb.get(`/${endpoint}/${id}`, {
        params: {
          include_adult: false
        }
      });

      //coloca results em uma array estado de resultados
      setInfo(response.data);
    }
    catch (err) {
      console.log(err);
    }

  }
  return (
    //flex para a lista nao ocupar a tela inteira <> = //<View style={{flex:1}}>
    //id sempre ser[a vsivel na tela 
    <>
      <Text style={{fontSize:20}}>{info.original_title || info.name || info.original_name}</Text>
      <Text style={{fontSize:20}}>{info.release_date || info.birthday || info.first_air_date}</Text>
    </>
  )
}

const styles = StyleSheet.create({});

export default DetailsScreen;
