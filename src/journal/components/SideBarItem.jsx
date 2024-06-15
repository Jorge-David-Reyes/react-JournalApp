import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';

import { ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';



export const SideBarItem = ({ title = '', body, id, date, imageUrls = [], open }) => {
    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch( setActiveNote({title, body, id, date, imageUrls}));
    }

    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;
    }, [title]);

    const newBody = useMemo(() => {
        return body.length > 17
            ? body.substring(0, 17) + '...'
            : body;
    }, [body]);

  return (
    // <ListItem disablePadding>
    //     <ListItemButton onClick={ onClickNote }>
    //         <ListItemIcon>
    //             <TurnedInNot/>
    //         </ListItemIcon>
    //         <Grid container>
    //             <ListItemText primary={ newTitle }/>
    //             <ListItemText secondary={body} />
    //         </Grid>
    //     </ListItemButton>
    // </ListItem>



<ListItem key={title} disablePadding sx={{ display: 'block' }}>
    <ListItemButton
    onClick={ onClickNote }
    sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
    }}
    >
        <ListItemIcon
            sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
            }}
        >
            <TurnedInNot />
            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
        </ListItemIcon>
        <ListItemText primary={newTitle} sx={{ opacity: open ? 1 : 0 }} />
        {/* <ListItemText secondary={newBody} sx={{ opacity: open ? 1 : 0 }}/> */}
    </ListItemButton>
</ListItem>
  )
}
