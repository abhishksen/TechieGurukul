import {HStack, Avatar, Heading, Box, Button} from 'native-base';
import React from 'react';

const Item = ({name}) => {
  return (
    <HStack
      w="100%"
      justifyContent={'space-between'}
      bgColor="white"
      paddingX={2}
      paddingY={3}
      margin={2}
      borderRadius={'md'}>
      <HStack alignItems="center" space={2}>
        <Avatar size={'sm'}>{name[0]}</Avatar>
        <Heading size="sm">{name}</Heading>
      </HStack>
      <HStack>
        <Button variant={'link'}>Edit</Button>
        <Button variant={'link'}>Delete</Button>
      </HStack>
    </HStack>
  );
};

export default Item;
