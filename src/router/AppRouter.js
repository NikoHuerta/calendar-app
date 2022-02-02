import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { AdminScreen } from '../components/admin/AdminScreen';
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
                    <Route path="/admin" element={
                        <PrivateRoute uid={ uid }>
                            <AdminScreen />
                        </PrivateRoute>
                    } />
                    <Route path="*" element={<Navigate replace to={'/'} />} />
                </Routes>
            </BrowserRouter>
    )
}
