import * as React from 'react';
import axios from 'axios';
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material';
import HeadingFont from '../fonts/fonts';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { purple, orange } from '@mui/material/colors';
import { CustomBarChart, CustomPieChart, CustomLineGraph } from './CustomCharts';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    borderRadius: '8px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const GraphingComponent = () => {
    const [jobs, setJobs] = React.useState();
    const [courses, setCourses] = React.useState();
    const [users, setUsers] = React.useState();

    React.useEffect(() => {
        try {
            (async () => {
                const res = await axios.get('http://0f07-125-209-114-66.ngrok.io/api/statistics', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                // let res = await instance.post('/v1/login/', {
                    //     username,
                    //     password
                    // })
                    // let res = {
                    //     data: {
                    //         jobs: [
                    //             {
                    //                 "month": "Jan",
                    //                 "job": [
                    //                     2,
                    //                     10
                    //                 ]
                    //             },
                    //             {
                    //                 "month": "Feb",
                    //                 "job": [
                    //                     7,
                    //                     15
                    //                 ]
                    //             },
                    //             {
                    //                 "month": "Mar",
                    //                 "job": [
                    //                     9,
                    //                     15
                    //                 ]
                    //             },
                    //             {
                    //                 "month": "Apr",
                    //                 "job": [
                    //                     12,
                    //                     18
                    //                 ]
                    //             },
                    //             {
                    //                 "month": "May",
                    //                 "job": [
                    //                     17,
                    //                     21
                    //                 ]
                    //             },
                    //             {
                    //                 "month": "Jun",
                    //                 "job": [
                    //                     10,
                    //                     17
                    //                 ]
                    //             },
                    //             {
                    //                 "month": "Jul",
                    //                 "job": [
                    //                     7,
                    //                     15
                    //                 ]
                    //             },
                    //             {
                    //                 "month": "Aug",
                    //                 "job": [
                    //                     3,
                    //                     10
                    //                 ]
                    //             },
                    //             {
                    //                 "month": "Sep",
                    //                 "job": [
                    //                     1,
                    //                     8
                    //                 ]
                    //             }
                    //         ],
                    //         courses: [
                    //             {
                    //                 "name": "Applied",
                    //                 "value": 400
                    //             },
                    //             {
                    //                 "name": "Enrolled",
                    //                 "value": 200
                    //             },
                    //             {
                    //                 "name": "Completed",
                    //                 "value": 300
                    //             }
                    //         ],
                    //         users: [
                    //             {
                    //                 "month": "Jan",
                    //                 "Rehablitated": 400,
                    //                 "Joined": 240
                    //             },
                    //             {
                    //                 "month": "Feb",
                    //                 "Rehablitated": 300,
                    //                 "Joined": 139
                    //             },
                    //             {
                    //                 "month": "Mar",
                    //                 "Rehablitated": 200,
                    //                 "Joined": 980
                    //             },
                    //             {
                    //                 "month": "Apr",
                    //                 "Rehablitated": 278,
                    //                 "Joined": 390
                    //             },
                    //             {
                    //                 "month": "May",
                    //                 "Rehablitated": 189,
                    //                 "Joined": 480
                    //             },
                    //             {
                    //                 "month": "Jun",
                    //                 "Rehablitated": 239,
                    //                 "Joined": 380
                    //             },
                    //             {
                    //                 "month": "Jul",
                    //                 "Rehablitated": 349,
                    //                 "Joined": 430
                    //             }
                    //         ]
                    //     }
                    // }

                    console.log(res.data);
                    setJobs(res.data.jobs);
                    setCourses(res.data.courses);
                    setUsers(res.data.users);
            })();
        }
        catch {

        }
    }, []);

    return (
        <Box sx={{ width: '100%', height: '100vh', paddingX: '46px', display: 'flex', flexDirection: 'column', overflow: 'auto', position: 'relative', zIndex: '10' }}>
            <ThemeProvider theme={HeadingFont}>
                <Typography variant="h4" sx={{ marginTop: '104px', color: '#333', fontSize: 'bold' }}>Hi, Welcome back</Typography>
            </ThemeProvider>
            <Box sx={{ flexGrow: 1, paddingTop: '12px', paddingBottom: '80px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Item sx={{ bgcolor: 'transparent', backdropFilter: 'blur(10px)', boxShadow: '0 10px 18px #ccc' }}>
                            <Box sx={{ height: '370px', padding: '12px', bgcolor: purple[800]+'20', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
                                <Typography variant='h6' fontWeight='bold' sx={{ paddingX: '6px', color: purple[700], textAlign: 'left' }}>Jobs</Typography>
                                <Box sx={{ flexGrow: 1 }}>
                                    <CustomBarChart jobs={jobs} />
                                </Box>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item sx={{ bgcolor: 'transparent', backdropFilter: 'blur(10px)', boxShadow: '0 10px 18px #ccc' }}>
                            <Box sx={{ height: '370px', padding: '12px', bgcolor: orange[800]+'20', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
                                <Typography variant='h6' fontWeight='bold' sx={{ paddingX: '6px', color: orange[700], textAlign: 'left' }}>Courses</Typography>
                                <Box sx={{ flexGrow: 1 }}>
                                    <CustomPieChart courses={courses} />
                                </Box>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item sx={{ bgcolor: 'transparent', backdropFilter: 'blur(10px)', boxShadow: '0 10px 18px #ccc' }}>
                            <Box sx={{ height: '340px', padding: '12px', bgcolor: orange[800]+'20', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ paddingX: '6px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant='h6' fontWeight='bold' sx={{ color: orange[700] }}>Users</Typography>
                                    {
                                        (users?.length) ?
                                        <Typography variant='h6' fontWeight='light' sx={{ color: orange[700] }}>14500 Current users</Typography> : null
                                    }
                                </Box>
                                <Box sx={{ flexGrow: 1 }}>
                                    <CustomLineGraph users={users} />
                                </Box>
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default GraphingComponent;