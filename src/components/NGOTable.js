import * as React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Tooltip } from "@mui/material";
import { purple, orange } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const columns = [
    {
        field: "name",
        headerName: "Name",
        width: 150,
        editable: false,
    },
    {
        field: "email",
        headerName: "Email",
        width: 180,
        editable: false,
    },
    {
        field: "address",
        headerName: "Address",
        width: 250,
        editable: false,
    },
    {
        field: "phoneNum",
        headerName: "Phone",
        type: "number",
        width: 150,
        editable: false,
    },
    {
        field: "desc",
        headerName: "Description",
        width: 250,
        editable: false,
    },
];

const NGOTable = () => {
    const [disable, setDisable] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [token, setToken] = React.useState(localStorage.getItem("token"));
    const [orgs, setOrgs] = React.useState();

    let instance = axios.create({
        baseURL: "http://127.0.0.1:3000",
        headers: {
            post: {
                "Content-Type": "application/json",
            },
            authorization: `Bearer ${token}`,
        },
    });

    const fetchNGOs = async () => {
        try {
            let res = await instance.get("/api/organizations");

            setOrgs(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteRows = () => {
        console.log(selectedRows);

        selectedRows.map(async (uname) => {
            try {
                let res = await instance.delete(`/api/organizations/${uname}`);

                console.log(res.data);
            } catch (e) {
                console.log(e);
            }

            fetchNGOs();
        });
    };

    React.useEffect(() => {
        selectedRows?.length == 0 ? setDisable(true) : setDisable(false);
    }, [selectedRows]);

    React.useEffect(() => {
        fetchNGOs();
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                height: "92vh",
                paddingX: "46px",
                position: "relative",
                zIndex: "10",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    marginTop: "104px",
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
                    <Tooltip title="Delete NGO">
                        <IconButton disabled={disable} onClick={deleteRows}>
                            <DeleteRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            {orgs && (
                <DataGrid
                    rows={orgs}
                    columns={columns}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) => row.username}
                    autoPageSize
                    checkboxSelection
                    onStateChange={(e) => {
                        setSelectedRows(e.selection);
                    }}
                    sx={{
                        backdropFilter: "blur(8px)",
                        borderTopLeftRadius: "0px",
                        borderTopRightRadius: "0px",
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
            )}
        </Box>
    );
};

export default NGOTable;
