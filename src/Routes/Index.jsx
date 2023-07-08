import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import UserRoutes from '../Routes/UserRoutes';
import LoginRoutes from '../Routes/LoginRoutes';
import LogoutButton from '../components/LogoutButton';
import screen_names from '../constants/screen_names';

import useAuthState from '../hooks/useAuthState';

const Stack = createNativeStackNavigator();

const Index = () => {
  const {isLoggedIn} = useAuthState();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen
          name={screen_names.USER.MAIN}
          component={UserRoutes}
          options={{
            title: 'TechieGurukul',
            headerBackVisible: false,
            headerRight: () => <LogoutButton />,
          }}
        />
      ) : (
        <Stack.Screen
          name={screen_names.LOGIN.MAIN}
          component={LoginRoutes}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default Index;
