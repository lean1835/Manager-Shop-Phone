import React, { useRef } from 'react'
import './LoginComponent.css'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/accountUser';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function LoginComponent() {
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const usernameRef = useRef()
    const userpasswordRef = useRef()
    const handleLogin = async (event) => {
        event.preventDefault();
        let username = usernameRef.current.value
        let password = userpasswordRef.current.value
        const loginInfor = {
            username: username,
            password: password
        }
        console.log(loginInfor);
        let isLoginSuccess = await dispatch(login(loginInfor))
        if (isLoginSuccess) {
            toast.success("Đăng nhập thành công", {
                autoClose: 1000
            })
            navigate("/home")
        } else {
            toast.error("Đăng nhập thất bại", {
                autoClose: 1000
            })
        }
    }
    return (
        <>
            <div class="login-container">
                <div class="logo">
                    <img src='https://i.imgur.com/R6igQrI.jpeg'/>
                    {/* <span>An Shop</span> */}
                </div>
                <div class='login'>
                    <div class="form-login">
                        <form class="form">
                            <h3 class="heading">Sign in</h3>
                            <div class="form-group">
                                <label class="form-label">Username</label>
                                <input name={'username'} ref={usernameRef} placeholder="Nhập tên đăng nhập" class="form-control" />
                                <span class="form-message"></span>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Password</label>
                                <input type='password' name={'password'} ref={userpasswordRef} placeholder="Password" class="form-control" />
                                <span class="form-message"></span>
                            </div>
                            <div class="sign-up">
                                <div>
                                    <button onClick={handleLogin} type={"button"} class="form-submit" >Sign in</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginComponent;
