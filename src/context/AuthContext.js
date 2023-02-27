import React, {createContext, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import * as RootNavigation from '../../RootNavigation.js';

import tmdb from '../api/tmdb';
import { API_KEY } from '@env';

const AuthContext  = createContext(null);

function authReducer(state, action){
    switch(action.type){
        case 'signIn':
            return({
                ...state,
                signedIn: true,
                request_token: action.payload.request_token,
                session_id: action.payload.session_id
            });
        case "error":
            return({
                ...state,
                error: action.payload
            });
        case "signOut":
            return({
                ...state,
                signedIn: false,
                request_token: null,
                session_id: null,
                error: ""
            });
        default:
            return({...state});
    }
}

function AuthProvider({children}){
    const [authState, dispatch] = useReducer(authReducer, {
        signedIn: false,
        request_token: null,
        error: "",
        session_id: ""
    });
    
    const tryLocalSignIn = async () => {

        const request_token = await AsyncStorage.getItem('request_token');
        const session_id = await AsyncStorage.getItem('session_id');
        
        if(request_token && session_id){
            dispatch({type: 'signIn', payload: {request_token: request_token, session_id: session_id}});
            RootNavigation.navigate('Home');
        }
        else{
            dispatch({type:'signOut'});
            RootNavigation.navigate('Login');
        }
    
    }

    const createRequestToken = async () => {
        try{
            const response = await tmdb.get('authentication/token/new');      
            
            //console.log('createRequestToken response: ', response);
            return response.data.request_token;
        } 
        catch (err) {
            console.log(err);
            dispatch({
                type: "error",
                payload: "Problemas para pegar token",
            });
            return null;
        }
    };

    
    const validateWithLogin = async (username, password, request_token) => {
        try {
            const response = await tmdb.post('authentication/token/validate_with_login', 
            {
                username,
                password,
                request_token
            });

            //console.log("validateWithLogin response:", response);
            return response.data.request_token;
        } 
        catch (err) {
            console.log(err);
            dispatch({
                type: "error",
                payload: "Problemas para autenticar usuário",
            });
        }
    };


    const newSessionId = async (request_token) => {
        try {
            const response = await tmdb.post('authentication/session/new', 
            {
                request_token,
            });

            //console.log('newSessionId response: ', response);
            return response.data.session_id;
        } 
        catch (err) {
            console.log(err);
            dispatch({
                type: "error",
                payload: "Problemas para criar um ID de sessão",
            });
            return null;
        }
    };

    const signIn = async (username, password) => {

        //Cria um novo request token usando a API_KEY
        let request_token = await createRequestToken();
        //console.log(request_token);
        
        if(!request_token){
            return;
        }

        //Valida o request token com o login e senha, retornando um token validado
        request_token = await validateWithLogin(username, password, request_token);
        //console.log(request_token);

        if(!request_token){
            return;
        }

        //recupera um session_id com o request_token
        let session_id = await newSessionId(request_token);
        //console.log(session_id);

        if(!session_id){
            return;
        }

        await AsyncStorage.setItem("request_token", request_token);
        await AsyncStorage.setItem("session_id", session_id);
        
        tryLocalSignIn();
    }


    const signOut = async () => {
        await AsyncStorage.removeItem('request_token');
        await AsyncStorage.removeItem('session_id');
        dispatch({ type: "signOut"});
        RootNavigation.navigate("Login");
    }


    return(
        <AuthContext.Provider value={{
            authState,
            tryLocalSignIn,
            createRequestToken,
            validateWithLogin,  
            newSessionId,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export {AuthContext, AuthProvider};