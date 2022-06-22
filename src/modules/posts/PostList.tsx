import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { AgGridReact } from 'ag-grid-react';
import * as postService from "../../services/PostService";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const PostList = () => {

    const gridRef = useRef<any>();
    const [gridApi, setGridApi] = useState<any>(null);
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        callUseEffect();
    }, []);

    useEffect(() => {
        getTableData();
    });

    const callUseEffect = async () => {
        const getPostData = await postService.getPost();
        setPostData(getPostData);
    };

    const getTableData = async () => {
        if (gridApi) {
            const dataSource = {
                getRows: async (params: any) => {
                    if (postData.length) {
                        params.successCallback(postData, postData.length);
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

    const ages16And20 = useCallback(() => {
        console.log('filter')
        gridRef.current.api.setFilterModel({
            age: {
                type: 'set',
                values: ['16', '20'],
            },
        });
    }, []);

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
                <button onClick={ages16And20}>Filter age</button>
                {/* <button onClick={clearFilter} style={{ marginLeft: '10px' }}>
            Clear Filter
          </button> */}
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
                            rowData={postData}
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

export default PostList;