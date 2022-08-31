import axios from "axios";
import { API_KEY } from '@env';

/* Para usar a sua chave de API, criar uma conta no the movie db
e pegar a 'API key V3' no seu perfil. Depois criar um arquivo no
repositorio com nome .env.local com o conteúdo:

API_KEY=minhachaveapikeyv3quecopiei

*/

//ao chamar objeto que comunica com a api ja cria a instancia
export default axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params:{
        //ao chamar a api no theMovieDB - parametro api_key verifica identidade da requisição
        api_key: API_KEY,
    }
  });