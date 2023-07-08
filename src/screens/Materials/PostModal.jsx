import React, {useState} from 'react';
import {Modal, Button, Input, FormControl, Alert} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import firestore from '@react-native-firebase/firestore';

import collection_schema from '../../constants/collection_schemas';
import useAuthState from '../../hooks/useAuthState';

const doc_link_arr = [
  'https://www.iucn.org/sites/default/files/2022-04/deforestation-forest_degradation_issues_brief_2021.pdf',
  'https://www2.deloitte.com/content/dam/Deloitte/uk/Documents/Innovation/deloitte-uk-what-is-blockchain-2016.pdf',
  'https://www.torontomu.ca/content/dam/sciencerendezvous/SR2021/A_Brief_Introduction_To_AI.pdf',
  'https://www.nielit.gov.in/gorakhpur/sites/default/files/Gorakhpur/OLevel_2_B4_CLang_20Apr_SS.pdf',
  'https://www.cs.cmu.edu/~ab/15-123S09/lectures/Lecture%2010%20-%20%20Linked%20List%20Operations.pdf',
];

export default function PostModal({open, onClose}) {
  const [filename, setfilename] = useState(null);
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const {name} = useAuthState();

  const handleSelectFile = () => {
    DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles],
    })
      .then(res => {
        setfilename(res.name);
      })
      .catch(() => {
        return null;
      });
  };

  const handlePost = () => {
    if (!title || !title.trim()) {
      return;
    }

    if (!desc || !desc.trim()) {
      return;
    }

    setisLoading(true);

    const trimDesc = desc.trim();
    const trimTitle = title.trim();

    firestore()
      .collection(collection_schema.materials.name)
      .add({
        desc: trimDesc,
        title: trimTitle,
        user_name: name,
        time_added: firestore.FieldValue.serverTimestamp(),
        filename: filename ? filename : '',
        doc_link: filename ? getRandomLink() : '',
      })
      .then(() => {
        alert('Posted Successfullt!');
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
        <Modal.Header>Post An Announcement</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Title</FormControl.Label>
            <Input value={title} onChangeText={settitle} />
          </FormControl>

          <FormControl mt={2}>
            <FormControl.Label>Description</FormControl.Label>
            <Input multiline value={desc} onChangeText={setdesc} />
          </FormControl>

          <Button onPress={handleSelectFile} variant={'ghost'} mt={3}>
            {filename ? filename : 'Select A File (optional)'}
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button flex="1" isLoading={isLoading} onPress={handlePost}>
            Post
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

function getRandomLink() {
  // get random index value
  const randomIndex = Math.floor(Math.random() * doc_link_arr.length);

  // get random item
  const item = doc_link_arr[randomIndex];

  return item;
}
