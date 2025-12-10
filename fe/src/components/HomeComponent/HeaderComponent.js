import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './HeaderComponent.css'
import { logout } from '../../redux/accountUser';

function HeaderComponent() {
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }
    const handleLog=()=>{
        navigate('/home')
    }
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-red">
                <div class='logo-header'>
                    <Link to="/home" onClick={handleLog}><img class='image' src='logo.png' /></Link>
                    <a type='button' onClick={handleLog} class="navbar-brand" >An Shop</a>
                </div>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <form class="d-flex" role="search" style={{marginLeft:'150px'}}>
                        <div class='search-container'>
                            <input class="form-control me-2" type="search" placeholder="Search..." aria-label="Search" style={{ border: 'none' }} />
                            <button className="search-btn">
                                <i className="material-icons" style={{ fontSize: '25px', marginTop: '5px' }}>search</i>
                            </button>
                        </div>
                    </form>
                </div>
                <div class="header-left">
                    {account ? (<li class="nav-item dropdown" style={{ listStyleType: 'none' }}>
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src='/login.png' style={{ height: '50px', width: '50px', borderRadius: '50%' }} />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li class="nav-item">
                                <a>Tài khoản: </a> {account && account.username}
                            </li>
                            <li class="nav-item">
                                <a>Loại tài khoản: </a> {account && account.role}
                            </li>
                            <li className="nav-item">
                                {account && <button onClick={handleLogout} class='logout' style={{background:'linear-gradient(180deg, #f71818  67.61%, #d9503f 95.18%)'}}>Logout</button>}
                            </li>
                        </ul>
                    </li>
                    ) : (
                        <li class="nav-item" style={{ listStyleType: 'none' }}>
                            <button onClick={() => navigate('/')} className="btn btn-primary" style={{backgroundColor:'black'}}>Login</button>
                        </li>
                    )}
                </div>
            </nav>
        </>
    )
}
export default HeaderComponent;