import {Button} from 'native-base';
import React from 'react';
import {useDispatch} from 'react-redux';

import {actions} from '../redux/slices/auth.slice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(actions.logout());
  };

  return <Button onPress={logout}>Log Out</Button>;
};

export default LogoutButton;
