import { gql } from '@apollo/client';


/**
 * Invoice GraphQL Service
 */
export const invoiceService = {

    getInvoiceList: gql`
    query InvoiceList {
        invoiceList {
            id
            batch_name
            source
            scac
            invoice_date
            invoice_number
            reference_number
            invoice_total_amount
            weight
            pallet_count
            pro_number
            house_bol
            linehaul
            pallet_dimensions
            prism_id
            isf_fee
            origin_charge
            per_diem_charge
            pier_pass
            prepull_fee
            cfs_storage_fee
            telex_release_fee
            yard_storage_fee
            additional_line_fee
            lumper
            limited_access_type
            nyc_metro
            large_package_surcharge
            additional_handling_charge
            residential_surcharge
            signature_surcharge
            correction_surcharge
            adjustment
            next_day_surcharge
            zone_adjustment_charge
            remote_surcharge
            return_surcharge
            second_day_surcharge
            credits
            tracking_number
            class
            status
            createdAt
      }
    }
    `,

    getInvoiceById: gql`
    query InvoiceById($invoiceByIdId: Float!) {
        invoiceById(id: $invoiceByIdId) {
                id
                batch_name
                source
                scac
                invoice_date
                invoice_number
                reference_number
                invoice_total_amount
                weight
                pallet_count
                pro_number
                house_bol
                linehaul
                pallet_dimensions
                prism_id
                isf_fee
                origin_charge
                per_diem_charge
                pier_pass
                prepull_fee
                discount
                cfs_storage_fee
                telex_release_fee
                yard_storage_fee
                additional_line_fee
                lumper
                limited_access_type
                nyc_metro
                large_package_surcharge
                additional_handling_charge
                residential_surcharge
                signature_surcharge
                correction_surcharge
                adjustment
                next_day_surcharge
                zone_adjustment_charge
                remote_surcharge
                return_surcharge
                second_day_surcharge
                credits
                tracking_number
                class
                status
                createdAt
        }
      }
    `,

}

