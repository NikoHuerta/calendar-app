import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

// const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

//     const url = `${ baseUrl }/${ endpoint }`;

//     if(method === 'GET'){
//         return fetch( url );
//     } else {
//         return fetch( url, {
//             method,
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify( data )
//         })
//     }
// };

const fetchAxios = async (endpoint, body='', method, params='', authToken='') => {
    
    const url = `${ baseUrl }/${ endpoint }`;
    let headers;

    if(authToken){
        headers = {'Content-type': 'application/json', 'x-api-key': authToken};
    }else{
        headers = { 'Content-type': 'application/json' };
    }

    try {
        return await axios({
            method,
            headers,
            params,
            url,
            data: JSON.stringify( body ),
        });
    } catch(err){
        return err.response;    
    }
}

export {
    // fetchSinToken,
    fetchAxios
}