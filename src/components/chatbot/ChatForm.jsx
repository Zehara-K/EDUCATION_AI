import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value="";

        setChatHistory((history)=>[...history,{ role:"user",text:userMessage}]);

        setTimeout(()=>{

            setChatHistory((history) => [...history, { role: "model", text: "Thinking...." }]);

        generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);

    },600);
   
    };
    return (
        <form onSubmit={handleFormSubmit} className="chat-form">
            <input
                ref={inputRef}
                type="text"
                placeholder="Message..."
                className="message-input"
                required
            />
            <button type="submit" className="material-symbols-rounded">
                arrow_upward
            </button>
        </form>
    );
};

export default ChatForm;


// import { useRef } from "react";

// const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
//     const inputRef = useRef();

//     const handleFormSubmit = (e) => {
//         e.preventDefault();

//         const userMessage = inputRef.current.value.trim();
//         if (!userMessage) return;
//         inputRef.current.value = "";

//         // Add user message
//         setChatHistory((history) => [
//             ...history,
//             { role: "user", text: userMessage }
//         ]);

//         // Create a placeholder with an id
//         const thinkingId = Date.now();

//         setChatHistory((history) => [
//             ...history,
//             { role: "model", text: "Thinking....", id: thinkingId }
//         ]);

//         // Call bot response and replace placeholder
//         generateBotResponse(
//             [...chatHistory, { role: "user", text: userMessage }],
//             (botReply) => {
//                 setChatHistory((history) =>
//                     history.map((msg) =>
//                         msg.id === thinkingId ? { ...msg, text: botReply } : msg
//                     )
//                 );
//             }
//         );
//     };

//     return (
//         <form onSubmit={handleFormSubmit} className="chat-form">
//             <input
//                 ref={inputRef}
//                 type="text"
//                 placeholder="Message..."
//                 className="message-input"
//                 required
//             />
//             <button type="submit" className="material-symbols-rounded">
//                 arrow_upward
//             </button>
//         </form>
//     );
// };

// export default ChatForm;