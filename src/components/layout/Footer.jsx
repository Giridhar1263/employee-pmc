import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/images/nav_logo.png';

const Footer = ({ color }) => {
    const { pathname } = useLocation();
    const isAbsolutePath = ["/", "/login", "/forgot-password"].includes(pathname);
    const showLogo = window.innerWidth < 769 || isAbsolutePath;

    const conditionalStyles = !isAbsolutePath ? { pr: { sm: 0, md: 6, lg: 6 } } : {};

    const Copyright = () => {
        return (
            <Typography
                variant="body2"
                color="#fff"
                fontWeight={'bold'}
                fontFamily="Raleway"
                sx={{ fontSize: { xs: 8, md: 10, lg: 10 } }}
            >
                {'Copyright © '}
                <Link color="inherit" href="https://navajna.com/">
                    navAjna Technologies
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    return (
        <Box
            component="footer"
            sx={{
                py: { sm: 0, md: 0.5, lg: 1 },
                backgroundColor: color,
                position: 'fixed',
                bottom: 0,
                width: '100%',
                textAlign: 'center',
                zIndex: 10,
            }}

        >
            <Container maxWidth="xxl">
                <Grid
                    container
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    sx={conditionalStyles}
                >
                    <Grid item>
                        {showLogo &&
                            <img src={logo} alt="navAjna Technologies" width={50} height={20} />
                        }
                    </Grid>
                    <Grid item>
                        <Copyright />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Footer;


