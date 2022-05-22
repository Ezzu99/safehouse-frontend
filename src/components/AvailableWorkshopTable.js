import * as React from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Drawer } from "@mui/material";
import { purple, orange } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import { ColorButtonSolidOrange } from './ColorButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import RegistrationForm from './RegistrationForm';
import SendIcon from '@mui/icons-material/Send';
import WorkshopForm from './WorkshopForm';

let instance = axios.create({
    baseURL: 'http://safehouse.herokuapp.com',
    headers: {
        post: {
            'Content-Type': 'application/json'
        }
    }
});

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Workshop',
      width: 150,
      editable: false,
    },
    {
      field: 'instructor',
      headerName: 'Instructor Name',
      width: 150,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 710,
      editable: false,
    }
];

const rows = [
    { id: 1, name: 'Data Science', instructor: 'Jon', description: 'Master data science, Python & SQL, analyze & visualize data, build machine learning models' },
    { id: 2, name: 'Data Science', instructor: 'Cersei', description: 'Master data science, Python & SQL, analyze & visualize data, build machine learning models' },
    { id: 3, name: 'Data Science', instructor: 'Jaime', description: 'Master data science, Python & SQL, analyze & visualize data, build machine learning models' },
    { id: 4, name: 'Data Science', instructor: 'Arya', description: 'Master data science, Python & SQL, analyze & visualize data, build machine learning models' }
];

const AvailableWorkshopTable = (props) => {
    const [disable, setDisable] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [drawer, setDrawer] = React.useState(false);
    const [role, setrole] = React.useState();

    const deleteRows = (e) => {
        console.log(selectedRows);
    }

    React.useEffect(() => {
        selectedRows.length == 0 ? setDisable(true) : setDisable(false);
        setrole(localStorage.getItem('role'));
    }, [selectedRows]);

    return (
        <Box sx={{ 
                width: '100%',
                height: '75vh',
                position: 'relative',
                zIndex: '10',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box sx={{ padding: '6px', border: 'none', borderTop: 1, borderRight: 1, borderLeft: 1, borderColor: 'divider', borderTopRightRadius: '8px', borderTopLeftRadius: '8px', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {
                        (role != 'homeless') ?
                        <IconButton disabled={disable} onClick={deleteRows}>
                            <DeleteRoundedIcon />
                        </IconButton> :
                        <Button color='secondary' disabled={disable} startIcon={<SendIcon />} sx={{ margin: '3.5px' }}>Enroll</Button>
                    }
                </Box>
                    {
                        (role != 'homeless') ?
                        <Box sx={{ marginRight: '4px' }}>
                            <ColorButtonSolidOrange variant='contained' size='small' startIcon={<PersonAddAltRoundedIcon />} onClick={() => setDrawer(true)}>Add Workshop</ColorButtonSolidOrange>
                        </Box> : null
                    }
            </Box>
            <DataGrid
                rows={rows}
                columns={columns}
                rowsPerPageOptions={[5]}
                autoPageSize
                checkboxSelection
                onStateChange={(e) => setSelectedRows(e.selection)}
                sx={{
                    backdropFilter: 'blur(8px)',
                    borderTopLeftRadius: '0px',
                    borderTopRightRadius: '0px',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px',
                    '.MuiDataGrid-checkboxInput': {
                        color: purple[700],
                        '&.Mui-checked': {
                            color: purple[700]
                        }
                    },
                    '.MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                    '.MuiDataGrid-row': {
                        '&:hover': {
                            bgcolor: orange[800]+'20'
                        },
                        '&.Mui-selected': {
                            bgcolor: orange[800]+'20'
                        },
                        '&.Mui-selected:hover': {
                            bgcolor: orange[800]+'10'
                        },
                    },
                    '.MuiDataGrid-selectedRowCount': {
                        color: purple[700]
                    },
                    '.MuiDataGrid-filterIcon': {
                        color: orange[700]
                    },
                    '.MuiDataGrid-filterFormValueInput': {
                        '&.Mui-hover': {
                            color: purple[700]
                        }
                    }
                }}
            />
            <Drawer anchor='right' open={drawer} onBackdropClick={() => setDrawer(false)} sx={{ backdropFilter: 'blur(1px)', filter: 'none' }}>
                <WorkshopForm setDrawer={setDrawer}/>
            </Drawer>
        </Box>
    )
}

export default AvailableWorkshopTable;