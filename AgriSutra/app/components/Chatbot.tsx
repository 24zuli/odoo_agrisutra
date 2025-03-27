"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { useRouter } from "next/navigation";

interface Message {
  text: string;
  isUser: boolean;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = { text: inputMessage, isUser: true };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage: inputMessage }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "⚠️ Sorry, I'm having trouble responding right now. Please try again later.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatClick = () => {
    if (isMobile) {
      router.push("/chat");
    } else {
      setIsOpen(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div
        className="fixed bottom-24 right-4 flex flex-col items-end space-y-2 z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && !isOpen && (
          <div className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md text-sm">
            🤖 Need help? Ask Agrisutra AI
          </div>
        )}
        <button
          onClick={handleChatClick}
          className="relative w-16 h-16 bg-white border-2 border-green-600 shadow-lg rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
        >
          <img
            src="/chatbot.png"
            alt="AI Assistant"
            className="w-10 h-10 object-contain rounded-full"
          />
          <span className="absolute top-1 right-1 h-3 w-3 bg-green-400 rounded-full animate-ping" />
        </button>
      </div>

      {/* Chat Popup for Desktop */}
      {isOpen && !isMobile && (
        <div className="fixed bottom-24 right-4 w-96 h-[500px] bg-white rounded-xl shadow-2xl flex flex-col z-50">
          <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4 rounded-t-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <img
                src="/chatbot.png"
                alt="Agrisutra"
                className="w-8 h-8 object-contain rounded-full"
              />
            </div>
            <h2 className="text-lg font-semibold flex-1">
              Agrisutra AI Assistant
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-green-800 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.isUser ? "justify-end" : "justify-start"
                } items-end gap-2`}
              >
                {!msg.isUser && (
                  <div className="w-6 h-6 rounded-full bg-green-100 p-1">
                    <img
                      src="/chatbot.png"
                      alt="AI"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-lg p-3 text-sm ${
                    msg.isUser
                      ? "bg-green-700 text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  } shadow-sm`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-green-100 p-1">
                  <img
                    src="/chatbot.png"
                    alt="AI"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 shadow-sm text-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-400"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything about farming..."
                className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              <button
                onClick={handleSend}
                className="bg-green-700 text-white rounded-lg p-2 hover:bg-green-800 transition-all"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
