import * as React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { purple, orange } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

let instance = axios.create({
    baseURL: "http://safehouse.herokuapp.com",
    headers: {
        post: {
            "Content-Type": "application/json",
        },
    },
});

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "name",
        headerName: "Workshop",
        width: 150,
        editable: false,
    },
    {
        field: "instructor",
        headerName: "Instructor Name",
        width: 150,
        editable: false,
    },
];

const rows = [
    { id: 1, instructor: "White", name: "John", age: 35 },
    { id: 2, instructor: "Lannister", name: "Cersei", age: 42 },
    { id: 3, instructor: "Lannister", name: "Jaime", age: 45 },
    { id: 4, instructor: "Stark", name: "Arya", age: 16 },
    { id: 5, instructor: "Targaryen", name: "Daenerys", age: 22 },
    { id: 6, instructor: "Melisandre", name: "Alex", age: 15 },
    { id: 7, instructor: "Clifford", name: "Ferrara", age: 44 },
    { id: 8, instructor: "Frances", name: "Rossini", age: 36 },
    { id: 9, instructor: "Roxie", name: "Harvey", age: 65 },
    { id: 10, instructor: "Lannister", name: "Cersei", age: 42 },
    { id: 11, instructor: "Lannister", name: "Jaime", age: 45 },
    { id: 12, instructor: "Stark", name: "Arya", age: 16 },
    { id: 13, instructor: "Targaryen", name: "Daenerys", age: 22 },
    { id: 14, instructor: "Melisandre", name: "Alex", age: 15 },
    { id: 15, instructor: "Clifford", name: "Ferrara", age: 44 },
    { id: 16, instructor: "Frances", name: "Rossini", age: 36 },
    { id: 17, instructor: "Roxie", name: "Harvey", age: 65 },
];

const AppliedWorkshopTable = (props) => {
    const [disable, setDisable] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [drawer, setDrawer] = React.useState(false);
    const [role, setrole] = React.useState();

    const deleteRows = (e) => {
        console.log(selectedRows);
    };

    React.useEffect(() => {
        selectedRows.length == 0 ? setDisable(true) : setDisable(false);
        setrole(localStorage.getItem("role"));
    }, [selectedRows]);

    return (
        <Box
            sx={{
                width: "100%",
                height: "75vh",
                position: "relative",
                zIndex: "10",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {role != "homeless" ? (
                <Box
                    sx={{
                        padding: "6px",
                        border: "none",
                        borderTop: 1,
                        borderRight: 1,
                        borderLeft: 1,
                        borderColor: "divider",
                        borderTopRightRadius: "8px",
                        borderTopLeftRadius: "8px",
                        backdropFilter: "blur(8px)",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <IconButton disabled={disable} onClick={deleteRows}>
                            <DeleteRoundedIcon />
                        </IconButton>
                    </Box>
                </Box>
            ) : null}
            <DataGrid
                rows={rows}
                columns={columns}
                rowsPerPageOptions={[5]}
                autoPageSize
                checkboxSelection
                onStateChange={(e) => setSelectedRows(e.selection)}
                sx={{
                    backdropFilter: "blur(8px)",
                    borderTopLeftRadius: role != "homeless" ? "0px" : "8px",
                    borderTopRightRadius: role != "homeless" ? "0px" : "8px",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                    ".MuiDataGrid-checkboxInput": {
                        color: purple[700],
                        "&.Mui-checked": {
                            color: purple[700],
                        },
                    },
                    ".MuiDataGrid-cell:focus": {
                        outline: "none",
                    },
                    ".MuiDataGrid-row": {
                        "&:hover": {
                            bgcolor: orange[800] + "20",
                        },
                        "&.Mui-selected": {
                            bgcolor: orange[800] + "20",
                        },
                        "&.Mui-selected:hover": {
                            bgcolor: orange[800] + "10",
                        },
                    },
                    ".MuiDataGrid-selectedRowCount": {
                        color: purple[700],
                    },
                    ".MuiDataGrid-filterIcon": {
                        color: orange[700],
                    },
                    ".MuiDataGrid-filterFormValueInput": {
                        "&.Mui-hover": {
                            color: purple[700],
                        },
                    },
                }}
            />
        </Box>
    );
};

export default AppliedWorkshopTable;
