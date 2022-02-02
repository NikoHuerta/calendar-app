import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactLoading } from 'react-loading';

import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';



export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(store => store.auth);
    
    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch]);
    

    if(checking){
        return <>
            <h5>Espere ...</h5>
        </>;

    }

    return (
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={
                        <PrivateRoute uid={ uid } >
                            <CalendarScreen />
                        </PrivateRoute>
                    } />
                    <Route path="/login/*" element={
                        <PublicRoute uid={ uid }>
                            <LoginScreen />
                        </PublicRoute>
                    } />
                    <Route path="*" element={<Navigate replace to={'/'} />} />
                </Routes>
            </BrowserRouter>
    )
}
