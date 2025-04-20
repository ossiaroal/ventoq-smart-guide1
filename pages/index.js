import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages([...messages, userMsg]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    const aiMsg = { role: 'assistant', content: data.reply };
    setMessages([...messages, userMsg, aiMsg]);
    setInput('');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>VENTOQ 智能客服</h1>
      <div style={{ border: '1px solid #ccc', padding: '1rem', height: '400px', overflowY: 'auto', marginBottom: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ margin: '0.5rem 0', color: msg.role === 'user' ? 'blue' : 'green' }}>
            <b>{msg.role === 'user' ? '你：' : 'VENTOQ：'}</b>{msg.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="请输入您的问题，如：如何更换香薰弹夹？"
        style={{ width: '80%', padding: '0.5rem' }}
      />
      <button onClick={sendMessage} style={{ padding: '0.5rem', marginLeft: '1rem' }}>发送</button>
    </div>
  );
}
