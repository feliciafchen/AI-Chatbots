import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, Text } from "react-native";
import ReverseAkinator from "../components/ReverseAkinator";
import EscapeRoom from "../components/BakersChatbot";
import TrueFalseTriviaChatbot from "../components/TrueFalseTriviaChatbot";
import JovannasChatbot from "../components/JovannasChatbot";
import Python101 from "../components/Python101";

// prettier-ignore
export const CHATBOTS = {
  "Python101": {
    id: "Python101",
    name: "Python101",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/6062/6062646.png",
    developers: [{ name: "Felicia" },{ name: "OpenAI API" }],
    component: Python101,
  },
  "ReverseAkinator": {
    id: "ReverseAkinator",
    name: "Reverse Akinator",
    imageUrl: "https://en.akinator.com/bundles/elokencesite/images/akitudes_670x1096/defi.png?v95",
    developers: [{ name: "Felicia" },{ name: "OpenAI API" }],
    component: ReverseAkinator,
  },
  "EscapeRoomChatbot": {
    id: "EscapeRoomChatbot",
    name: "Escape Room",
    imageUrl: "https://static.vecteezy.com/system/resources/previews/000/440/213/original/question-mark-vector-icon.jpg",
    developers: [{ name: "Felicia" },{ name: "OpenAI API" }],
    component: EscapeRoom,
  },
  "TrueFalseTriviaChatbot": {
    id: "TrueFalseTriviaChatbot",
    name: "True/False Trivia Host",
    imageUrl: "https://static.vecteezy.com/system/resources/previews/008/459/433/original/trivia-time-neon-sign-on-brick-wall-background-free-vector.jpg",
    developers: [{ name: "Felicia" }],
    component: TrueFalseTriviaChatbot,
  },
  "JovannasChatbot": {
    id: "JovannasChatbot",
    name: "Math Game",
    imageUrl: "https://media.istockphoto.com/id/1139440824/vector/cartoon-funny-calculator-smiles.jpg?s=612x612&w=0&k=20&c=wllr71jJWz5la9aPy_PHJ4I66jydjys2LyymY6mQSEU=",
    developers: [{ name: "Jovanna" }],
    component: JovannasChatbot,
  }
};

export default function ChatScreen({ route }) {
  const { chatbotName } = route.params;

  const makeChatbotComponent = (chatbotName) => {
    if (CHATBOTS[chatbotName]) {
      const Chatbot = CHATBOTS[chatbotName].component;
      return <Chatbot />;
    } else {
      return <Text>No Chatbot Found with name '{chatbotName}'</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {makeChatbotComponent(chatbotName)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
