import axios from "axios";

const apiKey = '24a15d98966d93621fab86814428f750';

//ao chamar objeto que comunica com a api ja cria a instancia
export default axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params:{
        //ao chamar a api no theMovieDB - parametro api_key verifica identidade da requisição
        api_key: apiKey,
    }
  });