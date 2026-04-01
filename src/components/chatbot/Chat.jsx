import { useEffect, useState } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import React, { useRef } from "react";
import "./chatbot.css"


const Chatbot = () => {
    const [chatHistory, setChatHistory] = useState([
        {
            role: "model",
            text: "How are you 👋 Welcome to Aroma Beans Coffee . How can I help you today?"
        }
    ]);

    const [showChatbot, setshowChatbot] = useState(false);

    const chatBodyRef = useRef();

    const generateBotResponse = async (history) => {

        const updateHistory = (text, isError = false) => {
            setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text, isError }])
                ;
        }

        history = history.map(({ role, text }) => ({ role, parts: [{ text }] }))
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: history })
        }

        try {
            const response = await fetch(import.meta.env.VITE_API_URI, requestOptions);

            if (response.status === 429) {
                updateHistory("⚠️ Rate limit exceeded. Please wait a few seconds before trying again.", true);
                return;
            }

            const data = await response.json();
            if (!response.ok) throw new Error(data.error.message || "Something went wrong!");
            const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
            updateHistory(apiResponseText);
        } catch (error) {
            updateHistory(error.message, true);

        }
    };

    useEffect(() => {
        chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behaviour: "smooth" });
    }, [chatHistory]);

    return (
        <div className={`container ${showChatbot ? 'show-chatbot' : ""}`}>
            <button onClick={() => setshowChatbot(prev => !prev)}
                id="chatbot-toggler">
                <span className="material-symbols-rounded"> mode_connect</span>
                <span className="material-symbols-rounded"> close</span>

            </button>
            <div className="chatbot-popup">
                {/* chatbot header */}
                <div className="chat-header">
                    <div className="header-info">
                        <ChatbotIcon />
                        <h2 className="logo-text">Chatbot</h2>
                    </div>
                    <button onClick={() => setshowChatbot(prev => !prev)}
                        className="material-symbols-rounded">keyboard_arrow_down</button>
                </div>
                {/* Chatbot Body  */}
                <div ref={chatBodyRef} className="chat-body">
                    <div className="message bot-message">
                        <ChatbotIcon />
                        <p className="message-text">
                            Hey !<br />
                        </p>
                        {/* render the chat history dynamically */}
                    </div>
                    {chatHistory.map((chat, index) => (
                        <ChatMessage key={index} chat={chat} />
                    ))}

                </div>
                {/* Chatbot Body  */}
                <div className="chat-footer">
                    <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
                </div>
            </div>
        </div>
    );
};

export default Chatbot;