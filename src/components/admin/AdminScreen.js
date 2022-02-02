import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SideMenu, { Item } from 'react-sidemenu';

import { Navbar } from '../ui/Navbar';

export const AdminScreen = () => {
  
    const { rol } = useSelector(store => store.auth);
    const [selection, setSelection] = useState('users');


    const handleClick = (selected) => {
        setSelection(selected);
        // console.log('clicked -->', selected);
    }

    if(rol!=='ADMIN_ROLE'){
        Swal.fire('Error', 'No autorizado', 'error');
        return (<Navigate to="/" />);
    } else {

    
    return (<div>
                <Navbar />
                <SideMenu onMenuItemClick={(value) => handleClick(value)}>
                    <Item label="Data" icon="fa-database">
                        <Item label="Users" icon="fa-users" value='users' ></Item>
                        <Item label="Events" icon="fa-calendar-alt" value='events' ></Item>
                    </Item>
                </SideMenu>

                { (selection ==='users') ? 
                        <span>Here go the users</span> 
                : (selection ==='events') ? 
                    <span> Here go the events</span> 
                : <span>None selected</span>
                }
               

            </div>);
    }
};
