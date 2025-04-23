// CustomChatBox.jsx
import React, { useState } from 'react';
import {Badge} from "antd";

const CustomChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {

            const encodedMessage = encodeURIComponent(message);
            window.open(`https://www.instagram.com/direct/t/17844528411411571`);
            setMessage('');


    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container">
            {isOpen ? (
                <div className="chat-box">
                    <div className="chat-header">
                        <div className="header-content">
                            <div className="logo-container">
                                <img src={`${process.env.PUBLIC_URL}/LeVALogo-slogan-E-PINK-1.png`} alt="Nails Logo" className="chat-logo" />
                            </div>
                            <div className="header-text">
                                <h4>LeVa Nails <Badge status="success" /></h4>
                                <p style={{fontStyle:'italic'}}>Usually responds instantly</p>
                            </div>
                        </div>
                        <button className="close-button" onClick={() => setIsOpen(false)}>
                            ✕
                        </button>
                    </div>

                    <div className="chat-content">
                        <div className="welcome-message">
                            <p>Hello! 👋</p>
                            <p>How can we help you today?</p>
                        </div>
                    </div>

                    <div className="chat-input-area">
            {/*<textarea*/}
            {/*    value={message}*/}
            {/*    onChange={(e) => setMessage(e.target.value)}*/}
            {/*    onKeyPress={handleKeyPress}*/}
            {/*    placeholder="Type your message..."*/}
            {/*    className="chat-input"*/}
            {/*/>*/}
                        <button
                            className="send-button"
                            onClick={handleSendMessage}
                            // disabled={!message.trim()}
                        >
                            <i className="fas fa-paper-plane"> Go to Instagram</i>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="chat-button-wrapper">
                    <button className="chat-toggle-button" onClick={() => setIsOpen(true)}>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                        </svg>
                    </button>
                    <span className="tooltip">Need help?</span>
                </div>
            )}
        </div>
    );
};

export default CustomChatBox;