import * as React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { purple, orange } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "name",
        headerName: "Job Name",
        width: 150,
        editable: false,
    },
    {
        field: "employer",
        headerName: "Employer Name",
        width: 150,
        editable: false,
    },
    {
        field: "url",
        headerName: "Job URL",
        width: 150,
        editable: false,
    },
    {
        field: "desc",
        headerName: "Description",
        width: 180,
        editable: false,
    },
];

const AppliedJobTable = (props) => {
    const [disable, setDisable] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [drawer, setDrawer] = React.useState(false);
    const [role, setrole] = React.useState();
    const [token, setToken] = React.useState(localStorage.getItem("token"));

    let instance = axios.create({
        baseURL: "http://127.0.0.1:3000",
        headers: {
            post: {
                "Content-Type": "application/json",
            },
            authorization: `Bearer ${token}`,
        },
    });

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
                rows={jobs}
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

export default AppliedJobTable;
