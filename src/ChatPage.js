import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatPage.css';

function ChatPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/SignInPage');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear JWT token
    navigate('/SignInPage'); // Redirect to login
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, message]);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-navbar">
        <div className="chat-navbar-brand">Real-Time Chat</div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="chat-layout">
        <div className="main-content">
          {/* Main content area (e.g., user list, other features) */}
          <h1>Main Content Area</h1>
          <p>This is where other content will go.</p>
        </div>

        <div className="chat-box">
          <div className="message-display">
            {chatMessages.map((msg, index) => (
              <div key={index} className="message">
                {msg}
              </div>
            ))}
          </div>

          <div className="message-input-area">
            <input
              type="text"
              className="message-input"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button className="send-button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;