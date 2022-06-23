import React, { useState, useCallback, useMemo, useRef, useEffect, Fragment } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { AgGridReact } from 'ag-grid-react';
import { NavLink, Outlet } from "react-router-dom";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import "react-datepicker/dist/react-datepicker.css";
import * as invoiceService from "../../services/InvoiceService";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Header from '../layout/Header';
import { invoiceListPaginationPageSize } from '../../constants/common';
import Loader from '../../components/loader';

const AparInvoices = () => {

    const gridRef = useRef<any>();
    const [showLoader, setShowLoader] = useState(false);
    const [gridApi, setGridApi] = useState<any>(null);
    const [invoicesData, setInvoicesData] = useState<any>([]);
    const [invoicesList, setInvoicesList] = useState<any>([]);
    const [fromDateFilter, setFromDateFilter] = useState(addDays(new Date(), -31));
    const [toDateFilter, setToDateFilter] = useState(addDays(new Date(), -1));

    useEffect(() => {
        getApiData();
    }, []);

    useEffect(() => {
        getTableData();
    });

    const getApiData = async () => {
        setShowLoader(true);
        const getInvoicesData = await invoiceService.getInvoices();
        setInvoicesData(getInvoicesData);
        setInvoicesList(getInvoicesData);
        setShowLoader(false);
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
                {data && (
                    <div>
                        <NavLink
                            className="text-primary mx-2"
                            to={`/invoice-detail/${data.invoice_number}`}
                        >
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
        { field: 'SCAC', minWidth: 100 },
        { headerName: 'Invoice Number', field: 'invoice_number', minWidth: 170, cellRenderer: "invoiceNumberCellRender" },
        { field: 'Mode', maxWidth: 100 },
        { field: 'invoice_date', headerName: 'Invoice Date', minWidth: 140 },
        { field: 'invoice_due_date', headerName: 'Invoice Due Date', minWidth: 160 },
        { headerName: 'Invoice Total Amount', field: 'invoice_total_amount', minWidth: 190 },
        { headerName: 'Source', field: 'source', minWidth: 100 },
        { headerName: 'File Name', field: 'file_name', minWidth: 150 },
        { headerName: 'Notes', field: 'notes', minWidth: 130, cellRenderer: "notesCellRender" },
        { headerName: 'Ingested Date', field: 'created_at', minWidth: 140 },
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
        getApiData();
    };

    const handleFromDateChange = (date: any) => {
        setFromDateFilter(date);
    };

    const handleToDateChange = async (date: any) => {
        setToDateFilter(date);
        handleFilterSubmit(date);
    };

    const handleFilterSubmit = async (toDate: Date) => {
        const convertFromDateFormat = fromDateFilter?.toLocaleDateString();
        const convertToDateFormat = toDate?.toLocaleDateString();
        if ((fromDateFilter !== undefined) || fromDateFilter !== null) {
            var resultProductData = invoicesData.filter((a: any) => {
                var invoiceDate = new Date(a.invoice_date);
                const convertInvoiceDate = invoiceDate.toLocaleDateString();
                return (convertInvoiceDate >= convertFromDateFormat && convertInvoiceDate <= convertToDateFormat);
            });
            setInvoicesList(resultProductData);
        }
        console.log('1111=', fromDateFilter, toDate);
        if ((fromDateFilter === undefined) && (toDate === undefined) || (fromDateFilter === null) && (toDate === null)) {
            clearFilter();
        }
    };

    /*  const onGridReady = (params: any) => {
         setGridApi(params.api);
     }; */

    return (
        <>
            <div className="m-grid__item m-grid__item--fluid m-wrapper">
                {<Loader isLoading={showLoader} />}
                <div>
                    <h2 style={{ textAlign: 'center', marginTop: '90px' }}>Invoices</h2>
                    <div style={{
                        justifyContent: "end",
                        display: "flex",
                        alignItems: "baseline"
                    }}>
                        <div className="col-lg-2 col-md-4 col-sm-12 mb-4 mt-3">
                            <DatePicker
                                selected={fromDateFilter}
                                className={"form-control m-input"}
                                placeholderText="MM/DD/YYYY"
                                onChange={(date) => { handleFromDateChange(date); }}
                                maxDate={addDays(new Date(), -1)}
                            />
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-12 mb-4">
                            <DatePicker
                                selected={toDateFilter}
                                className={"form-control m-input"}
                                placeholderText="MM/DD/YYYY"
                                onChange={(date) => {
                                    handleToDateChange(date);
                                }}
                                maxDate={addDays(new Date(), -1)}
                            />
                        </div>
                        <Button onClick={clearFilter} className="mr-2">
                            Clear Filter
                        </Button >
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
            {/* <Outlet /> */}
        </>
    );
}

export default AparInvoices;