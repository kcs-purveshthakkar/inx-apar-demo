import axios from 'axios';


export function getInvoices() {
    let url = `http://localhost:3005/invoices`;
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