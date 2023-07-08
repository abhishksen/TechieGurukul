import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {View} from 'native-base';
import axios from 'axios';

const API_KEY = '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';

const textInputProps = {
  style: {color: 'black', width: '85%'},
};

export default function BotScreen() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'stuck?!.. may be I can help you. \nHi, I am an AI bot that can help you out.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Krishnan',
          avatar:
            'https://www.pngitem.com/pimgs/m/543-5436615_cyborg-in-teen-titan-hd-png-download.png',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    setisLoading(true);

    axios
      .post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: messages[0].text,
          temperature: 0.9,
          max_tokens: 150,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0.6,
          stop: [' Human:', ' AI:'],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + API_KEY,
          },
        },
      )
      .then(resp => {
        const text = resp.data.choices[0].text.trim();

        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [
            {
              _id: makeid(10),
              text,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'Me',
                avatar:
                  'https://www.pngitem.com/pimgs/m/543-5436615_cyborg-in-teen-titan-hd-png-download.png',
              },
            },
          ]),
        );
      })
      .catch(() => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [
            {
              _id: makeid(10),
              text: "I am having a trouble processing you're request, please try again later!",
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar:
                  'https://www.pngitem.com/pimgs/m/543-5436615_cyborg-in-teen-titan-hd-png-download.png',
              },
            },
          ]),
        );
      })
      .finally(() => {
        setisLoading(false);
      });
  }, []);

  return (
    <View backgroundColor={'white'} bgColor="white" h="100%">
      <GiftedChat
        isTyping={isLoading}
        messages={messages}
        onSend={messages => onSend(messages)}
        textInputProps={textInputProps}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}

function makeid(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
