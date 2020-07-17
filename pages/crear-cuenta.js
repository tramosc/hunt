import React from 'react';
import Layout from '../components/layouts/layout';
import {Formulario, Campo, InputSubmit,Error} from '../components/UI/Formulario';
import {css} from '@emotion/core';

import firebase from '../firebase/index';

//Validaciones
import useValidacion from '../Hooks/UseValidation';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const STATE_INICIAL = {
    nombre: '',
    email: '',
    password: ''
}

const CrearCuenta = () => {

    const {
        valores, 
        errores, 
        submitForm, 
        handleSubmit, 
        HandleChange,
        handleBlur
    } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

    const {nombre, email, password} = valores;
    
    
    async function crearCuenta(){
        try{
            await firebase.registrar(nombre, email, password)
        }
        catch(error){
            console.error("Hubo un error al crear el usuario", error);
        }
    }

    return(
        <div>
            <Layout>
                <>
            <h1
                css={css`
                    text-align: center;
                    margin-top: 5rem;
                `}
            >Crear Cuenta</h1>
            <Formulario
            onSubmit={handleSubmit}
            >
                <Campo>
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                    type="text"
                    id="nombre"
                    placeholder="Tu nombre"
                    name="nombre"
                    value={nombre}
                    onChange={HandleChange}
                    onBlur={handleBlur}
                    />
                </Campo>
            {errores.nombre && <Error>{errores.nombre}</Error>}
                <Campo>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email"
                    id="email"
                    placeholder="Tu email"
                    name="email"
                    value={email}
                    onChange={HandleChange}
                    onBlur={handleBlur}
                    />
                </Campo>
            {errores.email && <Error>{errores.email}</Error>}
                <Campo>
                    <label htmlFor="password">Contraseña</label>
                    <input 
                    type="password"
                    id="password"
                    placeholder="Tu Contraseña"
                    name="password"
                    value={password}
                    onChange={HandleChange}
                    onBlur={handleBlur}
                    />
                </Campo>
            {errores.password && <Error>{errores.password}</Error>}    
        
                <InputSubmit
                    type="submit"
                    value="Crear Cuenta"
                />
        
            </Formulario>
                </>
            </Layout>
        </div>)
}
export default CrearCuenta;