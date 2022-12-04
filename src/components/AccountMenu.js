import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { purple } from "@mui/material/colors";

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [role, setRole] = React.useState(localStorage.getItem("role"));
    const open = Boolean(anchorEl);
    let router = useRouter();

    React.useEffect(() => {
        setName(
            role.toLowerCase() == "admin"
                ? "Admin"
                : localStorage.getItem("name")
        );
        setEmail(
            role.toLowerCase() == "admin"
                ? localStorage.getItem("username")
                : localStorage.getItem("email")
        );
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.setItem("name", "");
        localStorage.setItem("email", "");
        localStorage.setItem("token", "");
        localStorage.setItem("username", "");
        localStorage.setItem("role", "");
        localStorage.setItem("id", "");
        localStorage.setItem("loggedIn", false);

        router.replace("/");
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <Avatar
                        sx={{ width: 42, height: 42, bgcolor: purple[600] }}
                    >
                        {name[0]}
                    </Avatar>
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        minWidth: "200px",
                        overflow: "visible",
                        filter: "drop-shadow(0px 0px 8px rgba(0,0,0,0.12))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 20,
                            height: 4,
                            borderTopRightRadius: "8px",
                            borderTopLeftRadius: "8px",
                            bgcolor: "orange",
                            transform: "translate(-10%, -100%)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <Box
                    sx={{
                        paddingY: "6px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        variant="body"
                        sx={{
                            paddingX: "18px",
                            color: purple[600],
                            fontSize: "18px",
                            fontWeight: "bold",
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        variant="body"
                        sx={{
                            paddingX: "18px",
                            paddingBottom: "6px",
                            color: "#999",
                        }}
                    >
                        {email}
                    </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={() => router.push("/profile")}>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
