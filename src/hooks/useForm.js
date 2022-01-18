import { useState } from "react"

export const useForm = (initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);
    
    const reset = () => {
        setValues( initialState );
    }

    const handleInputChange = (e) => {
        if(typeof (e.target) != "undefined"){
            setValues({
                ...values,
                [e.target.name]: e.target.value
            });
        }else{
            setValues({
                ...values,
                start: e.start,
                end: e.end
            })
        }
    };

    return [values, handleInputChange, reset];

}