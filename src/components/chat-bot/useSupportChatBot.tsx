
import { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../../constants/constant";
import { Message } from "./types/chatBotTypes";

const useSupportChatBot = () => {

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [userId, setUserId] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Generate random userId once
    useEffect(() => {
        const randomId = "user_" + Math.random().toString(36).substring(2, 9);
        setUserId(randomId);
    }, []);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userText = input;

        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: userText,
                timestamp: new Date(),
            },
        ]);
        setInput("");

        setIsTyping(true);

        try {
            const res = await fetch(`${BASE_URL}/chat/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, text: userText }),
            });

            const data = await res.json();

            const botReply =
                data?.data?.messages?.[data.data.messages.length - 1];

            setMessages((prev) => [...prev, botReply]);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsTyping(false);
        }
    };
    return {
        messages,
        sendMessage,
        input,
        setInput,
        isTyping,
        setIsTyping,
        messagesEndRef
    };
};

export default useSupportChatBot;
