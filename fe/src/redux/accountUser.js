import { checkLogin } from "../services/accountService";

export function login(loginInfo) {
    return async (dispatch) => {
        const account = await checkLogin(loginInfo);
        if (account !== null) {
            dispatch({
                type: "LOGIN",
                payload: account
            });
            console.log("login thành công");
            return true;
        } else {
            console.log("Login không thành công");
            return false;
        }
    };
}

export function logout() {
    return{
            type: "LOGOUT",
            payload: null
    };
}