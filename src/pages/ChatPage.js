import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ChatPage.css';

function ChatPage() {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [senderId] = useState('1');
    const [receiverId] = useState('2'); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/SignInPage');
            return;
        }

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:5164/api/messages/getBetweenUsers?senderId=${senderId}&receiverId=${receiverId}`);
                setChatMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, [senderId, receiverId, navigate]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            const newMessage = { senderId, receiverId, content: message };
            try {
                await axios.post('http://localhost:5164/api/messages/send', newMessage);
                setChatMessages([...chatMessages, newMessage]);
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/SignInPage');
    };

    return (
        <div className="chat-container">
            <div className="chat-navbar">
                <div className="chat-navbar-brand">Real-Time Chat</div>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>

            <div className="chat-layout">
                <div className="main-content">
                
                </div>

                <div className="chat-box">
                    <div className="message-display">
                        {chatMessages.map((msg, index) => (
                            <div key={index} className={`message ${msg.senderId === senderId ? 'sent' : 'received'}`}>
                                {msg.content}
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