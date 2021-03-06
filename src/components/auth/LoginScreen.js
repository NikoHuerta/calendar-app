import React from 'react';
import './login.css';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import validator from 'validator';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLoginButton, FacebookLoginButton } from "react-social-login-buttons";

import { useForm } from '../../hooks/useForm';
import { startFacebookLogin, startGoogleLogin, startLogin, startRegister } from '../../actions/auth';


export const LoginScreen = () => {

    const dispatch = useDispatch();
    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: 'nhuertaf@icloud.com',
        lPassword: '123456'
    });

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: 'Nicolas',
        rEmail: 'nicolas@test.com',
        rPassword1: '123456',
        rPassword2: '123456'
    });

    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;
    const { lEmail, lPassword } = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLogin( lEmail, lPassword ) );
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if( rPassword1 !== rPassword2 )
            return Swal.fire('Error', 'Las contraseñas tienen que ser iguales', 'error');
        if( !validator.isEmail( rEmail ))
            return Swal.fire('Error', 'El correo es inválido', 'error')
        if( !validator.isLength( rName, { min:6, max: undefined }) )
            return Swal.fire('Error', 'El nombre debe ser de mas de 6 caracteres', 'error');
        
        dispatch( startRegister(rEmail, rPassword1, rName) );
    }

    const handleGoogleLogin = ( response ) => {
        const { tokenId } = response;
        dispatch( startGoogleLogin(tokenId) );
    };

    const handleFacebookLogin = ( response ) => {
        const { accessToken, name, email } = response;
        dispatch( startFacebookLogin(accessToken, name, email) );
    };


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <label htmlFor="loginEmail" className="form-label">Email Address</label>
                            <input
                                id="loginEmail" 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="loginPassword" className="form-label">Password</label>
                            <input
                                id="loginPassword"
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>

                        <div className="form-group mt-4 text-center">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>

                    </form>
                </div>

                <div className="col-md-6 login-form-2 text-light">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <label htmlFor="registerName" className="form-label">Nombre</label>
                            <input
                                id="registerName"
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name = "rName"
                                value = { rName }
                                onChange = { handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="registerEmail" className="form-label">Email Address</label>
                            <input
                                id="registerEmail"
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name = "rEmail"
                                value = { rEmail }
                                onChange = { handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="registerPassword" className="form-label">Password</label>
                            <input
                                id="registerPassword"
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name = "rPassword1"
                                value = { rPassword1 }
                                onChange = { handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="registerPassword2" className="form-label"> Confirmar password</label>
                            <input
                                 id="registerPassword2"
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name = "rPassword2"
                                value = { rPassword2 }
                                onChange = { handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mt-4 text-center">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
                { 
                (process.env.NODE_ENV !== 'test') &&
                
                <div className="auth__social-networks">
                    <h3>Login with social networks</h3>
                    <div className="col-md-6">
                        <GoogleLogin 
                            clientId={ process.env.REACT_APP_GOOGLE_CLIENT }
                            buttonText="Login with Google"
                            onSuccess={ handleGoogleLogin }
                            onFailure={ handleGoogleLogin }
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={ false }
                            render={renderProps => (
                                <GoogleLoginButton onClick={renderProps.onClick} ></GoogleLoginButton>
                                )}
                        />
                    </div>

                    <div className="col-md-6">
                        <FacebookLogin 
                            appId={ process.env.REACT_APP_FACEBOOK_CLIENT }
                            fields="name,email,picture"
                            callback={ handleFacebookLogin }
                            autoLoad={ false }
                            render={renderProps => (
                                <FacebookLoginButton onClick={renderProps.onClick} ></FacebookLoginButton>
                                )}
                        />
                    </div>
                </div>
                }
            </div>
        </div>
    )
}