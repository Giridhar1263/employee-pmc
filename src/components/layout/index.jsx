import * as React from 'react';
// import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Header from './Header';
import SideNav from './SideNav';
import TemporaryDrawer from './SwipeableDrawer';
import StickyFooter from './Footer';
// import { SwipeableDrawer } from '@mui/material';

const OutletStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Layout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen(!open);

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#ffffff', height: `${window.innerHeight}px` }}>
      <Header toggle={toggle} />
      {window.innerWidth > 768 &&
        <SideNav open={open} toggle={toggle} />
      }
      <Box component="main" sx={{ width: '100%' }}>
        {window.innerWidth <= 768 &&
          <TemporaryDrawer open={open} toggle={toggle} />
        }
        <OutletStyle />
        {children}
        <StickyFooter color="#222222" />
      </Box>
    </Box>
  );
}
export default Layout