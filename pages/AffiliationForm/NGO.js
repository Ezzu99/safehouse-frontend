import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { ColorButtonSolidOrange } from "../../src/components/ColorButton";
import { Typography } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { purple } from "@mui/material/colors";

const NGO = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [address, setAddress] = React.useState("");

  const [disableLogin, setDisableLogin] = React.useState(false);
  const [openErrorSnack, setOpenErrorSnack] = React.useState(false);
  const [openAlertSnack, setOpenAlertSnack] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(
    "Enter username and password!"
  );
  const [autoHideDuration, setAutoHideDuration] = React.useState(6000);
  const [userid, setUserid] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [type, setType] = React.useState("");

  const options = [
    { label: "Active", id: 1 },
    { label: "Non-Active", id: 2 },
  ];

  return (
    <Box
      sx={{
        width: "800px",
        padding: "18px",
        bgcolor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 18px #ccc",
        position: "absolute",
        left: "350px",
        top: "45px",
      }}
    >
      <Typography
        align="center"
        sx={{
          color: "purple",
          fontWeight: "1000",
          fontSize: "40px",
          padding: "10px",
        }}
      >
        Affiliation Form
      </Typography>
      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TextField
              sx={{ width: "350px", margin: "15px" }}
              id="outlined-basic"
              label="Ngo Name"
              variant="outlined"
              required
            />
            <TextField
              sx={{ width: "350px", margin: "15px" }}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              required
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TextField
              sx={{ width: "350px", margin: "15px" }}
              id="outlined-basic"
              label="Ngo Email"
              variant="outlined"
              required
            />
            <TextField
              sx={{ width: "350px", margin: "15px" }}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              required
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              fullWidth
              sx={{ margin: "15px", paddingRight: "30px" }}
              id="outlined-basic"
              label="Ngo Description"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              sx={{ margin: "15px", paddingRight: "30px" }}
              id="outlined-basic"
              label="Ngo Address"
              variant="outlined"
              required
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TextField
              sx={{ width: "350px", margin: "15px" }}
              id="outlined-basic"
              label="Ngo Website URL"
              variant="outlined"
              required
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={options}
              sx={{ width: "350px", margin: "15px" }}
              renderInput={(params) => <TextField {...params} label="Status" />}
            />
          </Box>
        </Box>
        <ColorButtonSolidOrange
          sx={{
            width: "735px",
            margin: "15px",
            fontWeight: "bold",
            fontSize: "20px",
          }}
          id="loginButton"
          size="large"
          variant="contained"
        >
          Login
        </ColorButtonSolidOrange>
      </form>
    </Box>
  );
};

export default NGO;
