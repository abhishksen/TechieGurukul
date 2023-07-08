import {ScrollView, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import collection_schema from '../../constants/collection_schemas';

import Item from './Item';
import AddUser from './AddUser';

const Index = () => {
  const [users, setusers] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection(collection_schema.helpmeusers.name)
      .onSnapshot(documentSnapshot => {
        let d = [];
        documentSnapshot.docs.forEach(v => {
          d.push({doc_id: v.id, ...v.data()});
        });
        setusers(d);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return (
    <View h="100%">
      <ScrollView h="90%" marginTop={3} paddingX={3}>
        {users.map((item, idx) => (
          <Item
            key={idx}
            title={item.title}
            desc={item.desc}
            filename={item.filename}
            timestamp={
              item.time_added?.toDate().toDateString() +
              ' ' +
              item.time_added?.toDate().toLocaleTimeString()
            }
            docLink={item.doc_link}
            name={item.name}
            docId={item.doc_id}
          />
        ))}
      </ScrollView>
      <AddUser />
    </View>
  );
};

export default Index;
