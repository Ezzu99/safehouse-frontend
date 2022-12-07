import * as React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Drawer } from "@mui/material";
import { purple, orange } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { ColorButtonSolidOrange } from "./ColorButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import RegistrationForm from "./RegistrationForm";
import SendIcon from "@mui/icons-material/Send";
import WorkshopForm from "./WorkshopForm";

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "name",
        headerName: "Course Name",
        width: 150,
        editable: false,
    },
    {
        field: "instructor",
        headerName: "Instructor Name",
        width: 150,
        editable: false,
    },
    {
        field: "url",
        headerName: "Course URL",
        width: 150,
        editable: false,
    },
    {
        field: "desc",
        headerName: "Description",
        width: 710,
        editable: false,
    },
];

const AvailableWorkshopTable = (props) => {
    const [courses, setCourses] = React.useState([]);
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

    const fetchWorkshops = async () => {
        try {
            let res = await instance.get("/api/courses");

            console.log(res.data);
            setCourses(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteRows = () => {
        console.log(selectedRows);

        selectedRows.map(async (id, index) => {
            try {
                let res = await instance.delete(`/api/courses/${id}`);

                console.log(res.data);
                fetchWorkshops();
            } catch (e) {
                console.log(e);
            }
        });
    };

    React.useEffect(() => {
        selectedRows.length == 0 ? setDisable(true) : setDisable(false);
        setrole(localStorage.getItem("role"));
    }, [selectedRows]);

    React.useEffect(() => {
        fetchWorkshops();
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
                    {role != "user" ? (
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
                            Enroll
                        </Button>
                    )}
                </Box>
                {role != "user" ? (
                    <Box sx={{ marginRight: "4px" }}>
                        <ColorButtonSolidOrange
                            variant="contained"
                            size="small"
                            startIcon={<PersonAddAltRoundedIcon />}
                            onClick={() => setDrawer(true)}
                        >
                            Add Workshop
                        </ColorButtonSolidOrange>
                    </Box>
                ) : null}
            </Box>
            <DataGrid
                rows={courses}
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
                <WorkshopForm
                    setDrawer={setDrawer}
                    fetchWorkshops={fetchWorkshops}
                />
            </Drawer>
        </Box>
    );
};

export default AvailableWorkshopTable;
