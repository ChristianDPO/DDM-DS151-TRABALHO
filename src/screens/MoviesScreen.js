import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

function MoviesScreen({navigation}){
    return(
        <View>
            <Text>MoviesScreen</Text>
            <Text>Mostra o titulo do filme, a imagem, ao clicar no filme vai para tela de detalhes do filme</Text>
            <Button
                title='Teste -> mostra o filme do Shrek'
                onPress={() => navigation.navigate("Details", { id: 808})}
            />
        </View>
    )
}

export default MoviesScreen;