import {
  Text,
  Heading,
  VStack,
  Box,
  Divider,
  Pressable,
  HStack,
  Button,
} from 'native-base';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import React, {useState} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import firestore from '@react-native-firebase/firestore';

import collection_schema from '../../constants/collection_schemas';
import useAuthState from '../../hooks/useAuthState';

const Item = ({title, desc, filename, timestamp, docLink, username, docId}) => {
  const [isLoading, setisLoading] = useState(false);

  const {is_teacher} = useAuthState();

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  const downloadFile = () => {
    alert('file download started..');
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = docLink;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('File Downloaded Successfully.');
      });
  };

  const handleLink = () => {
    // Linking.openURL('https://www.lipsum.com/');
    checkPermission();
  };

  const showConfirmDialog = () => {
    return Alert.alert('Are your sure?', 'Are you sure you want to remove?', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          handleDelete();
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'No',
      },
    ]);
  };

  const handleDelete = () => {
    setisLoading(true);
    firestore()
      .collection(collection_schema.materials.name)
      .doc(docId)
      .delete()
      .then()
      .catch(() => {
        alert("Something went wrong! couldn't delete.");
      })
      .finally(() => setisLoading(false));
  };
  return (
    <VStack
      margin={2}
      space={5}
      bgColor={'white'}
      padding={3}
      borderRadius={'md'}>
      <Box>
        <Heading size="md">{title}</Heading>
        <Heading color="muted.400" size="xs">
          By {username}
        </Heading>
      </Box>
      <Divider />
      <Text>{desc}</Text>

      {docLink ? (
        <Pressable
          onPress={handleLink}
          w="100%"
          borderWidth={1}
          borderColor={'muted.200'}
          paddingX={3}
          paddingY={2}
          borderRadius={'md'}>
          <Text color="primary.500">{filename}</Text>
        </Pressable>
      ) : null}
      <HStack
        width="100%"
        alignItems="center"
        justifyContent={is_teacher ? 'space-between' : 'flex-end'}>
        {is_teacher ? (
          <Button
            onPress={showConfirmDialog}
            isLoading={isLoading}
            variant={'solid'}
            size="sm"
            colorScheme="muted">
            Delete
          </Button>
        ) : null}
        <Text color="muted.500" fontSize={12}>
          {timestamp}
        </Text>
      </HStack>
    </VStack>
  );
};

export default Item;

const getFileExtention = fileUrl => {
  // To get the file extension
  return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
};
