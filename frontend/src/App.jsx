import { useState, useEffect, useRef } from 'react';
import { 
  Send, History, Bot, User, Loader2, Sparkles, 
  Plus, MessageSquare, Copy, Check, RotateCcw, 
  Settings, LogOut, Menu, X, ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from './api';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await api.getHistory();
      setHistory(data || []);
    } catch (err) {
      console.error("Failed to fetch history");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMsg, id: Date.now() }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const reply = await api.sendMessage(userMsg);
      
      let displayReply = "";
      if (typeof reply === 'object' && reply !== null) {
        displayReply = reply.response || JSON.stringify(reply);
      } else if (typeof reply === 'string') {
        try {
          const parsed = JSON.parse(reply);
          displayReply = parsed.response || reply;
        } catch (e) {
          displayReply = reply;
        }
      } else {
        displayReply = String(reply);
      }

      setMessages(prev => [...prev, { role: 'ai', content: displayReply, id: Date.now() + 1 }]);
      fetchHistory();
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "Error: Could not connect to the backend.", id: Date.now() + 1 }]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const startNewChat = () => {
    setMessages([]);
    setInput('');
  };

  const handleHistoryClick = (q) => {
    setInput(q);
    // In a real app, this would load a previous conversation thread
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar" style={{ width: sidebarOpen ? '280px' : '0', padding: sidebarOpen ? '1rem' : '0' }}>
        <button className="new-chat-btn" onClick={startNewChat}>
          <Plus size={20} />
          <span>New Chat</span>
        </button>

        <div className="sidebar-title">Recent</div>
        <div className="history-list">
          {history.map((q, i) => (
            <div key={i} className="history-item" onClick={() => handleHistoryClick(q)}>
              <MessageSquare size={16} />
              <span>{q}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '1rem' }}>
          <div className="history-item"><Settings size={18} /><span>Settings</span></div>
          <div className="history-item"><LogOut size={18} /><span>Sign Out</span></div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="action-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '500', color: '#cbd5e1' }}>Gemma 2B</h2>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div className="glass" style={{ padding: '0.5rem 1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }}></div>
              Ollama Connected
            </div>
          </div>
        </header>

        <div className="chat-messages">
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', marginTop: '10vh' }}
              >
                <div style={{ display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.03)', marginBottom: '2rem' }}>
                  <Bot size={64} style={{ opacity: 0.5 }} />
                </div>
                <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(to right, #60a5fa, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Hello, Arshad
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>How can I help you today?</p>
              </motion.div>
            )}

            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="message-container"
              >
                <div className={`message-avatar ${msg.role === 'user' ? 'user-avatar' : 'ai-avatar'}`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className="message-content">
                  <div className="markdown-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                  <div className="message-actions">
                    <button className="action-btn" title="Copy" onClick={() => handleCopy(msg.content, msg.id)}>
                      {copiedId === msg.id ? <Check size={16} color="#22c55e" /> : <Copy size={16} />}
                    </button>
                    <button className="action-btn" title="Retry"><RotateCcw size={16} /></button>
                  </div>
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="message-container"
              >
                <div className="message-avatar ai-avatar">
                  <Bot size={20} />
                </div>
                <div className="message-content">
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
                    <div className="skeleton" style={{ width: '8px', height: '8px', borderRadius: '50%' }}></div>
                    <div className="skeleton" style={{ width: '8px', height: '8px', borderRadius: '50%', animationDelay: '0.2s' }}></div>
                    <div className="skeleton" style={{ width: '8px', height: '8px', borderRadius: '50%', animationDelay: '0.4s' }}></div>
                  </div>
                  <div className="skeleton" style={{ height: '1.2rem', width: '90%', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
                  <div className="skeleton" style={{ height: '1.2rem', width: '70%', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
                  <div className="skeleton" style={{ height: '1.2rem', width: '40%', borderRadius: '4px' }}></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-container">
          <form onSubmit={handleSubmit} className="input-wrapper">
            <textarea 
              className="chat-input"
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a prompt here"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={loading}
            />
            <button type="submit" className="send-btn" disabled={loading || !input.trim()}>
              {loading ? <Loader2 className="animate-spin" size={20} /> : <ArrowUp size={24} strokeWidth={2.5} />}
            </button>
          </form>
          <div style={{ textAlign: 'center', fontSize: '0.7rem', padding: '0.5rem', opacity: 0.4 }}>
            Gemma can make mistakes. Check important info.
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
