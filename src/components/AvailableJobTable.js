import * as React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Drawer } from "@mui/material";
import { purple, orange } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { ColorButtonSolidOrange } from "./ColorButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import SendIcon from "@mui/icons-material/Send";
import JobForm from "./JobForm";

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
        headerName: "Job Name",
        width: 150,
        editable: false,
    },
    {
        field: "employer",
        headerName: "Employer",
        width: 150,
        editable: false,
    },
    {
        field: "Job URL",
        headerName: "url",
        width: 150,
        editable: false,
    },
    {
        field: "desc",
        headerName: "Description",
        width: 150,
        editable: false,
    },
];

const AvailableJobTable = (props) => {
    const [jobs, setJobs] = React.useState([]);
    const [disable, setDisable] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [drawer, setDrawer] = React.useState(false);
    const [role, setrole] = React.useState(localStorage.getItem("role"));
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

    const fetchJobs = async () => {
        try {
            let res = await instance.get("/api/jobs");

            console.log(res.data);
            setJobs(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteRows = async (id) => {
        console.log(selectedRows);

        try {
            let res = await instance.delete(`/api/jobs/${id}`);

            console.log(res.data);
            fetchJobs();
        } catch (e) {
            console.log(e);
        }
    };

    React.useEffect(() => {
        selectedRows.length == 0 ? setDisable(true) : setDisable(false);
        setrole(localStorage.getItem("role"));
    }, [selectedRows]);

    React.useEffect(() => {
        fetchJobs();
    }, []);

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
                    {role.toLowerCase() != "user" ? (
                        <IconButton disabled={disable} onClick={deleteRows}>
                            <DeleteRoundedIcon />
                        </IconButton>
                    ) : (
                        <Button
                            color="secondary"
                            disabled={disable}
                            startIcon={<SendIcon />}
                            sx={{ margin: "3.5px" }}
                        >
                            Apply
                        </Button>
                    )}
                </Box>
                {role.toLowerCase() != "user" ? (
                    <Box sx={{ marginRight: "4px" }}>
                        <ColorButtonSolidOrange
                            variant="contained"
                            size="small"
                            startIcon={<PersonAddAltRoundedIcon />}
                            onClick={() => setDrawer(true)}
                        >
                            Add Job
                        </ColorButtonSolidOrange>
                    </Box>
                ) : null}
            </Box>
            <DataGrid
                rows={jobs}
                columns={columns}
                rowsPerPageOptions={[5]}
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
            <Drawer
                anchor="right"
                open={drawer}
                onBackdropClick={() => setDrawer(false)}
                sx={{ backdropFilter: "blur(1px)", filter: "none" }}
            >
                <JobForm setDrawer={setDrawer} fetchJobs={fetchJobs} />
            </Drawer>
        </Box>
    );
};

export default AvailableJobTable;
