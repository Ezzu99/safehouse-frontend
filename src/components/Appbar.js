import { Badge, Box, Button, InputBase, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import AccountMenu from "./AccountMenu";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from "@mui/material";
import { orange } from "@mui/material/colors";
import { styled } from '@mui/material/styles';
import { ColorButtonTextPurple } from "./ColorButton";

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

const Appbar = ({ component }) => {
    let router = useRouter();

    return (
        <Box sx={{ paddingX: '46px', paddingY: (component == 'profile') ? '8px': '22px', bgcolor: '#ffffff50', backdropFilter: 'blur(14px)', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '46px' }}>
                {
                    (component == 'profile') ?
                    <ColorButtonTextPurple startIcon={<ArrowBackIosNewIcon size='small' />} onClick={() => router.push('/dashboard')} >Dashboard</ColorButtonTextPurple> : null
                }
                <Box sx={{ width: '270px', paddingX: '12px', paddingY: '8px', borderRadius: '8px', bgcolor: 'divider', backdropFilter: 'blur(24px)', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <SearchRoundedIcon sx={{ color: '#555', mr: 1 }} />
                    <InputBase id="input-with-sx" placeholder="Search" variant="standard" color="secondary"/>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                <IconButton>
                    <StyledBadge badgeContent={0}>
                        <NotificationsRoundedIcon fontSize="medium" sx={{ color: 'gray' }}/>
                    </StyledBadge>
                </IconButton>
                <IconButton>
                    <StyledBadge badgeContent={0}>
                        <ChatBubbleRoundedIcon fontSize="medium" sx={{ color: 'gray' }}/>
                    </StyledBadge>
                </IconButton>
                <AccountMenu />
            </Box>
        </Box>
    )
}

export default Appbar