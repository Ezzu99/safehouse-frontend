import * as React from "react";
import axios from "axios";
import { Box, Typography, Snackbar } from "@mui/material";
import CustomTextField from "./CustomTextField";
import MuiAlert from "@mui/material/Alert";
import { purple } from "@mui/material/colors";
import {
    ColorButtonSolidOrange,
    ColorButtonOutlinedOrange,
} from "./ColorButton";
import styles from "../../styles/Home.module.css";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const JobForm = (props) => {
    const [cname, setCname] = React.useState("");
    const [ename, setEname] = React.useState("");
    const [url, setURL] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [openAlertSnack, setOpenAlertSnack] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("Job Added!");
    const [autoHideDuration, setAutoHideDuration] = React.useState(6000);
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

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenAlertSnack(false);
    };

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            let res = await instance.post("/api/jobs", {
                name: cname,
                employer: ename,
                desc: description,
                url,
                lister: localStorage.getItem("username"),
            });

            console.log(res.data);
            setAlertMessage("Job Added!");
            props.fetchJobs();
        } catch (e) {
            console.log(e);
            setAlertMessage("Error adding job!");
        }

        setOpenAlertSnack(true);
    };

    return (
        <Box
            sx={{
                paddingX: "46px",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box className={[styles.bgimage, styles.bgimage3]}></Box>
            <Box
                sx={{
                    height: "90px",
                    display: "flex",
                    alignItems: "center",
                    textTransform: "capitalize",
                }}
            >
                <Typography variant="h5" fontWeight="bold" color={purple[600]}>
                    Add Job
                </Typography>
            </Box>
            <Box
                sx={{
                    marginBottom: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "12px" }}
                >
                    <CustomTextField
                        sx={{ flexGrow: 1 }}
                        label="Job name"
                        color="secondary"
                        onChange={(e) => setCname(e.target.value)}
                    />
                    <CustomTextField
                        sx={{ flexGrow: 1 }}
                        label="Employer name"
                        color="secondary"
                        onChange={(e) => setEname(e.target.value)}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                    }}
                >
                    <CustomTextField
                        fullWidth
                        label="Job URL"
                        color="secondary"
                        onChange={(e) => setURL(e.target.value)}
                    />
                    <CustomTextField
                        fullWidth
                        multiline
                        rows={6}
                        label="Description"
                        color="secondary"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <ColorButtonSolidOrange
                    size="large"
                    fullWidth
                    onClick={submitForm}
                >
                    Add
                </ColorButtonSolidOrange>
                <ColorButtonOutlinedOrange
                    size="medium"
                    fullWidth
                    onClick={() => props.setDrawer(false)}
                >
                    Cancel
                </ColorButtonOutlinedOrange>
            </Box>
            <Snackbar
                open={openAlertSnack}
                autoHideDuration={autoHideDuration}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default JobForm;
