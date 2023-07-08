import {FlatList, Box} from 'native-base';
import React, {useState, useEffect, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';

import collection_schema from '../../constants/collection_schemas';
import useAuthState from '../../hooks/useAuthState';
import Bubble from './Bubble';
import Composer from './Composer';

const Index = () => {
  const {id} = useAuthState();

  const [msgs, setmsgs] = useState([]);
  const flatRef = useRef();

  useEffect(() => {
    const subscriber = firestore()
      .collection(collection_schema.groupchats.name)
      .orderBy(collection_schema.groupchats.columns.time_added, 'desc')
      .limit(30)
      .onSnapshot(documentSnapshot => {
        let d = [];
        documentSnapshot.docs.forEach(v => {
          d.push({doc_id: v.id, ...v.data()});
        });
        setmsgs(d.reverse());
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  useEffect(() => {
    if (msgs.length > 2) {
      flatRef.current.scrollToEnd();
    }
  }, [msgs.length]);

  return (
    <Box h="99%" padding={3}>
      <FlatList
        w="100%"
        h="100%"
        ref={ref => (flatRef.current = ref)}
        data={msgs}
        renderItem={({item}) => {
          return (
            <Bubble
              pos={item.user_id === id ? 'end' : 'start'}
              text={item.text}
              title={item.name}
              isTeacher={item.is_teacher}
            />
          );
        }}
      />
      <Composer />
    </Box>
  );
};

export default Index;
