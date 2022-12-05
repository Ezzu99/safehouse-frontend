import * as React from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { purple, orange } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material";
import HeadingFont from "../src/fonts/fonts";
import GraphingComponent from "../src/components/GraphingComponent";
import DataTable from "../src/components/DataTable";
import styles from "../styles/Home.module.css";
import Appbar from "../src/components/Appbar";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import WorkIcon from "@mui/icons-material/Work";
import WorkshopPortal from "../src/components/WorkshopPortal";
import JobPortal from "../src/components/JobPortal";
import NGOTable from "../src/components/NGOTable";
import AffiliationRequestTable from "../src/components/AffiliationRequestTable";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

const Sidebar = () => {
    const [name, setName] = React.useState(localStorage.getItem("name"));
    const [role, setRole] = React.useState(localStorage.getItem("role"));
    const [ngo, setNgo] = React.useState(localStorage.getItem("ngo"));
    const [value, setValue] = React.useState(0);
    let router = useRouter();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        setRole(localStorage.getItem("role"));
        setName(localStorage.getItem("name"));
        setNgo(localStorage.getItem("ngo"));

        if (!JSON.parse(localStorage.getItem("loggedIn"))) {
            router.replace("/");
        }
    }, []);

    return (
        <Box
            sx={{
                bgcolor: "white",
                display: "flex",
                height: "100vh",
                width: "100%",
                flexDirection: "row",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    width: "270px",
                    height: "100vh",
                    boxShadow: "10px 0 24px -8px #dedede",
                    backdropFilter: "blur(3px)",
                    position: "relative",
                    zIndex: 20,
                }}
            >
                <Box
                    sx={{
                        height: "90px",
                        paddingX: "46px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ThemeProvider theme={HeadingFont}>
                        <Typography
                            variant="h4"
                            color={purple[600]}
                            sx={{ fontWeight: "bold" }}
                        >
                            SafeHouse
                        </Typography>
                    </ThemeProvider>
                </Box>
                <Box
                    sx={{
                        marginTop: "12px",
                        marginBottom: "28px",
                        marginX: "24px",
                        paddingX: "22px",
                        paddingY: "20px",
                        bgcolor: orange[800] + "20",
                        borderRadius: "8px",
                    }}
                >
                    <Typography
                        variant="body1"
                        color={orange[600]}
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                        {role == "admin" ? "Admin" : role == "ngo" ? name : ngo}
                    </Typography>
                </Box>
                {role.toLowerCase() == "ngo" ? (
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        textColor="secondary"
                        TabIndicatorProps={{
                            style: {
                                background: purple[600],
                                width: "3.5px",
                                borderTopLeftRadius: "8px",
                                borderBottomLeftRadius: "8px",
                            },
                        }}
                        onChange={handleChange}
                        sx={{ flexGrow: 1 }}
                    >
                        <Tab
                            label="Dashboard"
                            icon={
                                <DashboardRoundedIcon
                                    fontSize="small"
                                    sx={{ marginTop: "4px" }}
                                />
                            }
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "8px",
                                paddingLeft: "20px",
                            }}
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="Users"
                            icon={
                                <PeopleAltRoundedIcon
                                    fontSize="small"
                                    sx={{ marginTop: "4px" }}
                                />
                            }
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "8px",
                                paddingLeft: "20px",
                            }}
                            {...a11yProps(1)}
                        />
                        {/* <Tab
                            label="Listers"
                            icon={
                                <PeopleAltRoundedIcon
                                    fontSize="small"
                                    sx={{ marginTop: "4px" }}
                                />
                            }
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "8px",
                                paddingLeft: "20px",
                            }}
                            {...a11yProps(2)}
                        /> */}
                    </Tabs>
                ) : role.toLowerCase() == "user" ? (
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        textColor="secondary"
                        TabIndicatorProps={{
                            style: {
                                background: purple[600],
                                width: "3.5px",
                                borderTopLeftRadius: "8px",
                                borderBottomLeftRadius: "8px",
                            },
                        }}
                        onChange={handleChange}
                        sx={{ flexGrow: 1 }}
                    >
                        <Tab
                            label="Workshops"
                            icon={
                                <AssignmentTurnedInIcon
                                    fontSize="small"
                                    sx={{ marginTop: "4px" }}
                                />
                            }
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "8px",
                                paddingLeft: "20px",
                            }}
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="Jobs"
                            icon={
                                <WorkIcon
                                    fontSize="small"
                                    sx={{ marginTop: "4px" }}
                                />
                            }
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "8px",
                                paddingLeft: "20px",
                            }}
                            {...a11yProps(1)}
                        />
                    </Tabs>
                ) : role.toLowerCase() == "lister" ? (
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        textColor="secondary"
                        TabIndicatorProps={{
                            style: {
                                background: purple[600],
                                width: "3.5px",
                                borderTopLeftRadius: "8px",
                                borderBottomLeftRadius: "8px",
                            },
                        }}
                        onChange={handleChange}
                        sx={{ flexGrow: 1 }}
                    >
                        <Tab
                            label="Workshops"
                            icon={
                                <AssignmentTurnedInIcon
                                    fontSize="small"
                                    sx={{ marginTop: "4px" }}
                                />
                            }
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "8px",
                                paddingLeft: "20px",
                            }}
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="Jobs"
                            icon={
                                <WorkIcon
                                    fontSize="small"
                                    sx={{ marginTop: "4px" }}
                                />
                            }
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "8px",
                                paddingLeft: "20px",
                            }}
                            {...a11yProps(1)}
                        />
                    </Tabs>
                ) : role.toLowerCase() == "admin" ? (
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        textColor="secondary"
                        TabIndicatorProps={{
                            style: {
                                background: purple[600],
                                width: "3.5px",
                                borderTopLeftRadius: "8px",
                                borderBottomLeftRadius: "8px",
                            },
                        }}
                        onChange={handleChange}
                        sx={{ flexGrow: 1 }}
                    >
                        <Tab
                            label="NGOs"
                            icon={
                                <AssignmentTurnedInIcon
                                    fontSize="small"
                                    sx={{ marginTop: "4px" }}
                                />
                            }
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "8px",
                                paddingLeft: "20px",
                            }}
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="Affiliation Requests"
                            icon={
                                <WorkIcon
                                    fontSize="small"
                                    sx={{ marginTop: "4px" }}
                                />
                            }
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "8px",
                                paddingLeft: "20px",
                            }}
                            {...a11yProps(1)}
                        />
                    </Tabs>
                ) : null}
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box className={[styles.bgimage, styles.bgimage2]}></Box>
                <Box
                    sx={{
                        width: "100%",
                        height: "40px",
                        position: "relative",
                        zIndex: 15,
                    }}
                >
                    <Appbar />
                </Box>
                <TabPanel value={value} index={0}>
                    {role.toLowerCase() == "ngo" ? (
                        <GraphingComponent />
                    ) : role.toLowerCase() == "admin" ? (
                        <NGOTable />
                    ) : (
                        <WorkshopPortal />
                    )}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {role.toLowerCase() == "ngo" ? (
                        <DataTable table="user" />
                    ) : role.toLowerCase() == "admin" ? (
                        <AffiliationRequestTable />
                    ) : (
                        <JobPortal />
                    )}
                </TabPanel>
                {/* <TabPanel value={value} index={2}>
                    {role.toLowerCase() == "ngo" ? (
                        <DataTable table="lister" />
                    ) : null}
                </TabPanel> */}
            </Box>
        </Box>
    );
};

export default Sidebar;
