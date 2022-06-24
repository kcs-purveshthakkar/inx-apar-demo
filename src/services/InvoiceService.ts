import axios from 'axios';
import { gql } from '@apollo/client';


export function getInvoices() {
    let url = `https://apar-json-server.herokuapp.com/invoices`;
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


/**
 * Invoice GraphQL Service
 */
export const invoiceService = {

    getInvoiceList: gql`
    query InvoiceList {
        invoiceList {
            id
            invoiceNumber
            invoiceDate
            invoiceAmount
            createdAt
            updatedAt
      }
    }
    `,

}

