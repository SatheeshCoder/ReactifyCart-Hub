// src/redux/reducers/index.js
import { combineReducers } from "redux";
import cartReducer from "./Reducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add other reducers as needed
});

export default rootReducer;
