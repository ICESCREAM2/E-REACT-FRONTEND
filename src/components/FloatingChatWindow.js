import React, { useState, useEffect } from 'react';
import './FloatingChatWindow.css';
import axios from 'axios';




const FloatingChatWindow = () => {
    const [currentId, setCurrentId] = useState(0);
    const [currentIdentity, setCurrentIdentity] = useState(null);
    const [otherSideId, setOtherSideId] = useState(null);
    const [otherSideIdentity, setOtherSideIdentity] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [userList, setUserList] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const ws = new WebSocket('ws://localhost:8080/api/chat/');

    // useEffect(() => {
    //     fetch('http://localhost:8080/api/chat/getCurrentId')
    //         .then(res => res.json())
    //         .then(data => {
    //             setCurrentId(data.currentId);
    //             setCurrentIdentity(data.currentIdentity);
    //         });

    //     // Define WebSocket message event
    //     // ws.onmessage = (event) => {
    //     //     const parsedMessage = JSON.parse(event.data);
    //     //     setChatHistory(prevHistory => [...prevHistory, parsedMessage]);
    //     // };

    //     // // Close WebSocket connection on component unmount
    //     // return () => {
    //     //     ws.close();
    //     // };
    // }, []);


    useEffect(() => {
        // 获取当前用户的ID和身份
         axios.get('http://localhost:8080/api/chat/getCurrentId')
            .then( (response) => {
                setCurrentId((prevId)=>{return prevId-prevId+response.data.info.id});
                setCurrentIdentity((prevIdentity)=>{return response.data.identity});
                
            });
            console.log(currentId);
        
        // 根据身份获取用户列表
        if (currentIdentity === "doctor") {
            axios.get(`http://localhost:8080/api/chat/getPatientChatList?doctorId=25`)
                .then(response => {
                    console.log(response.data);
                    setUserList(response.data);
                    alert(userList);
                    console.log("User List: ", userList);
                });
        } else if (currentIdentity === "patient") {
            axios.get(`http://localhost:8080/api/chat/getPatientChatList?patientId=132`)
                .then(response => {
                    console.log(response.data);
                    setUserList(response.data);
                    alert(userList);
                    console.log("User List: ", userList);
                });
        }
    },[]);

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
                    return axios.get(`http://localhost:8080/api/chat/getChatHistoryByConversationId?conversationId=${conversationId}`);
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
                        {userList.map(user => (
                            <div key={user.id} className="user-item" onClick={() => handleUserClick(user.id, user.identity)}>
                                {user.name}
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

