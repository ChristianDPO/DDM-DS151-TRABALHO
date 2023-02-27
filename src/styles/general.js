import { StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    containerBack: {
        flex: 1,
        backgroundColor: "black",
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 10,
        alignSelf: 'stretch'
    },
    containerText: {
        margin: 15,
        textAlign: 'justify'
    },
    imageMovie: {
        width: 400,
        height: 200,
        marginBottom: 10,
        borderRadius: 20,
        alignSelf: 'center'
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "white"
    },
    textTitle2: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "white",
        marginTop: 15,
        padding: 10,
        alignSelf: 'center'
    },
    text: {
        fontSize: 20,
        color: "white",
        lineHeight: 30,
        flexWrap: 'wrap'
    },
    containerText: {
        marginStart: 20,
        textAlign: 'justify',
        flexDirection: 'column',
        margin: 20
    },
    imageMovie: {
        width: 400,
        height: 200,
        marginBottom: 10,
        borderRadius: 20,
        alignSelf: 'center'
    },
    iconContainer: {
        marginEnd: 15,
        flex: 1,
        alignItems: 'flex-end',
    },
    iconContainer2: {
        marginEnd: 15,
        alignItems: 'flex-end',
        //alignItems: 'center'
    },
    imagePerfil: {
        width: 100, 
        height: 100,
        margin: 5,
        borderRadius: 10,
        alignSelf: "center",
        margin: 20
    }
});

export default styles;