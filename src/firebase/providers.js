import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true, 
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}


export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        //TODO: actualizar el displayName en Firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) { // TODO: manejar errores
        // console.log(error);
        return { ok: false, errorMessage: error.message }
    }

}

export const loginWithEmailPassword = async({email, password}) => {
    //! signWithEmailAndPassword
    try{
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        console.log(resp.user)
        const { displayName, photoURL, uid } = resp.user;

        return {
            ok: true,
            displayName, photoURL, email, uid
        }

    }catch(error){
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }
}