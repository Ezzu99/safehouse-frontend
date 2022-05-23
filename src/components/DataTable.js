import * as React from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Drawer } from "@mui/material";
import { purple, orange } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import { ColorButtonSolidOrange } from './ColorButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import RegistrationForm from './RegistrationForm';

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
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: false,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: false,
    }
];

const DataTable = (props) => {
    const [disable, setDisable] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [drawer, setDrawer] = React.useState(false);
    const [rows, setRows] = React.useState([]);

    const deleteRows = (e) => {
        console.log(selectedRows);
    }

    React.useEffect(() => {
        selectedRows.length == 0 ? setDisable(true) : setDisable(false);

        try {
            // let res = await instance.post('/v1/login/', {
                //     username,
                //     password
                // })
                let res = {
                    data: {
                        rows: [
                            { id: 1, lastName: 'Black', firstName: 'John', age: 35 },
                            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                            { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
                            { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 22 },
                            { id: 6, lastName: 'Melisandre', firstName: 'Alex', age: 15 },
                            { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
                            { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
                            { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
                            { id: 10, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
                            { id: 11, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
                            { id: 12, lastName: 'Stark', firstName: 'Arya', age: 16 },
                            { id: 13, lastName: 'Targaryen', firstName: 'Daenerys', age: 22 },
                            { id: 14, lastName: 'Melisandre', firstName: 'Alex', age: 15 },
                            { id: 15, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
                            { id: 16, lastName: 'Frances', firstName: 'Rossini', age: 36 },
                            { id: 17, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
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
                height: '92vh',
                paddingX: '46px',
                position: 'relative',
                zIndex: '10',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box sx={{ marginTop: '104px', padding: '6px', border: 'none', borderTop: 1, borderRight: 1, borderLeft: 1, borderColor: 'divider', borderTopRightRadius: '8px', borderTopLeftRadius: '8px', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton disabled={disable} onClick={deleteRows}>
                        <DeleteRoundedIcon />
                    </IconButton>
                </Box>
                <Box sx={{ marginRight: '4px' }}>
                    <ColorButtonSolidOrange variant='contained' size='small' startIcon={<PersonAddAltRoundedIcon />} onClick={() => setDrawer(true)}>Add {props.table}</ColorButtonSolidOrange>
                </Box>
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
                <RegistrationForm role={props.table} setDrawer={setDrawer} />
            </Drawer>
        </Box>
    )
}

export default DataTable;