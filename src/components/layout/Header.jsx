import React from 'react';
import PropTypes from 'prop-types';
// import { styled } from '@mui/material/styles';
// import Toolbar from '@mui/material/Toolbar';
// import MenuIcon from '@mui/icons-material/Menu';
// import MuiAppBar from '@mui/material/AppBar';
// // import IconButton from '@mui/material/IconButton';
// // import Grid from '@mui/material/Grid/Grid';
// import { Menu, MenuItem } from '@mui/material';
// import Person2Icon from '@mui/icons-material/Person2';
import { clearSession } from '../../helpers/cookies';
// import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import logo from '../../assets/images/nav_logo.png'
import { AppBar, Grid, IconButton, styled, Menu, Toolbar, MenuItem } from '@mui/material';
import { AlignHorizontalLeftOutlined, AlignHorizontalRightOutlined, Person2 } from '@mui/icons-material';

const drawerWidth = 200;

const HeaderTheme = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = ({ open, toggle }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const OpenMenu = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event?.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <HeaderTheme position="fixed" open={open} elevation={0}
      sx={{
        background: '#222222',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggle}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          {open ? <AlignHorizontalLeftOutlined /> : <AlignHorizontalRightOutlined />}
        </IconButton>
        <Grid
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            width: '100%',
          }}
        >
          <img src={logo} width={'50px'} style={{ objectFit: 'contain' }} />
          {/* <img src={colab} width={'70px'} style={{ objectFit: 'contain', }} /> */}
        </Grid>
        <Grid>
          <IconButton
            sx={{
              color: '#3A464E',
              background: 'linear-gradient(360deg,#000000 0%, #ffffff 100%)',
            }}
            onClick={handleClick}>
            <Person2 />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={OpenMenu}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {/* <MenuItem onClick={() => { navigate('/profile'); handleClose() }} sx={{
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>Profile</MenuItem> */}
            <MenuItem
              sx={{
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
              onClick={() => {
                clearSession(true)
              }}
            >Logout
            </MenuItem>
          </Menu>
        </Grid>
      </Toolbar>
    </HeaderTheme>
  )
}

Header.propTypes = {
  open: PropTypes.any,
  handleDrawerOpen: PropTypes.any
};

export default React.memo(Header)