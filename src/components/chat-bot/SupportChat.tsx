import { useEffect } from "react";
import useSupportChatBot from "./useSupportChatBot";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const SupportChat = () => {

    const {
        messages,
        sendMessage,
        input,
        setInput,
        isTyping,
        messagesEndRef
    } = useSupportChatBot();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    return (

        <div className="flex items-center justify-center p-6">
            <div className="w-[50%] h-[550px] rounded-3xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 bg-emerald-600 text-white flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold tracking-wide">
                            AI Support Assistant
                        </h2>
                        <p className="text-xs opacity-80">
                            Online • Powered by AI
                        </p>
                    </div>

                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-white">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"
                                }`}
                        >
                            {msg.sender !== "user" && (
                                <span className="w-8 h-8 flex items-center justify-center text-xl">
                                    🤖
                                </span>
                            )}

                            <div
                                className={`px-5 py-3 rounded-2xl max-w-[75%] text-sm leading-relaxed transition-all duration-200 shadow-sm hover:shadow-md ${msg.sender === "user"
                                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-br-none"
                                    : "bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200"
                                    }`}
                            >
                                <p>{msg.text}</p>
                                <p
                                    className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-gray-400"
                                        }`}
                                >
                                    {msg?.timestamp?.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>

                            {msg.sender === "user" && (
                                <UserCircleIcon className="w-8 h-8 text-gray-400 flex-shrink-0" />
                            )}
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 border border-gray-200 rounded-3xl rounded-bl-none px-5 py-3 shadow-sm">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-5 border-t border-gray-200 bg-white flex items-center gap-3">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask Anything"
                        className="flex-1 bg-gray-100 border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />

                    <button
                        onClick={sendMessage}
                        disabled={input.trim() === ""}
                        className="bg-emerald-600 text-white p-3 rounded-full hover:scale-105 active:scale-95 transition-transform duration-150 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>

    );
};

export default SupportChat;
