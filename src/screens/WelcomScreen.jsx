import React from 'react';
import {Center, Image, Heading, Button} from 'native-base';

import roboGif from '../images/hi-robot.gif';

const App = () => {
  return (
    <Center bgColor="white" h="100%">
      <Image source={roboGif} alt="robo image" size={'2xl'} />
      <Heading>I am Krishnan!!</Heading>
      <Heading size="md">and I can help you with anything</Heading>
      <Button w="40%" mt={6} _text={{fontSize: 18, bold: true}}>
        Get Started
      </Button>
    </Center>
  );
};

export default App;
