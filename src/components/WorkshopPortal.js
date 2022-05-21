import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';
import AppliedWorkshopTable from './AppliedWorkshopTable';
import AvailableWorkshopTable from './AvailableWorkshopTable';

const WorkshopPortal = () => {
    const [selected1, setselected1] = React.useState(['outlined', true]);
    const [selected2, setselected2] = React.useState(['text', false]);
    const [role, setrole] = React.useState();

    const handleButton = (e) => {
        console.log(e);
        if (e.target.innerText == 'APPLIED WORKSHOPS') {
            setselected1(['text', false]);
            setselected2(['outlined', true]);
        }
        else {
            setselected2(['text', false]);
            setselected1(['outlined', true]);
        }
    }

    React.useEffect(() => {
        setrole(localStorage.getItem('role'));
    }, [])

    return (
        <Box sx={{ width: '100%', height: '100vh', paddingX: '46px', display: 'flex', flexDirection: 'column', overflow: 'auto', position: 'relative', zIndex: '10' }}>
            {
                (role == 'homeless') ?
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
                    <Button color='warning' variant={selected1[0]} sx={{ marginTop: '104px' }} onClick={handleButton}>Available Workshops</Button>
                    <Button color='warning' variant={selected2[0]} sx={{ marginTop: '104px' }} onClick={handleButton}>Applied Workshops</Button>
                </Box> : null
            }
            <Box sx={{ marginTop: (role == 'homeless') ? '12px' : '104px' }}>
                {
                    (selected1[1]) ?
                    <AvailableWorkshopTable /> :
                    <AppliedWorkshopTable />
                }
            </Box>
        </Box>
    );
}

export default WorkshopPortal;