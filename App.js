// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import HomeScreen from "./screens/HomeScreen";
// import ChatScreen from "./screens/ChatScreen";
// import RootNavigation from "./navigation/Index";
// import { initializeApp } from "firebase/app";

// const Stack = createStackNavigator();

// export default function App() {
//   initializeApp();
//   return (
//     <RootNavigation>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen
//             name="All Chatbots"
//             component={HomeScreen}
//             options={{
//               headerShown: false,
//             }}
//           />
//           <Stack.Screen name="ChatScreen" component={ChatScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </RootNavigation>
//   );
// }

import React from "react";
import "./firebase";
import RootNavigation from "./navigation/Index";
import UserStack from "./navigation/UserStack";

export default function App() {
  return <UserStack />;
}
