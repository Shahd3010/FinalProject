import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, KeyboardAvoidingView, Platform } from "react-native";

export default function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    const fetchedMessages = [
      {
        _id: 1,
        text: "Hellooo!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "shahd",
        },
      },
    ];

    setMessages(fetchedMessages);
  };

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

    sendMessage(newMessages[0]);
  };

  const sendMessage = (message) => {
    console.log("Message sent:", message);
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
}
