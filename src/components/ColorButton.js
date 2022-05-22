import { Button } from "@mui/material";
import { purple, orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const ColorButtonSolidPurple = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[700]),
    backgroundImage: `linear-gradient(90deg, ${purple[500]}, ${purple[700]})`,
    '&:hover': {
        backgroundImage: `linear-gradient(90deg, ${purple[600]}, ${purple[800]})`,
    },
    textTransform: 'capitalize',
}));
  
const ColorButtonOutlinedPurple = styled(Button)(({ theme }) => ({
    color: purple[700],
    outline: 'none',
    backgroundColor: 'transparent',
    backdropFilter: 'blur(10px)',
    border: `1px solid ${purple[700]}`,
    '&:hover': {
        backgroundColor: '#6a1b9a20',
        outline: 'none',
        border: `1px solid ${purple[800]}`
    },
    textTransform: 'capitalize',
}));

const ColorButtonSolidOrange = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundImage: `linear-gradient(90deg, ${orange[500]}, ${orange[700]})`,
    '&:hover': {
        backgroundImage: `linear-gradient(90deg, ${orange[600]}, ${orange[800]})`,
    },
    textTransform: 'capitalize',
}));

const ColorButtonOutlinedOrange = styled(Button)(({ theme }) => ({
    color: orange[600],
    border: `1px solid ${orange[600]}`,
    backgroundColor: 'transparent',
    backdropFilter: 'blur(10px)',
    '&:hover': {
        backgroundColor: '#ef6c0020',
        outline: 'none',
        border: `1px solid ${orange[800]}`
    },
    textTransform: 'capitalize',
}));

export { ColorButtonSolidPurple, ColorButtonOutlinedPurple, ColorButtonSolidOrange, ColorButtonOutlinedOrange };