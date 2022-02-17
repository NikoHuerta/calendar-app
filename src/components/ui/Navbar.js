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
        navigate('/admin', { replace: true });
    }

    const handleReturn = () =>{
        navigate('/', { replace: true });
    }

    return (
        <div className='navbar navbar-dark bg-dark'>
            <div className='container-fluid'>
                <div className='navbar-brand'>
                    <i className='bi bi-calendar2-event-fill align-middle mx-3'></i>
                    <span className='align-middle'>{ name }</span>
                </div>
                <ul className='navbar-nav ms-auto' style={{'flexDirection': 'row'}}>
                    <li className='nav-item'>
                        <button 
                            className={ `btn btn-outline-info mx-2 ${(rol==='ADMIN_ROLE') ? 'd-block' : 'd-none'}` }
                            onClick={ handleAdmin }
                            disabled={ (rol==='ADMIN_ROLE') ? false : true }
                        >
                            <i className="fas fa-user-cog"></i>
                            <span> Admin Zone </span>
                        </button>
                    </li>
                    
                    <li className='nav-item'>
                        <button 
                            className={ `btn btn-outline-success mx-2 ${(rol==='ADMIN_ROLE') ? 'd-block' : 'd-none'}` }
                            onClick={ handleReturn }
                            disabled={ (rol==='ADMIN_ROLE') ? false : true }
                        >
                            <i className='fa-solid fa-angles-left'></i>
                            <span> Volver </span>
                        </button>
                    </li>

                    <li className='nav-item'>
                        <button 
                            className='btn btn-outline-danger mx-2'
                            onClick={ handleLogout }
                        >
                            <i className='fas fa-sign-out-alt'></i>
                            <span> Logout </span>
                        </button>
                    </li>
                </ul>
            </div> 
        </div>
    )
}
