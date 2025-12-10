import React, { useRef } from "react";
import "./LoginComponent.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/accountUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usernameRef = useRef();
  const userpasswordRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = usernameRef.current.value.trim();
    const password = userpasswordRef.current.value.trim();

    if (!username || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const loginInfor = { username, password };

const result = await dispatch(login(loginInfor));

if (result.success) {
  toast.success("Đăng nhập thành công");
  navigate("/home");
} else {
  toast.error("Đăng nhập thất bại");
}


  };

  return (
    <>
      <div className="login-container">
        <div className="logo">
          <img src="https://i.imgur.com/R6igQrI.jpeg" alt="logo" />
        </div>

        <div className="login">
          <div className="form-login">
            <form className="form">
              <h3 className="heading">Sign in</h3>

              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  name="username"
                  ref={usernameRef}
                  placeholder="Nhập tên đăng nhập"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  ref={userpasswordRef}
                  placeholder="Password"
                  className="form-control"
                />
              </div>

              <div className="sign-up">
                <button
                  onClick={handleLogin}
                  type="button"
                  className="form-submit"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
