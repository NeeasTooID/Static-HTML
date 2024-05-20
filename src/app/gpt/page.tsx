"use client";
import { useState } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { user: 'You', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await fetch(`/api/gpt-4?q=${encodeURIComponent(input)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const aiMessage = data.gpt;
      setMessages([...newMessages, { user: 'AI', text: aiMessage }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Chat with AI</h1>
      <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message here..."
        style={{ width: '80%', marginRight: '10px' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;
