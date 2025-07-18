import React from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom/dist';
import { useLocation } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import navLinks from './NavLinks';
import { Tooltip, Typography } from '@mui/material';
import { getSession } from '../../helpers/cookies';
import logo from '../../assets/images/nav_logo.png';

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const openedMixin = (theme) => ({
  width: drawerWidth,
  border: '0px',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  border: '0px',
  width: window.innerWidth < 768 ? 0 : `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: window.innerWidth < 768 ? 0 : `calc(${theme.spacing(8)} + 1px)`,
  },
});

const drawerWidth = 90;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));


const SideNav = ({ open, toggle }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const activePage = location.pathname;
  const splitPath = activePage.split('/');
  const subPath = splitPath[splitPath.length - 1];
  const { user } = getSession();
  const protectedRoutes = {
    User: ["Dashboard", "Schedules", "Work Participants"],
    "Client Admin": ["Dashboard"],
    "Project Manager": ["Dashboard", "Schedules", "Work Participants", "Projects", "Tasks"],
    "Site Coordinator": ["Dashboard", "Schedules", "Work Participants", "DataBase"],
    "Site Manager": ["Dashboard", "Schedules", "Work Participants", "Tasks", "DataBase"],
    "Super Admin": ["Dashboard", "Schedules", "Work Participants", "Projects", "Tasks", "User Management", "Sites", "Work Package", "DataBase"]
  }
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader
        sx={{
          background: '#222222',
        }}
      >
        <IconButton
          sx={{
            ...(!open && { display: 'none' }),
            color: '#ffffff',
            border: '1px solid #ffffff',
          }}
          onClick={toggle}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>

      <List className='scroll-style'
        sx={{
          backgroundColor: '#222222',
          color: '#ffffff',
          height: `${window.innerHeight}px`,
          alignItems: 'center',
          overflowY: 'auto',
        }}
      >
        {navLinks?.filter(item => {
          const { name } = item;
          if (protectedRoutes[user?.roleName].includes(name)) {
            return item
          }
        })?.map((text, index) => (
          <ListItem key={index} selected={text?.subpath?.includes(subPath)} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                backgroundColor: text?.subpath?.includes(subPath) ? '#767676' : '#222222',
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onClick={() => navigate(`${text.path}`)}
            >
              <Tooltip title={!open ? text?.name : ''} arrow>
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
              </Tooltip>

              {open &&
                <ListItemText
                  sx={{ opacity: open ? 1 : 0 }}
                  primary={
                    <Typography fontSize={9}>
                      {text.name}
                    </Typography>
                  }
                />
              }
            </ListItemButton>
          </ListItem>
        ))}

        {window.innerWidth > 768 &&
          <img
            src={logo}
            alt="Logo"
            width={20}
            style={{
              background: '#222222',
              position: 'fixed',
              top: window.innerHeight - 25,
              left: 6,
              bottom: 0,
              objectFit: 'contain',
            }}
          />
        }

      </List>
    </Drawer>
  )
}

SideNav.propTypes = {
  open: PropTypes.boolean,
  toggle: PropTypes.any
};

export default SideNav