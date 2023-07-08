import React, {useState} from 'react';
import {Modal, Button, Input, FormControl, Alert} from 'native-base';
import firestore from '@react-native-firebase/firestore';

import collection_schema from '../../constants/collection_schemas';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export default function PostModal({open, onClose}) {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const handlePost = async () => {
    if (!name || !name.trim()) {
      return;
    }

    if (!email || !validateEmail(email)) {
      alert('invalid email');
      return;
    }

    if (!password || !password.trim()) {
      return;
    }

    setisLoading(true);

    const trimemail = email.trim();
    const trimname = name.trim();
    const trimPass = password.trim();

    const useremaildocs = await firestore()
      .collection(collection_schema.helpmeusers.name)
      .where(
        collection_schema.helpmeusers.columns.email,
        '==',
        trimemail.toLowerCase(),
      )
      .limit(1)
      .get();

    if (!useremaildocs.empty) {
      alert('user with same email already exists!');
      setisLoading(false);
      return;
    }

    firestore()
      .collection(collection_schema.helpmeusers.name)
      .add({
        email: trimemail.toLowerCase(),
        password: trimPass,
        name: trimname,
        is_blocked_chat: false,
        is_teacher: false,
        id: makeid(12),
      })
      .then(() => {
        alert('Student Added!');
        onClose();
      })
      .catch(() => {
        alert('Something went wrong!');
      })
      .finally(() => setisLoading(false));
  };

  return (
    <Modal isOpen={open} onClose={onClose} justifyContent="center" size="lg">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Add A Student</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input value={name} onChangeText={setname} />
          </FormControl>

          <FormControl mt={2}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              multiline
              value={email}
              type="email"
              onChangeText={setemail}
            />
          </FormControl>

          <FormControl mt={2}>
            <FormControl.Label>Password</FormControl.Label>
            <Input multiline value={password} onChangeText={setpassword} />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button flex="1" isLoading={isLoading} onPress={handlePost}>
            Add
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

function makeid(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
