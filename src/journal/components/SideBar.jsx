import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';

import { IconButton, Divider, List, Toolbar, Typography } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

export const SideBar = ({ handleDrawerClose, open }) => {
    const theme = useTheme();
    const { displayName } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);

    return (
        <Drawer variant="permanent" open={open}>

            <DrawerHeader>

                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        {
                            (displayName.length > 12) ?
                                displayName.substring(0, 12) + '...'
                            :   displayName
                        }
                    </Typography>
                </Toolbar>

                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>

            </DrawerHeader>
            <Divider />
            <List>
                {
                    notes.map(note => (
                        <SideBarItem key={note.id} {...note} open={open}/>
                    ))   
                }
            </List>
            <Divider />

        </Drawer>
    )
}
