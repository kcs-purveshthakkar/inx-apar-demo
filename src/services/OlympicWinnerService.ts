import axios from 'axios';


export function getOlympicWinner() {
    let url = `http://localhost:3000/olympic-winners`;
    return axios
        .get(url)
        .then((result) => {
            return result.data;
        })
        .catch((error) => {
            console.log(error.response);

            return error.response.data;
        });
}