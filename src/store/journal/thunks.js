
import { doc, collection, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { deleteNoteById, addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote, setPhotosToActiveNote } from "./";
import { loadNotes, fileUpload } from "../../helpers";

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
            imageUrls: [],
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

export const startUploadingFiles = ( files = []) => {

    return async( dispatch, getState ) => {
        dispatch(setSaving());

        await fileUpload( files[0] );

        // Dispara en secuencia todas las promesas de las imagenes a subir
        // Ya que si se hace con un forEach, se disparan todas las promesas al mismo tiempo 
        // y se espera una respuesta de todas, lo cual no es lo que se quiere
        
        const fileUploadPromises = [];
        for(const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        // console.log(photosUrls);
    
        dispatch( setPhotosToActiveNote( photosUrls ) );
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        // console.log(uid, note);
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch( deleteNoteById(note.id) );
    }
}