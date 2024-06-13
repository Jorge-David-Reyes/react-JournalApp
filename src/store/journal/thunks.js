
import { doc, collection, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from "./";
import { loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        //TODO: tarea dispatch
        dispatch( savingNewNote() )

        // console.log('startNewNote');
        // uid
        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes`) );
        const setDocResp = await setDoc( newDoc, newNote );

        console.log({newDoc, setDocResp});

        //!dispatch
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ));
        // dispatch( activarNote )
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no existe');

        // console.log({uid})
        const notes = await loadNotes( uid );

        dispatch( setNotes(notes))
    }
}


export const startSaveNote = () => {
    return async( dispatch, getState ) => {
        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}` );
        await setDoc( docRef, noteToFirestore, { merge:true }); // merge, es para que no borre los campos que no se estan actualizando
        
        dispatch( updateNote( note ) );
    }
}