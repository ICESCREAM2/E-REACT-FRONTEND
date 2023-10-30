import React, { useState, useEffect } from 'react';
import './FloatingChatWindow.css';
import axios from 'axios';




const FloatingChatWindow = () => {
    const [currentId, setCurrentId] = useState(null);
    const [currentIdentity, setCurrentIdentity] = useState(null);
    const [otherSideId, setOtherSideId] = useState(null);
    const [otherSideIdentity, setOtherSideIdentity] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [userList, setUserList] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const ws = new WebSocket('ws://localhost:8080/api/chat/');

    useEffect(() => {
        //Define WebSocket message event
        ws.onmessage = (event) => {
            const parsedMessage = JSON.parse(event.data);
            setChatHistory(prevHistory => [...prevHistory, parsedMessage]);
        };


        const fetchData = async () => {
            try {
                // 获取当前用户的ID和身份
                const response = await axios.get('http://localhost:8080/api/chat/getCurrentId');
                let C_ID = response.data.info.id;
                let C_IDENTITY = response.data.identity;
                setCurrentId(response.data.info.id);
                setCurrentIdentity(response.data.identity);


                // 根据身份获取用户列表
                let userListResponse;
                if (response.data.identity === "doctor") {
                    userListResponse = await axios.get(`http://localhost:8080/api/chat/getDoctorChatList?doctorId=${C_ID}`);
                } else if (response.data.identity === "patient") {
                    userListResponse = await axios.get(`http://localhost:8080/api/chat/getPatientChatList?patientId=${C_ID}`);
                }

                if (userListResponse) {
                    setUserList(userListResponse.data);
                    // alert(userListResponse.data);
                    console.log("User List: ", userListResponse.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        // Close WebSocket connection on component unmount
        return () => {
            ws.close();
        };

    }, []);


    const handleUserClick = (userId, userIdentity) => {
        setOtherSideId(userId);
        setOtherSideIdentity(userIdentity);

        // 发送请求以获取conversationId
        axios.post('http://localhost:8080/api/chat/getConversationIdByUserIdentity', {
            sender: currentId,
            senderIdentity: currentIdentity,
            receiver: userId,
            receiverIdentity: userIdentity
        })
            .then(response => {
                const { conversationId } = response.data;

                if (conversationId) {
                    // 如果有conversationId，则获取相应的聊天历史记录
                    let CH_history = axios.get(`http://localhost:8080/api/chat/getChatHistoryByConversationId?conversationId=${conversationId}`);
                    console.log(CH_history);
                    return CH_history;
                }
                return null;
            })
            .then(response => {
                if (response && response.data) {
                    setChatHistory(response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching conversation or chat history:", error);
            });
    };


    const handleSendMessage = () => {
        if (inputMessage) {
            const message = {
                message: inputMessage,
                sender: currentId,
                receiver: otherSideId,
                senderIdentity: currentIdentity,
                receiverIdentity: otherSideIdentity,
            };
            ws.send(JSON.stringify(message));
            setInputMessage("");  // Clear the input field after sending
        }
    };

    return (
        <div className="floating-chat">
            <button onClick={() => setIsChatOpen(!isChatOpen)}>Chat</button>
            {isChatOpen && (
                <div className="chat-container">
                    <div className="user-list">
                        {userList && userList.map(user => (
                            <div key={user.id} className="user-item" onClick={() => handleUserClick(user.id, user.identity)}>
                                {user.FName}
                            </div>
                        ))}
                    </div>
                    <div className="chat-box">
                        <div className="chat-history">
                            {chatHistory.map(chatMessage => (
                                <div key={chatMessage.id} className={chatMessage.sender === currentId && chatMessage.senderIdentity === currentIdentity ? 'chat-right' : 'chat-left'}>
                                    {chatMessage.message}
                                </div>
                            ))}
                        </div>
                        <div className="chat-input">
                            <input type="text" placeholder="Send a message..." value={inputMessage} onChange={e => setInputMessage(e.target.value)} />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                </div>)}
        </div>
    );
};

export default FloatingChatWindow;

