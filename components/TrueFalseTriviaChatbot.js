import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { Text } from "react-native";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "True/False Trivia Host",
  avatar:
    "https://static.vecteezy.com/system/resources/previews/008/459/433/original/trivia-time-neon-sign-on-brick-wall-background-free-vector.jpg",
};

export default function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [messages, setMessages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("unset");
  const [isFirst, setFirst] = useState(true);
  const [numQs, setNumQs] = useState(0);

  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=3679d98eb1440dc5b31b6e9a8103437c");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello, welcome to Felicia's super cool TRUE/FALSE trivia! Say 'Ready' when you're ready to play!",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  }, []);

  const addNewMessage = (newMessages) => {
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

  const respondToUser = (userMessages) => {
    console.log("User message text:", userMessages[0].text);

    if (isFirst) {
      if (userMessages[0].text.toLowerCase() == "ready") {
        addBotMessage("Nice! What difficulty would you like your questions?");
        addBotMessage("Options: Easy/Medium/Hard");
        setFirst(false);
      } else addBotMessage("Type 'ready' when you're ready!");
    } else if (isFirst == false && difficulty == "unset") {
      if (userMessages[0].text.toLowerCase() == "easy") {
        setDifficulty("easy");
        addBotMessage("Taking it easy! Okay I guess...");
        addBotMessage("How many questions would you like?");
      } else if (userMessages[0].text.toLowerCase() == "medium") {
        setDifficulty("medium");
        addBotMessage("Alright!");
        addBotMessage("How many questions would you like?");
      } else if (userMessages[0].text.toLowerCase() == "hard") {
        setDifficulty("hard");
        addBotMessage("Love the ambition!");
        addBotMessage("How many questions would you like?");
      } else {
        addBotMessage("Please enter a difficulty!");
        addBotMessage("Options: Easy/Medium/Hard");
      }
    } else if (isFirst == false && difficulty != "unset" && numQs == 0) {
      if (
        parseInt(userMessages[0].text) != NaN &&
        parseInt(userMessages[0].text) > 0
      ) {
        setNumQs(parseInt(userMessages[0].text));
        fetchQs(difficulty, parseInt(userMessages[0].text));
        addBotMessage("Here is your first question:");
      } else {
        addBotMessage("Please enter a valid number!");
      }
    } else if (index < numQs) {
      if (
        userMessages[0].text.toLowerCase() ==
        questions[index].correct_answer.toLowerCase()
      ) {
        addBotMessage("Correct!");
        if (index != numQs - 1) {
          addBotMessage(questions[index + 1].question);
          addBotMessage("True or False?");
        } else {
          addBotMessage(`You scored a ${score + 1} out of ${numQs}!`);
          addBotMessage(`Restart?`);
        }
        setIndex(index + 1);
        setScore(score + 1);
      } else if (
        userMessages[0].text.toLowerCase() ==
        questions[index].incorrect_answers[0].toLowerCase()
      ) {
        addBotMessage("Incorrect!");
        if (index != numQs - 1) {
          addBotMessage(questions[index + 1].question);
          addBotMessage("True or False?");
        } else {
          addBotMessage(`You scored a ${score} out of ${numQs}!`);
          addBotMessage(`Restart? Say 'yes'!`);
        }
        setIndex(index + 1);
      } else {
        addBotMessage("Please input true/false.");
      }
    } else {
      if (userMessages[0].text.toLowerCase() == "yes") {
        setIndex(0);
        setScore(0);
        setDifficulty("unset");
        setNumQs(0);
        addBotMessage("Okay! Say 'ready' when you're ready!");
      } else {
        addBotMessage("Thanks for playing! Say 'yes' if you want to restart!");
      }
    }
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  const fetchQs = (level, num) => {
    fetch(
      `https://opentdb.com/api.php?amount=${num}&difficulty=${level}&type=boolean`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setQuestions(result.results);
        addBotMessage(result.results[0].question);
        addBotMessage("True or False?");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Felicia",
      }}
      renderUsernameOnMessage={true}
    />
  );
}
