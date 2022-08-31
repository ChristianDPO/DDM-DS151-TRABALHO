import React, {createContext, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext(null);

function appReducer(state, action){
    switch(action.type){
        default:
            return({...state})
    }

}

function AppProvider({children}){
    const [appState, dispatch] = useReducer(appReducer,{})

    return(
        <AppContext.Provider value={{appState}}>
            {children}
        </AppContext.Provider>
    )


}


export {AppContext, AppProvider};