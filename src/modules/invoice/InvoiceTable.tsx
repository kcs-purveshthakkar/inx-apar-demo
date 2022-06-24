import { useState, useMemo, useRef, useEffect, Fragment } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { NavLink } from "react-router-dom";
import { useQuery, useMutation, gql } from '@apollo/client';
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Select from "react-select";
import { toast } from "react-toastify";
// import * as invoiceService from "../../services/InvoiceService";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Header from '../shared/layout/Header';
import {
    invoiceListPaginationPageSize,
    statusFilterOptions
} from '../../constants/common';
import Loader from '../../components/loader';
import { invoiceService } from "../../services/InvoiceService";

interface InvoiceListData {
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

interface InvoiceListResult {
    invoiceList: Array<InvoiceListData>
}


const AparInvoices = () => {

    const gridRef = useRef<any>();
    const [showLoader, setShowLoader] = useState(false);
    const [gridApi, setGridApi] = useState<any>(null);
    const [invoicesData, setInvoicesData] = useState<any>([]);
    const [invoicesList, setInvoicesList] = useState<any>([]);
    const [fromDateFilter, setFromDateFilter] = useState<any>();
    const [toDateFilter, setToDateFilter] = useState<any>();
    const [statusFilter, setStatusFilter] = useState<any>([]);

    const { loading, error, data } = useQuery<InvoiceListResult>(invoiceService.getInvoiceList);

    useEffect(() => {
        getApiData();
    }, [data]);

    /*  useEffect(() => {
         getTableData();
     }); */

    useEffect(() => {
        getTableData();
    }, [gridApi, data]);

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
        }),
        container: () => ({}),
        control: () => ({}),
        singleValue: () => ({}),
        placeholder: () => ({}),
        menu: () => ({}),
    };

    const getApiData = async () => {
        setShowLoader(true);
        // const getInvoicesData = await invoiceService.getInvoices();
        if (data) {
            setInvoicesData(data?.invoiceList);
            setInvoicesList(data?.invoiceList);
            setShowLoader(false);
        }
    };

    const getTableData = async () => {
        if (gridApi) {
            const dataSource = {
                getRows: async (params: any) => {
                    if (invoicesList.length) {
                        params.successCallback(invoicesList, invoicesList.length);
                    }
                }
            }
            gridApi.setDatasource(dataSource);
        }
    };

    /**
    * Invoice Number cell html render
    */
    const invoiceNumberCellRender = ({ data }: any) => {
        return (
            <Fragment>
                {console.log('data==', data)}
                {data && (
                    <div>
                        <NavLink
                            className="text-primary mx-2"
                            to={`/invoice-detail/${data.id}`}>
                            {data.invoice_number}
                        </NavLink>
                    </div>
                )}
            </Fragment>
        );
    };

    /**
    * Notes cell html render
    */
    const notesCellRender = ({ data }: any) => {
        return (
            <>
                <input type="text" className={"form-control m-input"} />
            </>
        )
    };

    const frameworkComponents = {
        invoiceNumberCellRender,
        notesCellRender
    };

    /* table columns field name */
    const columns = [
        { headerName: 'SCAC', field: 'scac', minWidth: 100 },
        { headerName: 'Invoice Number', field: 'invoice_number', minWidth: 100, cellRenderer: "invoiceNumberCellRender" },
        { headerName: 'Mode', field: 'mode', maxWidth: 100 },
        { headerName: 'Invoice Date', field: 'invoice_date', minWidth: 140 },
        { headerName: 'Invoice Due Date', field: 'invoice_due_date', minWidth: 100 },
        { headerName: 'Invoice Total Amount', field: 'invoice_total_amount', minWidth: 100 },
        { headerName: 'Source', field: 'source', minWidth: 100, hide: true },
        { headerName: 'Status', field: 'status', minWidth: 100, hide: true },
        { headerName: 'File Name', field: 'file_name', minWidth: 150, hide: true },
        { headerName: 'Notes', field: 'notes', minWidth: 130, cellRenderer: "notesCellRender", hide: true },
        { headerName: 'Ingested Date', field: 'createdAt', minWidth: 140 },
    ];

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
        };
    }, []);

    const clearFilter = () => {
        setFromDateFilter(null);
        setToDateFilter(null);
        setStatusFilter([])
        getApiData();
    };

    const handleFromDateChange = (date: any) => {
        setFromDateFilter(date);
        setToDateFilter(addDays(new Date(date), 1));
    };

    const handleToDateChange = async (date: any) => {
        setToDateFilter(date);
    };

    const handleFilterSubmit = () => {
        let convertFromDateFormat: any;
        let convertToDateFormat: any;
        if (((statusFilter?.length === 0) || (statusFilter === null)) && (((fromDateFilter === undefined) || (fromDateFilter === null)) && ((toDateFilter === undefined) || (toDateFilter === null)))) {
            toast.error("Please select Status or Date filter!");
        }
        /*  else if ((((statusFilter?.length === 0) || (statusFilter === null)) || ((statusFilter?.length !== 0) || (statusFilter !== null)))
             && (((fromDateFilter === undefined) || (fromDateFilter === null)) && ((toDateFilter !== undefined) || (toDateFilter !== null))) || (((fromDateFilter !== undefined) || (fromDateFilter !== null)) && ((toDateFilter === undefined) || (toDateFilter === null)))) {
             toast.error("Please select From date and To date filter!");
         } */
        else {
            let filterInvoiceDataByDate = invoicesData.filter((invoiceItem: any) => {
                if (((statusFilter?.length !== 0) || (statusFilter !== null)) && ((fromDateFilter === undefined) || (fromDateFilter === null) || (toDateFilter === undefined) || (toDateFilter === null))) {
                    let invoiceStatus = invoiceItem.status;
                    return (invoiceStatus === statusFilter?.value);
                }
                else if (((statusFilter === null) || (statusFilter.length === 0)) && ((fromDateFilter !== undefined) || (fromDateFilter !== null) || (toDateFilter !== undefined) || (toDateFilter !== null))) {
                    convertFromDateFormat = moment(fromDateFilter).format('YYYY-MM-DD');
                    convertToDateFormat = moment(toDateFilter).format('YYYY-MM-DD');
                    let invoiceDate = moment(invoiceItem.invoice_date).format('YYYY-MM-DD');
                    // const convertInvoiceDate = invoiceDate.toLocaleDateString();
                    return ((invoiceDate >= convertFromDateFormat) && (invoiceDate <= convertToDateFormat));
                }
                else if (((statusFilter !== null) || (Object.keys(statusFilter).length !== 0)) && ((fromDateFilter !== undefined) || (fromDateFilter !== null) || (toDateFilter !== undefined) || (toDateFilter !== null))) {
                    let invoiceStatus = invoiceItem.status;
                    convertFromDateFormat = moment(fromDateFilter).format('YYYY-MM-DD');
                    convertToDateFormat = moment(toDateFilter).format('YYYY-MM-DD');
                    let invoiceDate = moment(invoiceItem.invoice_date).format('YYYY-MM-DD');
                    // const convertInvoiceDate = invoiceDate.toLocaleDateString();
                    return (((invoiceDate >= convertFromDateFormat) && (invoiceDate <= convertToDateFormat)) && (invoiceStatus === statusFilter.value));
                }
            });
            setInvoicesList(filterInvoiceDataByDate);
        }
    };

    /*  const onGridReady = (params: any) => {
         setGridApi(params.api);
     }; */

    return (
        <>
            <div className="m-grid__item m-grid__item--fluid m-wrapper">
                {showLoader && <Loader isLoading={showLoader} />}
                <div>
                    <h2 style={{ textAlign: 'center', marginTop: '10px' }}>Invoices</h2>
                    <div style={{
                        justifyContent: "end",
                        display: "flex",
                        alignItems: "baseline"
                    }}>
                        <div
                            style={{ width: 200 }}
                            className="form-group filterBar p-2 mb-4 mt-4"
                        >
                            <Select
                                classNamePrefix="customSelect"
                                options={statusFilterOptions}
                                onChange={(e: any) => setStatusFilter(e)}
                                value={statusFilter}
                                placeholder="Select Status"
                                isClearable
                                isSearchable
                            />
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-12 mb-4 mt-3">
                            <DatePicker
                                selected={fromDateFilter !== "" ? fromDateFilter : null}
                                className={"form-control m-input"}
                                placeholderText="MM/DD/YYYY"
                                onChange={(date) => { handleFromDateChange(date); }}
                                maxDate={addDays(new Date(), -1)}
                            />
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-12 mb-4">
                            <DatePicker
                                selected={toDateFilter !== "" ? toDateFilter : null}
                                className={"form-control m-input"}
                                placeholderText="MM/DD/YYYY"
                                onChange={(date) => { handleToDateChange(date); }}
                                maxDate={addDays(new Date(), -1)}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleFilterSubmit}
                            className="btn btn-warning py-1 px-sm-4 mr-1"
                        >
                            <span className="d-flex align-items-center py-2 font-weight-medium">
                                Submit
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={clearFilter}
                            className="btn btn-warning py-1 px-sm-4"
                        >
                            <span className="d-flex align-items-center py-2 font-weight-medium">
                                Clear
                            </span>
                        </button>
                    </div>
                </div>
                <br />
                <div className="custom__table mb-3">
                    <div style={{ width: "100%", height: "100%" }}>
                        <div
                            style={{
                                height: "455px",
                                width: "100%",
                            }}
                            className="ag-theme-alpine ag-style"
                        >
                            <AgGridReact
                                ref={gridRef}
                                rowData={invoicesList}
                                columnDefs={columns}
                                pagination={true}
                                paginationPageSize={invoiceListPaginationPageSize}
                                cacheBlockSize={invoiceListPaginationPageSize}
                                defaultColDef={defaultColDef}
                                rowSelection={'multiple'}
                                groupSelectsChildren={true}
                                groupSelectsFiltered={true}
                                suppressAggFuncInHeader={true}
                                animateRows={true}
                                suppressRowClickSelection
                                frameworkComponents={frameworkComponents}
                            ></AgGridReact>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AparInvoices;