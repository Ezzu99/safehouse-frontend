import * as React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Drawer } from "@mui/material";
import { purple, orange } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { ColorButtonSolidOrange } from "./ColorButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import RegistrationForm from "./RegistrationForm";

const columns = [
    {
        field: "firstname",
        headerName: "First name",
        width: 150,
        editable: false,
    },
    {
        field: "lastname",
        headerName: "Last name",
        width: 150,
        editable: false,
    },
    {
        field: "email",
        headerName: "Email",
        width: 200,
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
        field: "address",
        headerName: "Address",
        width: 250,
        editable: false,
    },
];

const DataTable = (props) => {
    const [users, setUsers] = React.useState();
    const [disable, setDisable] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [drawer, setDrawer] = React.useState(false);
    const [token, setToken] = React.useState(localStorage.getItem("token"));

    let instance = axios.create({
        baseURL: "http://127.0.0.1:3000/api",
        headers: {
            post: {
                "Content-Type": "application/json",
            },
            authorization: `Bearer ${token}`,
        },
    });

    const fetchUsers = async () => {
        try {
            let res = await instance.get("/users");

            console.log(res.data);
            setUsers(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteRows = (e) => {
        console.log(selectedRows);

        selectedRows.map(async (uname) => {
            try {
                let res = await instance.delete(`/users/user/${uname}`);

                console.log(res.data);
            } catch (e) {
                console.log(e);
            }

            fetchUsers();
        });
    };

    React.useEffect(() => {
        selectedRows?.length == 0 ? setDisable(true) : setDisable(false);
    }, [selectedRows]);

    React.useEffect(() => {
        fetchUsers();
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
                    <IconButton disabled={disable} onClick={deleteRows}>
                        <DeleteRoundedIcon />
                    </IconButton>
                </Box>
                <Box sx={{ marginRight: "4px" }}>
                    <ColorButtonSolidOrange
                        variant="contained"
                        size="small"
                        startIcon={<PersonAddAltRoundedIcon />}
                        onClick={() => setDrawer(true)}
                    >
                        Add {props.table}
                    </ColorButtonSolidOrange>
                </Box>
            </Box>
            {users && (
                <DataGrid
                    rows={users}
                    columns={columns}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) => row.username}
                    autoPageSize
                    checkboxSelection
                    onStateChange={(e) => setSelectedRows(e.selection)}
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
            <Drawer
                anchor="right"
                open={drawer}
                onBackdropClick={() => setDrawer(false)}
                sx={{ backdropFilter: "blur(1px)", filter: "none" }}
            >
                <RegistrationForm
                    role={props.table}
                    setDrawer={setDrawer}
                    fetchUsers={fetchUsers}
                />
            </Drawer>
        </Box>
    );
};

export default DataTable;
