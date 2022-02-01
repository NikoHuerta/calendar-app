import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;

    if(method === 'GET'){
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        })
    }
};

const fetchAxios = async (endpoint, body='', method, params='', authToken='') => {
    
    const url = `${ baseUrl }/${ endpoint }`;
    try {
        return await axios({
            method,
            headers: {'Content-type': 'application/json'},
            params,
            url,
            data: JSON.stringify( body ),
        });
    } catch(err){
        return err.response;    
    }
}

export {
    fetchSinToken,
    fetchAxios
}