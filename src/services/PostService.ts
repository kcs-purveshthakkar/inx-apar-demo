import axios from 'axios';


export function getPost() {
    let url = `http://localhost:3000/posts`;
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