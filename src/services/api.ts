import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/'
});


const baseUrl = 'https://60927fe985ff510017212f35.mockapi.io/api/v1/';
class PodcastrServices {
  static getEpisodes() {
    return axios
      .get(`${baseUrl}/episodes`)
      .then((response) => {
        console.log('teste',response.data);
        return response.data;
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

}

export default PodcastrServices;
