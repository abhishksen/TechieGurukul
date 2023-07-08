import {Center, Input, Heading, View, VStack, Button} from 'native-base';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import {actions} from '../../redux/slices/auth.slice';
import collection_schema from '../../constants/collection_schemas';

const Index = () => {
  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const handleLogin = () => {
    if (!email || !email.trim()) {
      return;
    }

    if (!password || !password.trim()) {
      return;
    }

    setisLoading(true);
    firestore()
      .collection(collection_schema.helpmeusers.name)
      .where(
        collection_schema.helpmeusers.columns.email,
        '==',
        email.trim().toLowerCase(),
      )
      .where(
        collection_schema.helpmeusers.columns.password,
        '==',
        password.trim(),
      )
      .limit(1)
      .get()
      .then(doc => {
        if (doc.empty) {
          alert('Invalid credentials!');
          return;
        }

        const data = doc.docs[0].data();
        dispatch(actions.set({isLoggedIn: true, ...data}));
      })
      .catch(() => {
        alert('Something went wrong!');
      })
      .finally(() => setisLoading(false));
  };

  return (
    <View h="100%">
      <Center h="100%" w="100%">
        <VStack space={8} w="80%">
          <Heading textAlign="center">Login</Heading>
          <Input
            size="md"
            placeholder="email"
            value={email}
            onChangeText={setemail}
            type={'email'}
          />
          <Input
            size="md"
            placeholder="password"
            type="password"
            value={password}
            onChangeText={setpassword}
          />
          <Button isLoading={isLoading} onPress={handleLogin}>
            Login
          </Button>
        </VStack>
      </Center>
    </View>
  );
};

export default Index;
