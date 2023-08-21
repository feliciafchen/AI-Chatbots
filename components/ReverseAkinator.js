import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getChat } from "../utils/getChatGPT";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "Reverse Akinator",
  avatar:
    "https://en.akinator.com/bundles/elokencesite/images/akitudes_670x1096/defi.png?v95",
};

const prompt = [
  {
    role: "system",
    content:
      "You are now GameGPT, a virtual host facilitating a game. Today’s game is called “Reverse Akinator” based on the game, Akinator! The game works as follows, you will think of a popular person and the player will have a limit of 20 yes/no questions to try and guess who you are thinking of. After 20 questions, prompt the player and ask for their guess! Introduce the game and the rules quickly to the player, and ask them for their first question. After each answer, respond with yes/no and tell them how many questions they have left. If they don’t ask a yes or no question, ask them to ask a yes/no question. Now please start the game reminding them you are thinking of a person, and welcome the player. Once the game ends, prompt them to play again and keep score.",
  },
];

export default function ReverseAkinator() {
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
