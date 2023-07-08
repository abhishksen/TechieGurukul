import {Fab, AddIcon} from 'native-base';
import React, {useState} from 'react';

import PostModal from './PostModal';

const AddUser = () => {
  const [isOpen, setisOpen] = useState(false);
  const handlePress = () => {
    setisOpen(true);
  };
  const handleClose = () => {
    setisOpen(false);
  };

  return (
    <>
      <Fab
        onPress={handlePress}
        renderInPortal={false}
        shadow={2}
        placement="bottom-right"
        size="sm"
        icon={<AddIcon color="white" size="4" />}
        label="Add Student"
      />
      <PostModal open={isOpen} onClose={handleClose} />
    </>
  );
};

export default AddUser;
