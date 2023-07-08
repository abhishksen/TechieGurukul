import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/Login';

import screen_names from '../constants/screen_names';

const Stack = createNativeStackNavigator();

const LoginRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={screen_names.LOGIN.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

export default LoginRoutes;
