import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { Navbar } from '../ui/Navbar';
import { Sidebar } from '../ui/Sidebar';
import { CustomersScreen } from './CustomersScreen';
import { DashboardScreen } from './DashboardScreen';
import { HomeScreen } from './HomeScreen';
import { IntegrationsScreen } from './IntegrationsScreen';
import { OrdersScreen } from './OrdersScreen';
import { ProductsScreen } from './ProductsScreen';
import { ReportsScreen } from './ReportsScreen';

export const AdminScreen = () => {
  
    const { rol } = useSelector(store => store.auth);
    const { page } = useSelector(store => store.admin);

    if(rol!=='ADMIN_ROLE'){
        Swal.fire('Error', 'No autorizado', 'error');
        return (<Navigate to="/" />);
    } else {

    
    return (<div>
                <Navbar />

                <div className='container-fluid vh-100'>
                    <div className='row'>
                        <Sidebar />
                            {
                                (page ==='dashboard') ?
                                    <DashboardScreen />
                                : (page ==='orders') ?
                                    <OrdersScreen />
                                : (page ==='products') ?  
                                    <ProductsScreen />
                                : (page ==='customers') ? 
                                    <CustomersScreen />
                                : (page ==='reports') ?  
                                    <ReportsScreen />
                                : (page ==='integrations') ?
                                    <IntegrationsScreen />
                                :  <HomeScreen />
                            }
                    </div>
                </div>
            </div>);
    }
};
