import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getChat } from "../utils/getChatGPT";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "Python 101",
  avatar: "https://cdn-icons-png.flaticon.com/512/6062/6062646.png",
};

const prompt = [
  {
    role: "system",
    content:
      "You are now a teacher that is talking to the user that has never coded before. ask them questions along the way and don't let them move on until they get the answer right. when they do, move on to the next lesson. now greet the user and teach them their first simple lesson in a fun way! Wait for user input!",
  },
];

export default function Python101() {
  const [messages, setMessages] = useState([]);
  const [messagesGPT, setMessagesGPT] = useState(prompt);

  async function fetchInitialMessage() {
    const response = await getChat(prompt);
    const message = response.choices[0].message;
    const content = response.choices[0].message.content;
    setMessagesGPT((previousMessages) => {
      return previousMessages.concat(message);
    });
    setMessages([
      {
        _id: 1,
        text: content,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  }

  useEffect(() => {
    fetchInitialMessage();
  }, []);

  const addNewMessage = async (newMessages) => {
    // try {
    //   const docRef = await addDoc(collection(db, "messages"), {
    //     message: newMessages,
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);

      return GiftedChat.append(previousMessages, newMessages);
    });
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

  const respondToUser = async (userMessages) => {
    const userMessageText = userMessages[0].text;
    const messageObj = {
      role: "user",
      content: userMessageText,
    };
    const messageHistory = messagesGPT.concat(messageObj);

    let response = await getChat(messageHistory);
    const messageResponse = response.choices[0].message;
    const content = messageResponse.content;
    setMessagesGPT(messageHistory.concat(messageResponse));
    addBotMessage(content);
  };

  const addNewGPTMessage = (message) => {
    setMessagesGPT(messagesGPT.concat(message));
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Baker",
      }}
      renderUsernameOnMessage={true}
    />
  );
}
