import React, { useState } from "react";



const Chat =() => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {

    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage = { sender: "bot", text: data.response };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        const errorMessage = { sender: "bot", text: data.detail || "Error occurred." };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    } catch (error) {
      const errorMessage = { sender: "bot", text: "Failed to connect to the server." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setInput("");
    setLoading(false);
    // const userMessage = { sender: "user", text: input };
    // setMessages((prevMessages) => [...prevMessages, userMessage]);
    // setLoading(true);
    
    // const botMessage = { sender: "bot", text: input.split('').reverse().join('') };
    // setMessages((prevMessages) => [...prevMessages, botMessage]);
    // setInput("");
    // setLoading(false);
  };

  return (
    <div className="text-white w-full">
      {isOpen && (
        <div className="flex flex-col items-center justify-center  bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4">
          <div className="h-96 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`px-2 py-2 my-2 rounded ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white text-xl text-left   rounded-tr-lg p-2 "
                    : "bg-gray-200  text-gray-800 text-1xl text-right  self-start ml-5 rounded-tl-lg"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="p-2 my-2 bg-gray-200 text-gray-800 rounded self-start">
                Bot is typing...
              </div>
            )}
          </div>
          <div className="flex items-center mt-4">
            <input
              type="text"
              
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800"
            />
            <button
              onClick={sendMessage}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
  
      )}
      <button
        onClick={toggleChatbot}
        className="bg-blue-500 text-white rounded-full fixed right-4 cursor-pointer shadow-lg"
      >
         💬 
      </button>
      
      
    </div>
    
    
  );
}

export default Chat;
