import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "David's Chatbot",
  avatar: "https://avatars.githubusercontent.com/u/85767261?s=200&v=4",
};
export default function App() {
  let qBank = [
    "Jenna",
    "Baker",
    "Phoenix",
    "David",
    "Winston",
    "Besufekad",
    "Megan",
    "Megha",
    "Brian",
    "Jovanna",
    "Gisela",
    "Steven",
    "Kalvin",
    "Ozzy",
    "Khanh",
    "Felicia",
    "Mykeith",
    "Andrea",
  ];
  var word = "";
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [guessTable, setGuess] = useState("");
  const [mode, setMode] = useState(false);
  const [mistake, setMistake] = useState(4);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello, welcome to hangman! Say 'Yes' when you're ready to play!",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  }, []);
  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      //console.log("PREVIOUS MESSAGES:", previousMessages);
      //console.log("NEW MESSAGE:", newMessages);
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
  const respondToUser = (userMessages) => {
    //console.log("User message text:", userMessages[0].text);
    if (userMessages[0].text == "Yes") {
      console.log("I RAN");
      setMode(true);
      word = qBank[Math.floor(Math.random() * qBank.length)];
      setQuestion(word);
      console.log("QBank:", word);
      setGuess("_".repeat(word.length));
      //console.log("guessTable", guessTable);
      addBotMessage("_".repeat(word.length));
    } else if (mode == true) {
      var temp = guessTable;
      console.log(" i RAn");
      console.log("word", question);
      console.log(question.includes(userMessages[0].text.toLowerCase()));
      if (question.toLowerCase().includes(userMessages[0].text.toLowerCase())) {
        console.log("i asdfasdf");
        for (var i = 0; i < question.length; i++) {
          console.log("qChar", question[i]);
          if (
            question[i] == userMessages[0].text.toLowerCase() ||
            question[i] == userMessages[0].text
          ) {
            temp =
              temp.substring(0, i) +
              userMessages[0].text.toLowerCase() +
              temp.substring(i + 1, temp.length);
          }
        }
        setGuess(temp);
        addBotMessage(temp);
        if (temp == question.toLowerCase()) {
          setMode(false);
          addBotMessage("Congrats you solved the question!");
          addBotMessage("Do you want to play again?");
          setMistake(3);
        }
      } else {
        setMistake(mistake - 1);
        addBotMessage(temp);
        addBotMessage(
          "You got it wrong. You have " + mistake + " live(s) left"
        );
        if (mistake == 0) {
          addBotMessage("Damn you suck LMFAO");
          addBotMessage("Do you want to play again?");
          setMistake(3);
        }
      }
    }
    // else if(userMessages[0].text == "Sacramento" && onQuestion == 1)
    // {
    //   addBotMessage("Nice job you got it!")
    //   setQuestion(2);
    //   addBotMessage("Who is the Coach of SEA")
    // }
    // else if(userMessages[0].text == "Phoenix" && onQuestion == 2)
    // {
    //   addBotMessage("Nice job you got it!")
    //   setQuestion(3);
    //   addBotMessage("What academy are we in")
    // }
    // else if(userMessages[0].text == "Engineering" && onQuestion == 3)
    // {
    //   addBotMessage("Nice job you got all 3 correct")
    // }
    // else if(onQuestion == 1 || onQuestion == 2 || onQuestion == 3)
    // {
    //   console.log(userMessages[0].text)
    //   addBotMessage("Sorry that was wrong. Try again")
    // }
    // else{
    //   console.log(onQuestion);
    //   addBotMessage("Please type Yes to start ;)")
    // }
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
