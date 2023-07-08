import {
  Box,
  HStack,
  Image,
  VStack,
  Heading,
  Text,
  View,
  Button,
} from 'native-base';
import {Linking} from 'react-native';
import React from 'react';

const Item = ({source, title, sellingPrice, ogPrice, sellerName, contact}) => {
  const handleContactPress = () => {
    Linking.openURL('tel:' + contact);
  };

  return (
    <HStack
      minH={250}
      space={2}
      bgColor="white"
      borderRadius={'md'}
      paddingY={3}
      paddingX={1}>
      <Image source={source} flex={1.2} alt={title} height={'100%'} />
      <VStack justifyContent={'space-between'} space={1} flex={1}>
        <Box>
          <Heading fontWeight={400} fontSize={15}>
            {title}
          </Heading>
          <HStack alignItems={'baseline'} space={2} w="100%">
            <Heading fontWeight={400} size="xl">
              ₹{sellingPrice}
            </Heading>
            <Text color="black" strikeThrough>
              ₹{ogPrice}
            </Text>
          </HStack>
        </Box>

        <Box>
          <Text fontWeight={200}>Seller</Text>
          <Text fontWeight={200} mt={-1}>
            {sellerName}
          </Text>

          <Button onPress={handleContactPress} variant={'solid'}>
            Contact Seller
          </Button>
        </Box>
      </VStack>
    </HStack>
  );
};

export default Item;
