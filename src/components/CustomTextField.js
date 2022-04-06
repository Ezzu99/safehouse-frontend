import { styled, TextField } from "@mui/material";
import { purple, orange } from "@mui/material/colors";

const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: purple[600],
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
        borderColor: 'divider',
        },
        '&:hover fieldset': {
        borderColor: purple[600],
        },
        '&.Mui-focused fieldset': {
        borderColor: purple[600],
        },
    },
    backdropFilter: 'blur(6px)'
});

export default CustomTextField;