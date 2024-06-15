import { useDispatch } from "react-redux"
import { startLogout } from "../../store/auth"

import { styled, useTheme } from '@mui/material/styles';
import { Grid, Toolbar, IconButton, Typography } from "@mui/material"
import MuiAppBar from '@mui/material/AppBar';

import { LogoutOutlined } from "@mui/icons-material"
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
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

export const NavBar = ({ handleDrawerOpen,  open }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const onLogout = () => {
        // console.log('Logout');
        dispatch( startLogout() );
    }

  return (
    <AppBar position="fixed" open={open}>
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'> JournalApp </Typography>
                <IconButton 
                    color='error'
                    onClick={ onLogout }
                >
                    <LogoutOutlined/>
                </IconButton>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}
