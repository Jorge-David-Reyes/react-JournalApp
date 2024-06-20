import { fileUpload } from "../../../src/helpers/fileUpload";

describe('Pruebas en fileUpload', () => {
    test('debe de subir el archivo correctamente a cloudinary', async() => {
        const imageUrl = "https://images.unsplash.com/photo-1609562043569-56735626cf02?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        const resp = await fetch(imageUrl);
        const blob = await resp.blob(); // blob: es un objeto que representa un archivo y permite trabajar con el contenido de un archivo
        const file = new File([blob], 'foto.png'); // 
        
        const url = await fileUpload(file);
        expect( typeof url ).toBe('string');
    });

    test('debe de retornar un null', async() => {
        const file = new File([], 'foto.png');
        const url = await fileUpload(file);
        expect( url ).toBe(null);
    });
});