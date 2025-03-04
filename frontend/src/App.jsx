import { useState } from "react";
import axios from "axios";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/ask", { question: input });
      const botMessage = { text: response.data.answer, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setMessages((prev) => [...prev, { text: "Error fetching answer.", sender: "bot" }]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-100">
      <div className="flex-1 overflow-y-auto bg-white p-4 rounded-lg shadow-md">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-300"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          className="flex-1 p-2 border rounded-lg"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={handleSend} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
      </div>
    </div>
  );
};

export default App;
