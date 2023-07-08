import React, {useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {GiftedChat} from 'react-native-gifted-chat';

import Routes from './src/Routes/Index';

import store from './src/redux/store';

const persistor = persistStore(store);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
