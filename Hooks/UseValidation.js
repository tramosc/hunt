import React, {useState, useEffect} from 'react';
//toma tres parametros 
//el state inicial donde comenzara el proceso -- stateInicial
//las reglas de validacion de cada elementos segun sea - - validar
//y la funccion que ejecutara en caso sea conveniente--funcion
const useValidacion = (stateInicial, validar, funcion) => {
    
    const[valores, guardarValores] = useState(stateInicial);
    const[errores, guardarErrores] = useState({});
    const[submitForm, guardarsubmitForm] = useState(false);

    useEffect(() =>{
        //Si hay algun error al momento de enviar al formulario ejecutar...
        if(submitForm){
            const noErrores = Object.keys(errores).length === 0;
            
            //Si no hay ningun error
            if(noErrores){
                funcion();//
            }
            guardarsubmitForm(false)
        }
    }, [errores]);

    //Funcion que se ejecuta conforme el usuario escribe algo
    //Lee lo que el usuario escribe en los formularios
    const HandleChange = e => {

        guardarValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }

    //Fn que se ejecuta cuando el usuario usa submit
    const handleSubmit = e => {
        e.preventDefault();

        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarsubmitForm(true);
    }

    //Cuando se cambia de input el error debe de desaparecer entiempo real

    const handleBlur = () =>{
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
    }

    return {
        valores, 
        errores, 
        submitForm, 
        handleSubmit, 
        HandleChange,

        handleBlur
    }
}
 
export default useValidacion;