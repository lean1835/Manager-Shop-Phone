import { checkLogin } from "../services/accountService";

export function login(loginInfo) {
  return async (dispatch) => {
    const account = await checkLogin(loginInfo);

    if (account !== null) {
      // Lưu vào Redux
      dispatch({
        type: "LOGIN",
        payload: account,
      });

      // Lưu vào localStorage để reload không mất login
      localStorage.setItem("token", "true");
      localStorage.setItem("account", JSON.stringify(account));

      console.log("Login thành công");
      return { success: true, account };
    } else {
      console.log("Login không thành công");
      return { success: false };
    }
  };
}

export function logout() {
  // Xóa localStorage khi logout
  localStorage.removeItem("token");
  localStorage.removeItem("account");

  return {
    type: "LOGOUT",
    payload: null,
  };
}
