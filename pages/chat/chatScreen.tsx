import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatContext } from "./ChatContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { firestore } from "../../firebaseConfig";
import { Unsubscribe } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import Message from "./components/Message";
import Input from "./components/Input";
import COLORS from "../../config/COLORS";

type RootStackParamList = {
  ChatList: undefined;
  ChatScreen: { chatId: string } | undefined;
};

type messagesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ChatScreen"
>;

type MessagesProps = {
  navigation: messagesNavigationProp;
};

const ChatScreen = ({ navigation }: MessagesProps) => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState<any[]>([]);
  const [recipientDisplayName, setRecipientDisplayName] = useState<string>("");

  const recipientId = data.userInfo.uid;
  useEffect(() => {
    const fetchRecipientDisplayName = async () => {
      try {
        const userDocRef = doc(firestore, "users", recipientId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setRecipientDisplayName(userData.displayName);
        }
      } catch (error) {
        console.error("Error fetching recipient's display name:", error);
      }
    };

    fetchRecipientDisplayName();
  }, [recipientId]);

  console.log("data: ", data)

  useEffect(() => {
    const documentRef = doc(collection(firestore, "chats"), data.chatId);

    const unsubscribe: Unsubscribe = onSnapshot(documentRef, (docSnapshot) => {
      const data = docSnapshot.exists() ? docSnapshot.data() : null;
      const messagesArray = data ? data.messages : [];
      setMessages(messagesArray);
    });

    return () => unsubscribe();
  }, [data.chatId]);

  console.log(messages)
  console.log(recipientDisplayName)

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{recipientDisplayName}</Text>
      </View>
      <ScrollView>
        <View>
          {messages.length > 0 &&
            messages.map((m: any) => (
              <Message message={m} key={m.id} />
            ))}
        </View>
      </ScrollView>
      <View>
        <Input />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.BEIGE,
    paddingLeft: 16,
    paddingRight: 16,
  },
  usernameContainer: {
    alignItems: "center", // Center the text horizontally
    marginBottom: 10,
  },
  username: {
    fontSize: 30,
    fontFamily: "Bitter-Bold",
    marginBottom: 10,
  },
});

export default ChatScreen;
