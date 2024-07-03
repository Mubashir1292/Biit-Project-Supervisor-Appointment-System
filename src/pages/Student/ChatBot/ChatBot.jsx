import React, { useState } from "react";

const BOT_ID = "7f3679bf-7c35-4d12-8721-8f84ff72cc52";
const BOTPRESS_API_URL = `http://your-botpress-server/api/v1/bots/${BOT_ID}/converse`;

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const sendMessageToBot = async (message) => {
    const response = await fetch(BOTPRESS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "text", text: message }),
    });
    return response.json();
  };

  const handleSend = async () => {
    if (userInput.trim() === "") return;

    const userMessage = { sender: "You", text: userInput };
    setMessages([...messages, userMessage]);

    const botResponse = await sendMessageToBot(userInput);
    const botMessage = { sender: "Bot", text: botResponse.text };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setUserInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        <div className="mb-4 overflow-y-auto max-h-80">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <span className="font-bold">{msg.sender}: </span>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-grow px-4 py-2 mr-2 border rounded-lg"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
