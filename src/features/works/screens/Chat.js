import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, KeyboardAvoidingView, Platform } from "react-native";

export default function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Simulating fetching chat messages from an API or storage
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    // Simulating an API call or storage retrieval for chat messages
    // Replace this with your own logic to fetch messages
    const fetchedMessages = [
      {
        _id: 1,
        text: "Hello!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "John",
        },
      },
      // Add more messages here
    ];

    setMessages(fetchedMessages);
  };

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

    // Simulating sending the message to an API or storage
    sendMessage(newMessages[0]);
  };

  const sendMessage = (message) => {
    // Simulating an API call or storage update to send the message
    // Replace this with your own logic to send the message
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
