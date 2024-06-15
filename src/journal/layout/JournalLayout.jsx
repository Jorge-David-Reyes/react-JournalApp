import { useState } from 'react';
import { NavBar, SideBar } from "../components"

import { Box } from "@mui/material"
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const JournalLayout = ({children}) => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ display: 'flex'}} className='animate__animated animate__fadeIn animate__faster'>
        <CssBaseline />
        {/* NavBar drawerWidth */}
        <NavBar open={ open } handleDrawerOpen={ handleDrawerOpen } />

        {/* Sidebar drawerWidth */}
        <SideBar open={ open } handleDrawerClose={handleDrawerClose} />

        {/* Main */}

        <Box
            component='main'
            sx={{flexGrow:1, p: 3}}
        >
            <DrawerHeader />

            { children }
        </Box>
    </Box>
  )
}
