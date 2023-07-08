import {Fab, AddIcon} from 'native-base';
import React, {useState} from 'react';

import PostModal from './PostModal';

const PostMaterial = () => {
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
        label="Post"
      />
      <PostModal open={isOpen} onClose={handleClose} />
    </>
  );
};

export default PostMaterial;
