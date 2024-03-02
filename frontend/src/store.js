// import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit'
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productsReducer } from "./Services/Reducers/productReducer";
import { filterreducers } from './Services/Reducers/filterReducer';
import { forgotPasswordReducer, profileReducer, userReducer } from './Services/Reducers/userReducer';
import cartReducer from './Services/Reducers/cartReducer';
// import { filterreducers } from './Services/Reducers/userReducer';



// const reducer = combineReducers({
//   venues:productsReducer,
// });

// let initialState = {};

// const middleware = [thunk];

const store = configureStore({
  reducer:{
    products: productsReducer,
    productdetails: productDetailsReducer,
    filter: filterreducers,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer
  },
    // {reducer},
    // initialState,
    // composeWithDevTools(applyMiddleware(...middleware))
  });

export default store;