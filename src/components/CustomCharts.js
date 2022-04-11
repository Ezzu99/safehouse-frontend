import { BarChart, Bar, PieChart, Pie, LineChart, Line, Sector, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LabelList } from "recharts";
import { purple, orange } from "@mui/material/colors";
import { Box, Typography } from "@mui/material";
import * as React from "react";

const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Box sx={{ width: '140px', padding: '12px', bgcolor: '#FFFFFFee', borderRadius: '6px', boxShadow: '0 0 18px #33333350', display: 'flex', flexDirection: 'column' }} >
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
            <Box sx={{ padding: '12px', bgcolor: '#FFFFFFee', borderRadius: '6px', boxShadow: '0 0 18px #33333350' }} >
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
            <Box sx={{ width: '170px', padding: '12px', bgcolor: '#FFFFFFee', borderRadius: '6px', boxShadow: '0 0 18px #33333350', display: 'flex', flexDirection: 'column' }} >
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

const rangeData = [
    {
        "month": "Jan",
        "job": [
            2,
            10
        ]
    },
    {
        "month": "Feb",
        "job": [
            7,
            15
        ]
    },
    {
        "month": "Mar",
        "job": [
            9,
            15
        ]
    },
    {
        "month": "Apr",
        "job": [
            12,
            18
        ]
    },
    {
        "month": "May",
        "job": [
            17,
            21
        ]
    },
    {
        "month": "Jun",
        "job": [
            10,
            17
        ]
    },
    {
        "month": "Jul",
        "job": [
            7,
            15
        ]
    },
    {
        "month": "Aug",
        "job": [
            3,
            10
        ]
    },
    {
        "month": "Sep",
        "job": [
            1,
            8
        ]
    }
];

const data = [
    {
        "name": "Applied",
        "value": 400
    },
    {
        "name": "Enrolled",
        "value": 200
    },
    {
        "name": "Completed",
        "value": 300
    }
];

const users = [
    {
        "month": "Jan",
        "Rehablitated": 400,
        "Joined": 240
    },
    {
        "month": "Feb",
        "Rehablitated": 300,
        "Joined": 139
    },
    {
        "month": "Mar",
        "Rehablitated": 200,
        "Joined": 980
    },
    {
        "month": "Apr",
        "Rehablitated": 278,
        "Joined": 390
    },
    {
        "month": "May",
        "Rehablitated": 189,
        "Joined": 480
    },
    {
        "month": "Jun",
        "Rehablitated": 239,
        "Joined": 380
    },
    {
        "month": "Jul",
        "Rehablitated": 349,
        "Joined": 430
    }
];

const CustomBarChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%" >
            <BarChart data={rangeData} >
                <Tooltip allowEscapeViewBox={{ y: false, x: false }} content={<CustomBarTooltip />} />
                <Bar dataKey="job" fill={purple[600]} radius={[6, 6, 6, 6]} />
            </BarChart>
        </ResponsiveContainer>
    );
}

const CustomPieChart = () => {
    const [activeIndex, setActiveIndex] = React.useState(null);

    const onPieEnter = (data, index) => setActiveIndex(index);

    const onPieLeave = () => setActiveIndex(null);

    return (
        <ResponsiveContainer width="100%" height="100%" >
            <PieChart>
                <Tooltip allowEscapeViewBox={{ y: false, x: false }} content={<CustomPieTooltip />} />
                <Pie activeIndex={activeIndex} activeShape={renderActiveShape} data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={60} paddingAngle={3} fill={orange[600]} onMouseEnter={onPieEnter} onMouseLeave={onPieLeave} />
            </PieChart>
        </ResponsiveContainer>
    );
}

const CustomLineGraph = () => {
    return (
        <ResponsiveContainer>
            <LineChart width={730} height={250} data={users} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
                <Tooltip allowEscapeViewBox={{ y: false, x: false }} content={<CustomLineTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="Joined" stroke={orange[600]} strokeWidth={4} />
                <Line type="monotone" dataKey="Rehablitated" stroke={purple[600]} strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
}

export { CustomBarChart, CustomPieChart, CustomLineGraph };