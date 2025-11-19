// CustomChatBox.jsx
import React, { useState } from 'react';
import {Badge} from "antd";
import {useTranslation} from "react-i18next";

const CustomChatBox = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {

            const encodedMessage = encodeURIComponent(message);
            window.open(`https://zalo.me/0866041318`);
            setMessage('');


    };


    return (
        <div className="chat-container">
            {isOpen ? (
                <div className="chat-box">
                    <div className="chat-header">
                        <div className="header-content">
                            <div className="logo-container">
                                <img src={`/logo_qiqiang.png`} alt="Qiqiang Logo" className="chat-logo" />
                            </div>
                            <div className="header-text">
                                <h4>BEN FU <Badge status="success" /></h4>
                                <p style={{fontStyle:'italic'}}>{t('mess_detail')}</p>
                            </div>
                        </div>
                        <button className="close-button" onClick={() => setIsOpen(false)}>
                            ✕
                        </button>
                    </div>

                    <div className="chat-content">
                        <div className="welcome-message">
                            <p>{t('mess_hello')}</p>
                            <p>{t('mess_ask')}</p>
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
                            <i className="fas fa-paper-plane"> {t('mess_go')}</i>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="chat-button-wrapper">
                    <button className="chat-toggle-button" onClick={() => setIsOpen(true)}>
                        <img src="/zalo.svg" alt="Zalo" style={{width: 35, height: 35}}/>
                    </button>
                    <span className="tooltip">Need help?</span>
                </div>
            )}
        </div>
    );
};

export default CustomChatBox;
