import { useMemo, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { SaveOutlined } from "@mui/icons-material"
import { Grid, Typography, Button, TextField } from "@mui/material"
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from "../../hooks"
import { ImageGallery } from "../components"
import { setActiveNote, startSaveNote } from "../../store/journal"

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved } = useSelector( state => state.journal );
    const { body, title, date, onInputChange, formState } = useForm( note );
    
    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date]);

    useEffect(() =>{
        dispatch( setActiveNote( formState ) );
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
          Swal.fire('Updated note', messageSaved, 'success');
        }
      }, [messageSaved]);

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

  return (
    <Grid 
        className='animate__animated animate__fadeIn animate__faster'
        container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        sx={{mb: 1}}
    >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
        </Grid>

        <Grid item>
            <Button 
            onClick = { onSaveNote }
            color="primary" 
            sx={{padding: 2}}
            >
                <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label="Título"
                sx={{border: 'none', mb: 1}}
                name="title"
                value={ title }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline 
                placeholder="¿Que sucedio en el dia de hoy?"
                minRows = { 5 }
                name="body"
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>

        {/* Image gallery */}
        <ImageGallery/>
    </Grid>
  )
}
