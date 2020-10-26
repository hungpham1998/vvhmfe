
import { combineReducers } from 'redux-immutable';
import alert from '../constants/ReducesAction';
import authReducer from './auth/login/redux/reducer';
import registerReducer from "./auth/Register/redux/reducer";
import authDetailReducer from "./auth/AuthDetail/redux/reducer";
import serviceShopReducer from "./serviceExtension/redux/reducer";
import appReducer from "../components/Header/redux/reducer";
import userManagementReducer from "./UserManagement/redux/reducer"
import userSystemReducer from "./UserSystem/redux/reducer";

import shopReducer from "./Shop/redux/reducer";

export default combineReducers({
    userSystemReducer,
    shopReducer,
    serviceShopReducer,
    authDetailReducer,
    registerReducer,
    userManagementReducer,
    authReducer,
    appReducer,
    alert,
});
