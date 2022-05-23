import { BarChart, Bar, PieChart, Pie, LineChart, Line, Sector, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LabelList } from "recharts";
import { purple, orange } from "@mui/material/colors";
import { Box, Typography } from "@mui/material";
import * as React from "react";

const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Box sx={{ width: '140px', padding: '12px', bgcolor: '#FFFFFF', borderRadius: '6px', boxShadow: '0 10px 18px #33333350', display: 'flex', flexDirection: 'column' }} >
                <Box>
                    <Typography sx={{ color: purple[600] }} >{payload[0].payload.month}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Typography sx={{ color: '#555' }} >Applied: </Typography>
                    <Typography sx={{ color: '#555' }} >{payload[0].value[1]}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Typography sx={{ color: '#555' }} >Employed: </Typography>
                    <Typography sx={{ color: '#555' }} >{payload[0].value[0]}</Typography>
                </Box>
            </Box>
        );
    }
  
    return null;
};

const CustomPieTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Box sx={{ padding: '12px', bgcolor: '#FFFFFF', borderRadius: '6px', boxShadow: '0 10px 18px #33333350' }} >
                <Typography sx={{ color: '#555' }} >{payload[0].name}: {payload[0].value}</Typography>
            </Box>
        );
    }
  
    return null;
};

const CustomLineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        console.log(payload)
        return (
            <Box sx={{ width: '170px', padding: '12px', bgcolor: '#FFFFFF', borderRadius: '6px', boxShadow: '0 10px 18px #33333350', display: 'flex', flexDirection: 'column' }} >
                <Box>
                    <Typography sx={{ color: orange[600] }} >{payload[0].payload.month}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Typography sx={{ color: '#555' }} >{payload[0].name}: </Typography>
                    <Typography sx={{ color: '#555' }} >{payload[0].value}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Typography sx={{ color: '#555' }} >{payload[1].name}: </Typography>
                    <Typography sx={{ color: '#555' }} >{payload[1].value}</Typography>
                </Box>
            </Box>
        );
    }
  
    return null;
};

const renderActiveShape = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  
    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius-5}
                outerRadius={outerRadius+5}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill+'50'}
            />
        </g>
    );
};

const CustomBarChart = ({ jobs }) => {
    return (
        <>
            {
                (jobs?.length) ?
                <ResponsiveContainer width="100%" height="100%" >
                    <BarChart data={jobs} >
                        <Tooltip allowEscapeViewBox={{ y: false, x: false }} content={<CustomBarTooltip />} />
                        <Bar dataKey="job" fill={purple[600]} radius={[6, 6, 6, 6]} />
                    </BarChart>
                </ResponsiveContainer> :
                <ResponsiveContainer width="100%" height="100%" >
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant='body' color={purple[600]}>No data available</Typography>
                    </Box>
                </ResponsiveContainer>
            }
        </>
    );
}

const CustomPieChart = ({ courses }) => {
    const [activeIndex, setActiveIndex] = React.useState(null);

    const onPieEnter = (data, index) => setActiveIndex(index);

    const onPieLeave = () => setActiveIndex(null);

    return (
        <>
            {
                (courses?.length) ?
                <ResponsiveContainer width="100%" height="100%" >
                    <PieChart>
                        <Tooltip allowEscapeViewBox={{ y: false, x: false }} content={<CustomPieTooltip />} />
                        <Pie activeIndex={activeIndex} activeShape={renderActiveShape} data={courses} dataKey="value" nameKey="name" cx="50%" cy="50%" stroke="none" outerRadius={100} innerRadius={60} paddingAngle={3} fill={orange[600]} onMouseEnter={onPieEnter} onMouseLeave={onPieLeave} />
                    </PieChart>
                </ResponsiveContainer> :
                <ResponsiveContainer width="100%" height="100%" >
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant='body' color={orange[600]}>No data available</Typography>
                    </Box>
                </ResponsiveContainer>
            }
        </>
    );
}

const CustomLineGraph = ({ users }) => {
    return (
        <>
            {
                (users?.length) ?
                <ResponsiveContainer>
                    <LineChart width={730} height={250} data={users} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
                        <Tooltip allowEscapeViewBox={{ y: false, x: false }} content={<CustomLineTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="Joined" stroke={orange[600]} strokeWidth={4} />
                        <Line type="monotone" dataKey="Rehablitated" stroke={purple[600]} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer> :
                <ResponsiveContainer width="100%" height="100%" >
                    <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant='body' color={orange[600]}>No data available</Typography>
                    </Box>
                </ResponsiveContainer>
            }
        </>
    );
}

export { CustomBarChart, CustomPieChart, CustomLineGraph };