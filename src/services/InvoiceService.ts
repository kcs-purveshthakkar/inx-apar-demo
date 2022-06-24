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
            scac
            po_number
            invoice_date
            invoice_number
            reference_number
            invoice_total_amount
            freight_rate
            pallet_jack
            inside_pu
            lift_gate_pu
            holiday_pu
            weekend_pu
            non_business_hour_pu
            sorting_segregation
            marking_tagging
            other_accessorials
            residential_pu
            trade_show_pu
            appointment_required
            fuel
            detention
            toll_fee
            layover
            stop_off
            driver_assist
            weight_increase
            ams
            bol_fee
            bonded_fee
            cancellation_charge
            chassis_charges
            congestion_surcharge
            customs_clearance_fee
            delivery_order_fee
            demurrage
            destination_fees
            diversion_charges
            drop_and_hook_fee
            handling_fee
            hazardous
            pick_up_charge
            redelivery_fee
            reefer_surcharge
            terminal_handling_charge
            wait_time_fee
            duty_hmf_mpf_fee
            scale_ticket
            gri
            peak_season_surcharge
            delivery_surcharge
            invoice_due_date
            master_bol
            bol_number
            container_number
            awb_number
            mode
            weight
            weight_uom
            pallet_count
            l7_details
            createdAt
            updatedAt
      }
    }
    `,

    getInvoiceById: gql`
    query InvoiceById($invoiceByIdId: Float!) {
        invoiceById(id: $invoiceByIdId) {
            id
            scac
            po_number
            invoice_date
            invoice_number
            reference_number
            invoice_total_amount
            freight_rate
            pallet_jack
            inside_pu
            lift_gate_pu
            holiday_pu
            weekend_pu
            non_business_hour_pu
            sorting_segregation
            marking_tagging
            other_accessorials
            residential_pu
            trade_show_pu
            appointment_required
            fuel
            detention
            toll_fee
            layover
            stop_off
            driver_assist
            weight_increase
            ams
            bol_fee
            bonded_fee
            cancellation_charge
            chassis_charges
            congestion_surcharge
            customs_clearance_fee
            delivery_order_fee
            demurrage
            destination_fees
            diversion_charges
            drop_and_hook_fee
            handling_fee
            hazardous
            pick_up_charge
            redelivery_fee
            reefer_surcharge
            terminal_handling_charge
            wait_time_fee
            duty_hmf_mpf_fee
            scale_ticket
            gri
            peak_season_surcharge
            delivery_surcharge
            invoice_due_date
            master_bol
            bol_number
            container_number
            awb_number
            mode
            weight
            weight_uom
            pallet_count
            l7_details
            createdAt
            updatedAt
        }
      }
    `,

}

