// import { MailOutline } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { startNewNote } from "../../store/journal/thunks";

export const JournalPage = () => {
  const { isSaving, active } = useSelector(state => state.journal);
  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch( startNewNote());
  }

  return (
    <JournalLayout>

      {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum minima tenetur laudantium consectetur quisquam! Natus nihil reprehenderit voluptate beatae impedit atque mollitia distinctio optio? Quisquam beatae officiis illum optio adipisci.</Typography> */}
    
      {/* NothingSelected */}
      {/* <NothingSelectedView/> */}

      {/* NoteView */}
      {/* <NoteView/> */}

      {
        // '!! sirve para convertir a booleano'
        (!!active) ? <NoteView/> : <NothingSelectedView/>
      }


      <IconButton
        onClick={ onClickNewNote }
        size='large'
        disabled={ isSaving }
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.8 },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{fontSize: 30}}/>
      </IconButton>

    </JournalLayout>
  )
}
