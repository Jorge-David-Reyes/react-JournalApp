import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
   name: 'journal',
   initialState: {
       isSaving: false,
       messageSaved: '',
       notes: [],
       active: null,
    //    active: {
    //         id: 'ABC123',
    //         title: '',
    //         body: '',
    //         date: 1234567,
    //         imageUrls: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
    //    }
   },
   reducers: {
      savingNewNote: (state) => {
            state.isSaving = true;
      },
      addNewEmptyNote: ( state, action ) => {
            state.notes.push(action.payload);
            state.isSaving = false;
      },
      setActiveNote: ( state, action ) => {
            // console.log(action)
            state.active = action.payload;
            state.messageSaved = ''; 
      },
      setNotes: ( state, action ) => {
            state.notes = action.payload;
      },
      setSaving: ( state ) => {
            state.isSaving = true;
            // TODO: mensaje de error...
            state.messageSaved = ''; 
      },
      updateNote: ( state, action ) => { //payload : note
            state.isSaving = false;
            state.notes = state.notes.map( note => {

                  if(note.id === action.payload.id){
                        return action.payload;
                  }

                  return note;
            });

            state.messageSaved = `${ action.payload.title }, actualizada correctamente`;

      },
      setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
      },
      clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
      },
      deleteNoteById: ( state, action ) => {
            state.notes = state.notes.filter( note => note.id !== action.payload );
            state.active = null;
      },
   }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    setActiveNote,
    savingNewNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    clearNotesLogout,
    deleteNoteById,
} = journalSlice.actions;