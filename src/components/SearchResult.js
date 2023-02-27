import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native'; 

const SearchResult = ({texto, imagem}) => {
  return(
    <View style={styles.container}>
        <Image
            source={{uri: imagem}}
            style={styles.imagem}
        />
        <Text style={styles.texto}>{ texto }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row', 
    alignItems:"center", 
    margin: 3, 
    borderWidth: 1, 
    borderRadius: 10,
    borderColor: '#363636'
  },
  imagem: {
    width: 80, 
    height: 80,
    margin: 5,
    borderRadius: 10
  },
  texto: {
    fontSize: 15, 
    marginLeft: 5,
    color: 'white'
  }
});

export default SearchResult;
