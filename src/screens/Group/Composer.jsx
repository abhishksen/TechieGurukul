import {HStack, Input, IconButton, Icon, ChevronRightIcon} from 'native-base';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import collection_schema from '../../constants/collection_schemas';
import useAuthState from '../../hooks/useAuthState';

const Composer = () => {
  const [text, settext] = useState('');
  const {id, name, is_teacher} = useAuthState();

  const handleSend = () => {
    if (!text || !text.trim()) {
      return;
    }

    firestore()
      .collection(collection_schema.groupchats.name)
      .add({
        user_id: id,
        text,
        name,
        is_teacher,
        is_blocked_chat: false,
        time_added: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => settext(''));
  };

  return (
    <HStack w="100%" justifyContent={'space-between'}>
      <Input w="86%" value={text} onChangeText={v => settext(v)} />
      <IconButton
        padding={3}
        borderRadius={'full'}
        variant={'solid'}
        onPress={handleSend}
        icon={<ChevronRightIcon />}
      />
    </HStack>
  );
};

export default Composer;
