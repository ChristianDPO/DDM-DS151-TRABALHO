import React, {createContext, useState} from 'react';

export const RatingContext = createContext({});

function RatingProvider({children}){
    const [likedMovies, setLikedMovies] = useState([{original_title: 'Shrek 2', id: '809', poster_path: "/2yYP0PQjG8zVqturh1BAqu2Tixl.jpg"}]);

    return(
        <RatingContext.Provider value={{likedMovies, setLikedMovies}}>
            {children}
        </RatingContext.Provider>
    )
}

export default RatingProvider;