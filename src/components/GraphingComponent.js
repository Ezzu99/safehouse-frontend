import * as React from "react";
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import HeadingFont from "../fonts/fonts";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { purple, orange } from "@mui/material/colors";
import {
    CustomBarChart,
    CustomPieChart,
    CustomLineGraph,
} from "./CustomCharts";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    borderRadius: "8px",
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const GraphingComponent = () => {
    const [name, setName] = React.useState();

    React.useEffect(() => {
        setName(localStorage.getItem("name"));
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                paddingX: "46px",
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                position: "relative",
                zIndex: "10",
            }}
        >
            <ThemeProvider theme={HeadingFont}>
                <Typography
                    variant="h4"
                    sx={{ marginTop: "104px", color: "#333", fontSize: "bold" }}
                >
                    Hi, Welcome back
                </Typography>
            </ThemeProvider>
            <Box
                sx={{ flexGrow: 1, paddingTop: "12px", paddingBottom: "80px" }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Item
                            sx={{
                                bgcolor: "transparent",
                                backdropFilter: "blur(10px)",
                                boxShadow: "0 10px 18px #ccc",
                            }}
                        >
                            <Box
                                sx={{
                                    height: "370px",
                                    padding: "12px",
                                    bgcolor: purple[800] + "20",
                                    borderRadius: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{
                                        paddingX: "6px",
                                        color: purple[700],
                                        textAlign: "left",
                                    }}
                                >
                                    Jobs
                                </Typography>
                                <Box sx={{ flexGrow: 1 }}>
                                    <CustomBarChart />
                                </Box>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item
                            sx={{
                                bgcolor: "transparent",
                                backdropFilter: "blur(10px)",
                                boxShadow: "0 10px 18px #ccc",
                            }}
                        >
                            <Box
                                sx={{
                                    height: "370px",
                                    padding: "12px",
                                    bgcolor: orange[800] + "20",
                                    borderRadius: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{
                                        paddingX: "6px",
                                        color: orange[700],
                                        textAlign: "left",
                                    }}
                                >
                                    Courses
                                </Typography>
                                <Box sx={{ flexGrow: 1 }}>
                                    <CustomPieChart />
                                </Box>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item
                            sx={{
                                bgcolor: "transparent",
                                backdropFilter: "blur(10px)",
                                boxShadow: "0 10px 18px #ccc",
                            }}
                        >
                            <Box
                                sx={{
                                    height: "340px",
                                    padding: "12px",
                                    bgcolor: orange[800] + "20",
                                    borderRadius: "8px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Box
                                    sx={{
                                        paddingX: "6px",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        sx={{ color: orange[700] }}
                                    >
                                        Users
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        fontWeight="light"
                                        sx={{ color: orange[700] }}
                                    >
                                        527 Current users
                                    </Typography>
                                </Box>
                                <Box sx={{ flexGrow: 1 }}>
                                    <CustomLineGraph />
                                </Box>
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default GraphingComponent;
