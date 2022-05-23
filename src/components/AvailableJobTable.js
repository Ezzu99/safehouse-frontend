import * as React from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Drawer } from "@mui/material";
import { purple, orange } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import { ColorButtonSolidOrange } from './ColorButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import SendIcon from '@mui/icons-material/Send';
import JobForm from './JobForm';

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
      headerName: 'Job',
      width: 150,
      editable: false,
    },
    {
      field: 'employer',
      headerName: 'Employer',
      width: 150,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
      editable: false,
    }
];

const AvailableJobTable = (props) => {
    const [disable, setDisable] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [drawer, setDrawer] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [role, setrole] = React.useState();

    const deleteRows = (e) => {
        console.log(selectedRows);
    }

    React.useEffect(() => {
        selectedRows.length == 0 ? setDisable(true) : setDisable(false);
        setrole(localStorage.getItem('role'));

        try {
            // let res = await instance.post('/v1/login/', {
                //     username,
                //     password
                // })
                let res = {
                    data: {
                        rows: [
                            { id: 1, description: 'ReactJS', name: 'Astera', employer: 'John' },
                            { id: 2, description: 'AngularJS', name: 'Motive', employer: 'John' },
                            { id: 3, description: 'VueJS', name: 'Brainx', employer: 'John' },
                            { id: 4, description: 'Python', name: 'Arya', employer: 'Cena' },
                            { id: 5, description: 'C++', name: 'Daenerys', employer: 'Cena' },
                            { id: 6, description: 'NodeJS', name: 'Flex', employer: 'Cena' },
                            { id: 7, description: 'JavaScript', name: 'Astera', employer: 'Cena' }
                        ]
                    }
                }

                setRows(res.data.rows);
        }
        catch {

        }
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
                        <Button color='secondary' disabled={disable} startIcon={<SendIcon />} sx={{ margin: '3.5px' }}>Apply</Button>
                    }
                </Box>
                    {
                        (role != 'homeless') ?
                        <Box sx={{ marginRight: '4px' }}>
                            <ColorButtonSolidOrange variant='contained' size='small' startIcon={<PersonAddAltRoundedIcon />} onClick={() => setDrawer(true)}>Add Job</ColorButtonSolidOrange>
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
                <JobForm setDrawer={setDrawer}/>
            </Drawer>
        </Box>
    )
}

export default AvailableJobTable;