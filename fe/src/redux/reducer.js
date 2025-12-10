import { combineReducers } from "redux";

const savedAccount = localStorage.getItem("account");

const initState = {
  account: savedAccount ? JSON.parse(savedAccount) : null,
};

function accountReducer(state = initState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        account: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        account: null,
      };

    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  user: accountReducer,
});
