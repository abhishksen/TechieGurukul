import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import BotScreen from '../screens/BotScreen';
import GroupScreen from '../screens/Group';
import MaterialScreen from '../screens/Materials';
import Users from '../screens/Users/index';
import MarketScreen from '../screens/Market/index';

import screen_names from '../constants/screen_names';
import useAuthState from '../hooks/useAuthState';

const Tab = createMaterialTopTabNavigator();

const UserRoutes = () => {
  const {is_teacher} = useAuthState();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
      }}>
      <Tab.Screen name={screen_names.USER.GROUP} component={GroupScreen} />
      <Tab.Screen
        name={screen_names.USER.MATERIALS}
        component={MaterialScreen}
        options={{title: 'Announcements'}}
      />
      {is_teacher ? (
        <Tab.Screen
          name={screen_names.USER.USER_LIST}
          options={{title: 'Students'}}
          component={Users}
        />
      ) : (
        <>
          <Tab.Screen name={screen_names.USER.BOT} component={BotScreen} />
          <Tab.Screen
            name={screen_names.USER.MARKET}
            component={MarketScreen}
            options={{title: 'Market'}}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default UserRoutes;
