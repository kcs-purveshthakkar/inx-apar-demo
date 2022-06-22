import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { AgGridReact } from 'ag-grid-react';
import * as olympicWinnerService from "../../services/OlympicWinnerService";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const OlympicWinnerList = () => {

    const gridRef = useRef<any>();
    const [gridApi, setGridApi] = useState<any>(null);
    const [olympicWinnersData, setOlympicWinnersData] = useState<any>([]);

    useEffect(() => {
        callUseEffect();
    }, []);

    useEffect(() => {
        getTableData();
    });

    const callUseEffect = async () => {
        const getOlympicWinnersData = await olympicWinnerService.getOlympicWinner();
        setOlympicWinnersData(getOlympicWinnersData);
    };

    const getTableData = async () => {
        if (gridApi) {
            const dataSource = {
                getRows: async (params: any) => {
                    if (olympicWinnersData.length) {
                        params.successCallback(olympicWinnersData, olympicWinnersData.length);
                    }
                }
            }
            gridApi.setDatasource(dataSource);
        }
    }

    /* table columns field name */
    const columns = [
        { field: 'age', minWidth: 120 },
        { field: 'year', maxWidth: 120 },
        { field: 'date', minWidth: 150 },
        { field: 'sport', maxWidth: 150 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ];

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
        };
    }, []);

    const filterSportsData = () => {
        console.log('filter')
        console.log('postData=', olympicWinnersData);
        let filterSportsArr: any[] = [];
        olympicWinnersData.forEach((filterDataGrid: any) => {
            if (filterDataGrid.sport === "Swimming") {
                filterSportsArr.push(filterDataGrid)
            }
        });
        setOlympicWinnersData(filterSportsArr);
        console.log('filterSportsArr', filterSportsArr)
    };

    const clearFilter = () => {
        callUseEffect();
    };

    /*  const onGridReady = (params: any) => {
         setGridApi(params.api);
     }; */

    return (
        <>
            <div>
                <h2>Inxeption Apar Demo</h2>
                {/*  <form onSubmit={handleOnSubmit}>
                <label htmlFor="username" style={{ marginRight: "10px" }}>Name: </label>
                <input required name="username" type="text" style={{ marginRight: "15px" }} onChange={handleOnChange} value={name} autoComplete="off" />
                <Button variant="secondary" type="submit">Add User</Button>
            </form> */}
            </div>
            <div style={{ marginBottom: '5px' }}>
                <Button onClick={filterSportsData}>Filter Only Sports = Swimming</Button >
                <Button onClick={clearFilter} style={{ marginLeft: '10px' }}>
                    Clear Filter
                </Button >
            </div>

            <br />
            {/*  {postData.length > 0 && */}
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
                            rowData={olympicWinnersData}
                            columnDefs={columns}
                            pagination={true}
                            defaultColDef={defaultColDef}
                            rowSelection={'multiple'}
                            groupSelectsChildren={true}
                            groupSelectsFiltered={true}
                            suppressAggFuncInHeader={true}
                            animateRows={true}
                            suppressRowClickSelection
                        ></AgGridReact>
                    </div>
                </div>
            </div>
            {/*  } */}
        </>
    );
}

export default OlympicWinnerList;