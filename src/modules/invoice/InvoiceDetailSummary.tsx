import React, { useState, useCallback, useMemo, useRef, useEffect, Fragment } from 'react';
import { Link, useParams, NavLink } from "react-router-dom";
import { useQuery, useMutation, gql } from '@apollo/client';
import BaseLayout from '../shared/layout/BaseLayout';
// import * as invoiceService from "../../services/InvoiceService";
import { invoiceService } from "../../services/InvoiceService";
import Loader from '../../components/loader';
import CustomBreadCrumb from "../shared/breadcrumb/CustomBreadCrumb";


interface InvoiceByIdData {
    id: number;
    scac: string;
    po_number: string;
    invoice_date: string;
    invoice_number: string;
    reference_number: string;
    invoice_total_amount: string;
    freight_rate: string;
    pallet_jack: string;
    inside_pu: string;
    lift_gate_pu: string;
    holiday_pu: string;
    weekend_pu: string;
    non_business_hour_pu: string;
    sorting_segregation: string;
    marking_tagging: string;
    other_accessorials: string;
    residential_pu: string;
    trade_show_pu: string;
    appointment_required: string;
    fuel: string;
    detention: string;
    toll_fee: string;
    layover: string;
    stop_off: string;
    driver_assist: string;
    weight_increase: string;
    ams: string;
    bol_fee: string;
    bonded_fee: string;
    cancellation_charge: string;
    chassis_charges: string;
    congestion_surcharge: string;
    customs_clearance_fee: string;
    delivery_order_fee: string;
    demurrage: string;
    destination_fees: string;
    diversion_charges: string;
    drop_and_hook_fee: string;
    handling_fee: string;
    hazardous: string;
    pick_up_charge: string;
    redelivery_fee: string;
    reefer_surcharge: string;
    terminal_handling_charge: string;
    wait_time_fee: string;
    duty_hmf_mpf_fee: string;
    scale_ticket: string;
    gri: string;
    peak_season_surcharge: string;
    delivery_surcharge: string;
    invoice_due_date: string;
    master_bol: string;
    bol_number: string;
    container_number: string;
    awb_number: string;
    mode: string;
    weight: string;
    weight_uom: string;
    pallet_count: string;
    l7_details: string;
    createdAt: string;
    updatedAt: string;
}

interface InvoiceByIdResult {
    invoiceById: Array<InvoiceByIdData>
}

const AparInvoiceDetailSummary = () => {

    const { id } = useParams();

    const invoiceDetailBreadCrumbData = [
        {
            title: "Invoice List",
            link: "/",
            classData: "m-nav__link-text__m",
        },
        {
            title: "Invoice Detail",
            link: "",
        },
    ];

    const [showLoader, setShowLoader] = useState(false);
    const [invoicesData, setInvoicesData] = useState<any>([]);

    const requestPayloadVariables = () => {
        return {
            variables: { invoiceByIdId: Number(id) },
        }
    };

    const { loading, error, data } = useQuery<InvoiceByIdResult>(invoiceService.getInvoiceById, requestPayloadVariables());

    useEffect(() => {
        getApiData();
    }, [data]);

    const getApiData = async () => {
        setShowLoader(true);
        if (data) {
            setInvoicesData(data.invoiceById);
            setShowLoader(false);
        }
    };

    return (
        <>
            <div className="m-grid__item m-grid__item--fluid m-wrapper" style={{ backgroundColor: '#F5F5F5' }}>
                {<Loader isLoading={showLoader} />}
                <div className="m-container px-4 px-sm-0">
                    <div className="d-flex align-items-center pt-5">
                        <div className="mr-auto">
                            <CustomBreadCrumb breadCrumbItems={invoiceDetailBreadCrumbData} />
                            <h3 className="m-subheader__title mb-0">
                                <Link
                                    to="/"
                                    className="font-weight-bold text-secondary"
                                >
                                    <i className="fa fa-arrow-left mr-2 mr-md-4"></i>
                                </Link>
                                Invoice Detail{" "}
                            </h3>
                        </div>
                    </div>
                </div>
                <Fragment>
                    <div className="m-container  my-sm-5 px-4 px-sm-0">
                        <div className="m-portlet m-portlet--tab border-radius-25">
                            <div className="m-portlet__body font-weight-bold">
                                Invoice Number: {invoicesData.invoice_number}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-12 col-lg-12">
                                <div className="m-portlet m-portlet--tab border-radius-25 pb-4">
                                    <div className="m-portlet__head border-0">
                                        <div className="m-portlet__head-caption">
                                            <div className="row">
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Batch Name
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.batch_name}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Source
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.source}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Ingested Date
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.createdAt}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Excel Version
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.excel_version}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        SCAC
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.scac}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Mode
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.mode}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Pro Number
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.pro_number}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        PO Number
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.po_number}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        BOL Number
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.bol_number}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Master BOL
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.master_bol}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        House BOL
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.house_bol}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        AWB Number
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.awb_number}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Tracking Number
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.tracking_number}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Invoice Date
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.invoice_date}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Invoice Total Amount
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.invoice_total_amount}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Freight Rate
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.freight_rate}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Discount
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.discount}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Linehaul
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.linehaul}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Fuel Surcharge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.fuel_surcharge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Weight
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.weight}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Weight UOM
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.weight_uom}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Pallet Count
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.pallet_count}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Pallet Dimensions
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.pallet_dimensions}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Class
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.class}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-portlet m-portlet--tab border-radius-25 pb-4">
                                    <div className="m-portlet__head border-0">
                                        <div className="m-portlet__head-caption">
                                            <div className="row">
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Reference Number
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.reference_number}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Prism ID
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.prism_id}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        AMS
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData.ams}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        B L Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.b_l_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Bonded Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.bonded_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Cancellation Charge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.cancellation_charge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Chassis Charges
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.chassis_charges}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Congestion Surcharge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.congestion_surcharge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Customs Clearance Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.customs_clearance_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Delivery Order Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.delivery_order_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Demurrage
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.demurrage}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Destination Fees
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.destination_fees}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Detention
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.detention}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Diversion Charges
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.diversion_charges}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Drop and Hook Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.drop_and_hook_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        GRI
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.gri}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Handling Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.handling_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Hazardous
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.hazardous}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        ISF Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.isf_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Origin Charge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.origin_charge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Overweight Surcharge Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.overweight_surcharge_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Peak Season Surcharge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.peak_season_surcharge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Per Diem Charge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.per_diem_charge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Pick Up Charge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.pick_up_charge}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-portlet m-portlet--tab border-radius-25 pb-4">
                                    <div className="m-portlet__head border-0">
                                        <div className="m-portlet__head-caption">
                                            <div className="row">
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Pier Pass
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.pier_pass}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Prepull Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.prepull_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Redelivery Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.redelivery_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Reefer Surcharge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.reefer_surcharge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Stop Off Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.stop_off_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        CFS Storage Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.cfs_storage_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Telex Release Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.telex_release_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Terminal Handling Charge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.terminal_handling_charge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Toll Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.toll_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Wait Time Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.wait_time_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Yard Storage Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.yard_storage_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Additional Line Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.additional_line_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Duty HMF MPF Fee
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.duty_hmf_mpf_fee}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Lumper
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.lumper}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Layover
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.layover}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Stop Off
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.stop_off}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Driver Assist
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.driver_assist}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Weight Increase
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.weight_increase}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Scale Ticket
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.scale_ticket}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Limited Access Type
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.limited_access_type}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Residential PU
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.residential_pu}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Pallet Jack
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.pallet_jack}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Appointment Required
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.appointment_required}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Inside PU
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.inside_pu}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-portlet m-portlet--tab border-radius-25 pb-4">
                                    <div className="m-portlet__head border-0">
                                        <div className="m-portlet__head-caption">
                                            <div className="row">
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Liftgate PU
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.liftgate_pu}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Trade Show PU
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.trade_show_pu}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Holiday PU
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.holiday_pu}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Weekend PU
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.weekend_pu}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Non Business Hour PU
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.non_business_hour_pu}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Sorting Segregation
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.sorting_segregation}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Marking Tagging
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.marking_tagging}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        NYC Metro
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.nyc_metro}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Other Accessorials
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.other_accessorials}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Large Package Surcharge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.large_package_surcharge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Additional Handling Charge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.additional_handling_charge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Residential Surcharge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.residential_surcharge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Signature Surcharge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.signature_surcharge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Correction Surcharge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.correction_surcharge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Delivery Surcharge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.delivery_surcharge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Adjustment
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.adjustment}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Next Day Surcharge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.next_day_surcharge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Zone Adjustment Charge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.zone_adjustment_charge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Remote Surcharge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.remote_surcharge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Return Surcharge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.return_surcharge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Second Day Surcharge
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.second_day_surcharge}
                                                    </span>
                                                </div>
                                                <div className="col-sm-2 mb-4 mt-4">
                                                    <label className="d-block font-weight-medium text-labelmuted">
                                                        Credits
                                                    </label>
                                                    <span className="d-block h6 font-weight-bold">
                                                        {invoicesData[0]?.credits}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            </div>
        </>
    );
}

export default AparInvoiceDetailSummary;