import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

    const dispatch = useDispatch(); 
    const { name, rol } = useSelector(store => store.auth);
    const navigate = useNavigate();


    const handleLogout = () => {
        dispatch( startLogout() );
    }

    const handleAdmin = () => {
        console.log('Go admin zone!');
        navigate('/admin', { replace: true });
    }

    return (
        <div className='navbar navbar-dark bg-dark mb-4'>
            <span className='navbar-brand'>
                { name }
            </span>
            
            <form className="form-inline">
                <button 
                    className='btn btn-outline-info mr-sm-2'
                    onClick={ handleAdmin }
                    disabled={ (rol==='ADMIN_ROLE') ? false : true }
                >
                    <i className="fas fa-user-cog"></i>
                    <span> Admin Zone </span>
                </button>

                <button 
                    className='btn btn-outline-danger my-2 my-sm-0'
                    onClick={ handleLogout }
                >
                    <i className='fas fa-sign-out-alt'></i>
                    <span> Logout </span>
                </button>
            </form>
        </div>
    )
}
