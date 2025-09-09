import { configureStore } from "@reduxjs/toolkit";
// import userReducer from './users/authSlice';
import authReducer from "../app/auth/authSlice";

import employeReducer from "./Employe/employeSlice";
import jobSlice from "../app/job/jobslice";
import categoryReducer from "../app/categories/categoryslice";
import subcategoryReducer from "../app/subcategories/subcategorySlice";
import adminReducer from "../app/admin/adminSlice";
import paymentReducer from "../app/payment/paymentSlice";
import contactReducer from "../app/Contact/contactSlice";
import userReducer from "../app/user/userSlice"
// import alllogin  from "../app/multipul/multiSlice";

export const store = configureStore({
  reducer: {
     user: userReducer,
    auth: authReducer,
    job: jobSlice,
    employe: employeReducer,
    categories: categoryReducer,
    subcategories: subcategoryReducer,
    admin: adminReducer,
    payment: paymentReducer,
    contact: contactReducer,
    // multi: alllogin, // Assuming multi-role auth is handled in the same slice
  },
});



// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // default is localStorage

// // Import reducers
// import authReducer from './auth/authSlice';
// import employeReducer from './Employe/employeSlice';
// import jobSlice from "../app/job/jobslice";
// import categoryReducer from '../app/categories/categoryslice';
// import subcategoryReducer from "../app/subcategories/subcategorySlice";
// import adminReducer from "../app/admin/adminSlice";
// import paymentReducer from "../app/payment/paymentSlice";

// // Redux Persist Configuration
// const persistConfig = {
//   key: 'root',
//   storage, // Can use sessionStorage instead if desired
//   whitelist: ['auth'], // Specify the reducers to persist
// };

// // Wrap authReducer with persistReducer to enable persistence for the auth state
// const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// export const store = configureStore({
//   reducer: {
//     auth: persistedAuthReducer, // Persisted auth reducer
//     job: jobSlice,
//     employe: employeReducer,
//     categories: categoryReducer,
//     subcategories: subcategoryReducer,
//     admin: adminReducer,
//     payment: paymentReducer,
//   },
// });

// export const persistor = persistStore(store); // Persistor to be used in the app
