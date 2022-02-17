import React from 'react'
import { useDispatch } from 'react-redux';
import { setNavigation } from '../../actions/adminNav';

export const Sidebar = () => {

const dispatch = useDispatch();

const handleClick = (e) => {
    e.preventDefault();
    dispatch(setNavigation({page: e.currentTarget.value}));
}

  return (
    <nav className='col-md-2 d-md-block bg-dark text-light sidebar vh-100'>
        <div className='position-sticky'>
            <ul className='nav flex-column' >
                <div className='container-fluid'>
                        <li className='nav-item'>
                            <div className='row my-3'>
                                <button 
                                    className='btn btn-dark'
                                    value='home'
                                    onClick={ e => handleClick(e) }
                                >
                                    <i className="bi bi-house-door-fill d-block"></i> 
                                    Home
                                </button>
                            </div>
                        </li>
                        <li className='nav-item'>
                            <div className='row my-3'>
                                <button 
                                    className='btn btn-dark'
                                    value='dashboard'
                                    onClick={ e => handleClick(e) }
                                >
                                    <i className="bi bi-clipboard-data-fill d-block"></i> 
                                    Dashboard
                                </button>
                            </div>
                        </li>
                        <li className='nav-item '>
                            <div className='row my-3'>
                                <button 
                                    className='btn btn-dark'
                                    value='orders'
                                    onClick={ e => handleClick(e) }
                                >
                                    <i className="bi bi-file-earmark-text-fill d-block"></i>
                                    Orders
                                </button>
                            </div>
                        </li>
                        <li className='nav-item '>
                            <div className='row my-3'>
                                <button 
                                    className='btn btn-dark'
                                    value='products'
                                    onClick={ e => handleClick(e) }
                                >
                                    <i className="bi bi-cart-fill d-block"></i>
                                    Products
                                </button>
                            </div>
                        </li>
                        <li className='nav-item '>
                            <div className='row my-3'>
                                <button 
                                    className='btn btn-dark'
                                    value='customers'
                                    onClick={ e => handleClick(e) }
                                >
                                    <i className="bi bi-people-fill d-block"></i>
                                    Customers
                                </button>
                            </div>
                        </li>
                        <li className='nav-item '>
                            <div className='row my-3'>
                                <button 
                                    className='btn btn-dark'
                                    value='reports'
                                    onClick={ e => handleClick(e) }
                                >
                                    <i className="bi bi-bar-chart-fill d-block"></i>
                                    Reports
                                </button>
                            </div>
                        </li>
                        <li className='nav-item '>
                            <div className='row my-3'>
                                <button 
                                    className='btn btn-dark'
                                    value='integrations'
                                    onClick={ e => handleClick(e) }
                                >
                                    <i className="bi bi-layers-fill d-block"></i>
                                    Integrations
                                </button>
                            </div>
                        </li>
                </div>
            </ul>
        </div>
    </nav>
  )
}
