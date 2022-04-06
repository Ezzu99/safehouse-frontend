import { Badge, Box, InputBase } from "@mui/material";
import AccountMenu from "./AccountMenu";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import { IconButton } from "@mui/material";
import { orange } from "@mui/material/colors";
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        border: '2px solid white',
        top: 2,
        right: 0.5,
        color: 'white',
        backgroundColor: orange[600],
        padding: '0 4px',
    },
}));

const Appbar = () => {
    return (
        <Box sx={{ paddingX: '46px', paddingY: '12px', backdropFilter: 'blur(14px)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{ width: '270px', paddingX: '12px', paddingTop: '8px', paddingBottom: '6px', borderRadius: '8px', bgcolor: 'divider', backdropFilter: 'blur(24px)', display: 'flex', alignItems: 'flex-end' }}>
                <SearchRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <InputBase id="input-with-sx" placeholder="Search" variant="standard" color="secondary"/>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                <IconButton>
                    <StyledBadge badgeContent={3}>
                        <NotificationsRoundedIcon fontSize="medium" sx={{ color: 'gray' }}/>
                    </StyledBadge>
                </IconButton>
                <IconButton>
                    <StyledBadge badgeContent={4}>
                        <ChatBubbleRoundedIcon fontSize="medium" sx={{ color: 'gray' }}/>
                    </StyledBadge>
                </IconButton>
                <AccountMenu />
            </Box>
        </Box>
    )
}

export default Appbar