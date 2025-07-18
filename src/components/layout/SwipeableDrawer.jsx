import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List'; ``
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import navLinks from './NavLinks';
import { useLocation, useNavigate } from 'react-router-dom/dist';
import { Typography, styled } from '@mui/material';
import PropTypes from 'prop-types';
import { getSession } from '../../helpers/cookies';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const TemporaryDrawer = (props) => {
    const { open, toggle } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const activePage = location.pathname;
    const { user } = getSession();
    const protectedRoutes = {
        User: ["Dashboard", "Schedules", "Work Participants"],
        "Client Admin": ["Dashboard"],
        "Project Manager": ["Dashboard", "Schedules", "Work Participants", "Projects", "Tasks"],
        "Site Coordinator": ["Dashboard", "Schedules", "Work Participants", "DataBase"],
        "Site Manager": ["Dashboard", "Schedules", "Work Participants", "Tasks", "DataBase"],
        "Super Admin": ["Dashboard", "Schedules", "Work Participants", "Projects", "Tasks", "User Management", "Sites", "Work Package", "DataBase"]
    }

    const DrawerList = (
        <Box sx={{ width: 150, background: '#222', height: '100%' }} role="presentation" onClick={toggle}>
            <List>
                {navLinks?.filter(item => {
                    const { name } = item;
                    if (protectedRoutes[user?.roleName].includes(name)) {
                        return item
                    }
                })?.map((text, index) => (
                    <ListItem key={index} selected={activePage === text?.path} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                backgroundColor: activePage === text?.path ? '#767676' : '#222222',
                                minHeight: 48,
                                justifyContent: 'center',
                                px: 2.5,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            onClick={() => navigate(`${text.path}`)}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    justifyContent: 'center',
                                    color: '#ffffff',
                                    alignItems: 'center',
                                }}
                            >
                                {text?.icon}
                            </ListItemIcon>
                            {
                                open &&
                                <ListItemText primary={
                                    <Typography
                                        fontSize={12}
                                        color={'#fff    '}
                                    >
                                        {text.name}
                                    </Typography>
                                } sx={{ opacity: open ? 1 : 0 }} />}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer open={open} onClose={toggle}>
                <DrawerHeader
                    sx={{
                        background: '#222222',
                    }}
                >
                </DrawerHeader>
                {DrawerList}
            </Drawer>
        </div>
    );
}
TemporaryDrawer.propTypes = {
    open: PropTypes.any,
    toggle: PropTypes.any,
};
export default React.memo(TemporaryDrawer)