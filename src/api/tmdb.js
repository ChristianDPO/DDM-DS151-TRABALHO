import axios from "axios";
// import { API_KEY } from '@env';
const API_KEY="b5c34b2d52e2e339882f2d198e61c9ec"

/* Para usar a sua chave de API, criar uma conta no the movie db
e pegar a 'API key V3' no seu perfil. Depois criar um arquivo no
repositorio com nome .env.local com o conteúdo:

API_KEY=minhachaveapikeyv3quecopiei

OBS: ESSE IMPORT DO .env.local NAO FUNCIONA EM ALGUNS EMULADORES DE ANDROID E CELULARES
*/

//ao chamar objeto que comunica com a api ja cria a instancia

const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params:{
        //ao chamar a api no theMovieDB - parametro api_key verifica identidade da requisição
        api_key: API_KEY,
    }
  });
  
export default tmdb;