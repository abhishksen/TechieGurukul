import {View, Text, Heading, Box, HStack, Avatar} from 'native-base';
import React from 'react';

const Bubble = ({pos, text, title, isTeacher}) => {
  const isLeft = pos === 'start';

  return (
    <HStack w="100%" justifyContent={'flex-' + pos}>
      <HStack my={2} maxWidth={'90%'} alignItems="baseline" space={2}>
        {isLeft ? <Avatar size={'sm'}>{title[0]}</Avatar> : null}
        <Box
          backgroundColor={isTeacher ? 'primary.500' : '#e5e5e5'}
          borderRadius={'xl'}
          padding={2}>
          {isLeft ? (
            <Text
              fontSize={12}
              bold={isTeacher}
              color={isTeacher ? 'white' : 'black'}>
              {title}
              {isTeacher ? ' (Guru)' : null}
            </Text>
          ) : null}
          <Text fontSize={16}>{text}</Text>
        </Box>
      </HStack>
    </HStack>
  );
};

export default Bubble;
