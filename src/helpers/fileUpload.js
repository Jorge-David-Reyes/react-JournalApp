export const fileUpload = async(file) => {
    // if(!file) throw new Error("No tenemos ningun archivo a subir");
    if( !file ) return null;

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dzmld02wk/upload';

    const formData = new FormData(); // esto ya viene en javascript
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);
    

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        }); // esto es para hacer la peticion http

        // console.log(resp);
        if(!resp.ok) throw new Error('No se pudo subir la imagen'); // esto es para manejar errores
        
        const cloudResp = await resp.json(); // esto es para obtener la respuesta en formato json
        // console.log({cloudResp});
        
        return cloudResp.secure_url; // esto es para obtener la url de la imagen

    } catch (error) {
        // console.log(error);
        // throw new Error( error.message );
        return null;
    }
}