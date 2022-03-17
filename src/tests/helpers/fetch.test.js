import { fetchAxios } from "../../helpers/fetch";

describe('Pruebas en helper fetch', () => {

    let token = '';


    test('Fetch axios (sin token) debe de funcionar correctamente', async() => {  
        const resp = await fetchAxios('auth', { email: "nhuertaf@icloud.com", password: "35571e9cc" }, 'POST');
        expect(resp.data.ok).toBe(true);
        token = resp.data.token;

    });

    test('Fetch axios (con token) debe de funcionar correctamente', async() => {  
        
        localStorage.setItem('token', token);
        const resp = await fetchAxios('eventos/61fd45cdaf48d7340d769f91', {}, 'DELETE', {}, localStorage.getItem('token'));
        expect(resp.data.msg).not.toEqual('No hay token de autorización en request');
        expect(resp.data.msg).not.toEqual('Token no válido -- token invalido');

    });

});
