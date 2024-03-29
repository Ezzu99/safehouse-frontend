import * as React from "react";
import axios from "axios";
import {
    Box,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    Typography,
    Snackbar,
} from "@mui/material";
import CustomTextField from "./CustomTextField";
import MuiAlert from "@mui/material/Alert";
import { purple } from "@mui/material/colors";
import {
    ColorButtonSolidOrange,
    ColorButtonOutlinedOrange,
} from "./ColorButton";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import styles from "../../styles/Home.module.css";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RegistrationForm = (props) => {
    const [token, setToken] = React.useState(localStorage.getItem("token"));
    const [ngoUsername, setNgoUsername] = React.useState(
        localStorage.getItem("username")
    );
    const [fname, setFname] = React.useState("");
    const [lname, setLname] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [cPassword, setCPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [role, setRole] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [dob, setdob] = React.useState();
    const [phone, setPhone] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [openAlertSnack, setOpenAlertSnack] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState(
        "Passwords do not match!"
    );
    const [autoHideDuration, setAutoHideDuration] = React.useState(6000);

    let instance = axios.create({
        baseURL: "http://127.0.0.1:3000/api",
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

        var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        if (
            !fname ||
            !lname ||
            !username ||
            !password ||
            !email ||
            !role ||
            !gender ||
            !dob ||
            !phone ||
            !address
        ) {
            setAutoHideDuration(6000);
            setAlertMessage("Please fill all fields!");
            setOpenAlertSnack(true);
        } else if (!password.match(regex)) {
            setAutoHideDuration(10000);
            setAlertMessage(
                "Password must contain 6 to 20 characters, at least 1 numeric digit, and at least 1 uppercase and lowercase letter!"
            );
            setOpenAlertSnack(true);
        } else if (password != cPassword) {
            setAutoHideDuration(6000);
            setAlertMessage("Passwords do not match!");
            setOpenAlertSnack(true);
        }

        try {
            let res = await instance.post("/signup/ngo", {
                username,
                password,
                firstname: fname,
                lastname: lname,
                email,
                gender: gender.toUpperCase(),
                profileImage: "",
                phoneNum: phone,
                address,
                dateOfBirth: dob,
                role: role,
                orgUsername: ngoUsername,
            });

            console.log(res.data);
            props.fetchUsers();
        } catch (e) {
            console.log(e);
        }
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
                    Register User
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
                        label="First name"
                        color="secondary"
                        onChange={(e) => setFname(e.target.value)}
                    />
                    <CustomTextField
                        sx={{ flexGrow: 1 }}
                        label="Last name"
                        color="secondary"
                        onChange={(e) => setLname(e.target.value)}
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
                        label="Username"
                        color="secondary"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <CustomTextField
                        fullWidth
                        label="Password"
                        type="password"
                        color="secondary"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <CustomTextField
                        fullWidth
                        label="Confirm password"
                        type="password"
                        color="secondary"
                        onChange={(e) => setCPassword(e.target.value)}
                    />
                </Box>
                <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "12px" }}
                >
                    <CustomTextField
                        sx={{ flexGrow: 1 }}
                        label="Email"
                        type="email"
                        color="secondary"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormControl>
                        <InputLabel color="secondary">Role</InputLabel>
                        <Select
                            sx={{
                                width: "130px",
                                backdropFilter: "blur(10px)",
                                "&:hover": {
                                    "&& fieldset": { borderColor: purple[600] },
                                },
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        "& .MuiMenuItem-root.Mui-selected": {
                                            backgroundColor: purple[100],
                                        },
                                    },
                                },
                            }}
                            color="secondary"
                            label="Role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value="USER">User</MenuItem>
                            <MenuItem value="LISTER">Lister</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "12px" }}
                >
                    <CustomTextField
                        label="Phone number"
                        type="number"
                        color="secondary"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                            label="Date of Birth"
                            inputFormat="dd/MM/yyyy"
                            openTo="year"
                            value={dob}
                            onChange={(value) => {
                                var date = new Date(value);
                                var year = date.getFullYear();
                                var month = ("0" + (date.getMonth() + 1)).slice(
                                    -2
                                );
                                var day = ("0" + date.getDate()).slice(-2);

                                setdob(`${year}-${month}-${day}`);
                            }}
                            renderInput={(params) => (
                                <CustomTextField
                                    color="secondary"
                                    {...params}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Box>
                <Box
                    sx={{ display: "flex", flexDirection: "row", gap: "12px" }}
                >
                    <FormControl>
                        <InputLabel color="secondary">Gender</InputLabel>
                        <Select
                            sx={{
                                width: "130px",
                                backdropFilter: "blur(10px)",
                                "&:hover": {
                                    "&& fieldset": { borderColor: purple[600] },
                                },
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        "& .MuiMenuItem-root.Mui-selected": {
                                            backgroundColor: purple[100],
                                        },
                                    },
                                },
                            }}
                            color="secondary"
                            label="Gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <CustomTextField
                        sx={{ flexGrow: 1 }}
                        label="Address"
                        color="secondary"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <ColorButtonSolidOrange
                    size="large"
                    fullWidth
                    onClick={submitForm}
                >
                    Register
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
                    severity="warning"
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default RegistrationForm;
