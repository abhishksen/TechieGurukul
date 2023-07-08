import {combineReducers} from '@reduxjs/toolkit';

import authReducer from './auth.slice';

export default combineReducers({
  auth: authReducer,
});
