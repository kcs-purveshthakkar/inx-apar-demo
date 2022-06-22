import React, { useState, useCallback, useMemo, useRef, useEffect, Fragment } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { AgGridReact } from 'ag-grid-react';
import { NavLink } from "react-router-dom";
import * as invoiceService from "../../services/InvoiceService";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Header from '../layout/Header';

const AparInvoices = () => {

    const gridRef = useRef<any>();
    const [gridApi, setGridApi] = useState<any>(null);
    const [invoicesData, setInvoicesData] = useState<any>([]);

    useEffect(() => {
        getApiData();
    }, []);

    useEffect(() => {
        getTableData();
    });

    const getApiData = async () => {
        const getInvoicesData = await invoiceService.getInvoices();
        setInvoicesData(getInvoicesData);
    };

    const getTableData = async () => {
        if (gridApi) {
            const dataSource = {
                getRows: async (params: any) => {
                    if (invoicesData.length) {
                        params.successCallback(invoicesData, invoicesData.length);
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

    const filterInvoiceTotalAmount = () => {
        let filterInvoiceTotalAmountArr: any[] = [];
        invoicesData.forEach((filterDataGrid: any) => {
            if (filterDataGrid.invoice_total_amount === "5486") {
                filterInvoiceTotalAmountArr.push(filterDataGrid);
            }
        });
        setInvoicesData(filterInvoiceTotalAmountArr);
    };

    const filterInvoiceMode = () => {
        let filterInvoiceModeArr: any[] = [];
        invoicesData.forEach((filterDataGrid: any) => {
            if (filterDataGrid.Mode === "LTL") {
                filterInvoiceModeArr.push(filterDataGrid);
            }
        });
        setInvoicesData(filterInvoiceModeArr);
    };

    const clearFilter = () => {
        getApiData();
    };

    /*  const onGridReady = (params: any) => {
         setGridApi(params.api);
     }; */

    return (
        <>
            <Header />
            <div className="m-grid__item m-grid__item--fluid m-wrapper">
                <div>
                    <h2 style={{ textAlign: 'center', marginTop: '90px' }}>Invoices</h2>
                    {/*  <form onSubmit={handleOnSubmit}>
                <label htmlFor="username" style={{ marginRight: "10px" }}>Name: </label>
                <input required name="username" type="text" style={{ marginRight: "15px" }} onChange={handleOnChange} value={name} autoComplete="off" />
                <Button variant="secondary" type="submit">Add User</Button>
            </form> */}
                </div>
                {/* <div style={{ marginTop: '20px', marginBottom: '5px', marginLeft: '10px' }}>
                <Button onClick={filterInvoiceTotalAmount}>Filter Invoice Total Amount = 5486</Button>
                <Button onClick={filterInvoiceMode} style={{ marginLeft: '10px' }}>Filter Mode = LTL</Button>
                <Button onClick={clearFilter} style={{ marginLeft: '10px' }}>
                    Clear Filter
                </Button >
            </div> */}
                <br />
                <div className="custom__table my-3">
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
                                rowData={invoicesData}
                                columnDefs={columns}
                                pagination={true}
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