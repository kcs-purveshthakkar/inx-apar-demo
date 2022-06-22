import React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

type AgGridProps = {
    recordPerPage: any;
    onGridReady: any;
    // frameworkComponents?: any;
    columns: any;
    // rowData: any;
    onSelectionChanged?: any;
    suppressRowClickSelection?: any;
}

const AgGridTable = ({
    recordPerPage,
    onGridReady,
    // frameworkComponents,
    columns,
    // rowData,
    onSelectionChanged,
    suppressRowClickSelection = false
}: AgGridProps) => {
    const overlayNoRowsTemplate = "No Records to display";
    return (
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
                        pagination={true}
                        rowModelType={"infinite"}
                        paginationPageSize={recordPerPage}
                        cacheBlockSize={recordPerPage}
                        onGridReady={onGridReady}
                        rowHeight={40}
                        rowDragManaged={false}
                        animateRows={false}
                        defaultColDef={{
                            sortable: true,
                            editable: false,
                            resizable: true,
                            filter: false,
                            lockPosition: true,
                        }}
                        suppressDragLeaveHidesColumns={false}
                        // frameworkComponents={frameworkComponents}
                        overlayNoRowsTemplate={overlayNoRowsTemplate}
                        suppressRowClickSelection
                        rowSelection={'multiple'}
                        onSelectionChanged={onSelectionChanged}
                    // rowData={rowData}
                    // paginationAutoPageSize={true}
                    >
                        {columns.map((column: any, index: any) => (
                            <AgGridColumn {...column} key={index} />
                        ))}

                    </AgGridReact>
                </div>
            </div>
        </div>
    )
};

export default AgGridTable;