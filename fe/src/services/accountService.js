import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "https://manager-shop-phone.onrender.com/api";

/**
 * Validate credentials via backend using HTTP Basic.
 * On success, persist token and set axios default Authorization for subsequent requests.
 */
export async function checkLogin(loginInfor) {
    try {
        const token = "Basic " + btoa(`${loginInfor.username}:${loginInfor.password}`);
        const res = await axios.get(`${API_BASE}/auth/me`, {
            headers: { Authorization: token }
        });
        localStorage.setItem("authToken", token);
        axios.defaults.headers.common["Authorization"] = token;
        return res.data;
    } catch (e) {
        console.error("Login failed", e);
        return null;
    }
}

export function logout() {
    localStorage.removeItem("authToken");
    delete axios.defaults.headers.common["Authorization"];
}

export async function getAllAccounts() {
    const res = await axios.get(`${API_BASE}/accounts`);
    return res.data;
}
