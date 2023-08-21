import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { Themes } from "../assets/Themes";
import { millisToMinutesAndSeconds } from "../utils";
import { useNavigation } from "@react-navigation/native";

const Developers = ({ developers }) => {
  return (
    <Text style={styles.songArtists} numberOfLines={1}>
      {developers.map(({ name }) => `${name}`).join(", ")}
    </Text>
  );
};

const Chat = ({ index, imageUrl, songTitle, developers, albumName }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ChatScreen", {
          // this is a "quick and dirty" hack for the moment, we'll want to rename our properties later
          chatbotName: albumName,
        })
      }
    >
      <View style={styles.song}>
        <Text style={styles.index}>{index + 1}</Text>
        <Image
          style={[styles.image, styles.albumCover]}
          source={{ uri: imageUrl }}
        />
        <View style={styles.songArtistContainer}>
          <Text style={[styles.songTitle]} numberOfLines={1}>
            {songTitle}
          </Text>
          <Developers developers={developers} />
        </View>
        <Text style={[styles.albumName]} numberOfLines={1}>
          {albumName}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  song: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  index: {
    color: Themes.colors.gray,
    flex: 0.05,
    textAlign: "center",
    fontSize: 12,
    margin: 1,
  },
  albumCover: {
    resizeMode: "contain",
    flex: 0.2,
    width: 50,
    height: 50,
  },
  songArtistContainer: {
    flex: 0.4,
    margin: 5,
  },
  songTitle: {
    color: Themes.colors.black,
    fontSize: 12,
  },
  songArtists: {
    color: Themes.colors.gray,
    fontSize: 12,
  },
  albumName: {
    color: Themes.colors.black,
    flex: 0.25,
    fontSize: 12,
    margin: 5,
  },
  duration: {
    color: Themes.colors.gray,
    flex: 0.1,
    fontSize: 12,
    margin: 5,
  },
});

export default Chat;
