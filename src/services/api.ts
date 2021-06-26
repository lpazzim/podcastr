import axios from 'axios';


const baseUrl = 'https://60927fe985ff510017212f35.mockapi.io/api/v1/';
class PodcastrServices {
  static getEpisodes() {
    return axios
      .get(`${baseUrl}/episodes`)
      .then((response) => {        
        return response.data;
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  static getEpisodesById(id) {
    return axios
      .get(`${baseUrl}/episodes/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

}

export default PodcastrServices;
