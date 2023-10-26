import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Button, Input, List, ListItem, ListItemText } from '@material-ui/core';
import UserList from './UserList';
import axios from 'axios';

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;   // 确保内容从上到下堆叠
    overflow-y: auto;
    justify-content: ${props => props.align === 'right' ? 'flex-end' : 'flex-start'};
    padding: 5px;

    & + & {
        margin-top: 10px;
    }
`;

const Message = styled.div`
    padding: 10px;
    border-radius: 10px;
    background-color: ${props => props.align === 'right' ? '#2196F3' : '#f1f1f1'}; // 当消息来自"You"时，设置为蓝色；否则设置为灰色
    color: ${props => props.align === 'right' ? '#ffffff' : '#000000'}; // 当消息背景是蓝色时，字体为白色；否则为黑色
    max-width: 70%;
    margin-bottom: 10px;
    word-break: break-word;
`;

const ChatWrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: 1px solid #ddd;
  background-color: #ffffff;
  width: 450px; // 明确设置宽度
  height: 400px; // 明确设置高度
`;

const UserListContainer = styled.div`
  border-right: 1px solid #ddd;
  width: 150px;
  height: 100%; // 设置为整个 ChatWrapper 的高度
  overflow-y: auto;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ChatHeader = styled.div`
  padding: 10px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
`;

const Messages = styled.div`
  display: block;
  margin-bottom: 10px;
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledListItem = styled(ListItem)`
background-color: #f7f7f7;  // 默认背景色为灰色
color: #000;  // 默认字体颜色为黑色

&:hover {
  background-color: #e0e0e0;  // 鼠标悬浮时的背景色
  }
`;



const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [input, setInput] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentUser, setCurrentUser] = useState({
        id: 1,  // 假设当前登录用户的id为0
        name: "You"
    });


    //建立WebSocket连接：
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080/api/chat/sendMessage");
        socket.onopen = () => {
            console.log("WebSocket Connected");
        };
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.chatMessage) {
                // 更新聊天记录
                // setMessages(prevMessages => [...prevMessages, data.chatMessage]);
            }
        };
        setWs(socket);

        return () => {
            if (socket) socket.close();
        };
    }, []);


    //获取对话id
    const [conversationId, setConversationId] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/chat/getConversationIdByUserIdentity`, {
                params: {
                    sender: "1",
                    senderIdentity: "doctor",
                    receiver: "1",
                    receiverIdentity: "patient",
                },
            })
            .then((response) => {
                setConversationId(response.data.conversation_id);
            })
            .catch((error) => {
                console.error("Error fetching conversation id:", error);
            });
    }, []);



    /* const sendMessage = (content) => {
         const message = {
             senderId: currentUser.id,
             receiverId: selectedUser.id,
             content: content
         };
 
         // 添加到本地状态
         setMessages([...messages, message]);
 
         // 发送到后端
         axios.post('/api/chat', message);
     };*/


    // 使用useEffect来从后端获取用户数据
    useEffect(() => {
        // 这里的URL应该是后端API的真实地址
        const apiUrl = 'https://561e0a5c-7077-4921-979e-9efb33df850e.mock.pstmn.io/users';

        axios.get(apiUrl)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);  // 空依赖数组表示此useEffect只在组件挂载时运行一次

    //获取聊天记录：
    useEffect(() => {
        if (conversationId) {
            axios
                .get(
                    `http://localhost:8080/api/chat/getChatHistoryByConversationId?conversationId=${conversationId}`
                )
                .then((response) => {
                    setMessages(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching chat history:", error);
                });
        }
    }, [conversationId]);

    // 发送消息
    const sendMessage = (messageContent) => {
        const payload = {
            message: messageContent,
            sender: "1", // 使用当前用户的ID
            receiver: "1", // 使用接收者的ID
            senderIdentity: "doctor",
            receiverIdentity: "patient"
        };
        ws.send(JSON.stringify(payload));
        setInput('');
    };



    /*const handleSendMessage = () => {
        // 使用 input 作为消息内容
        axios.post(`https://561e0a5c-7077-4921-979e-9efb33df850e.mock.pstmn.io/chat/${selectedUser.id}/messages`, { text: input })
            .then(response => {
                if (response.data.status === 'success') {
                    // 追加新消息到messages中
                    setMessages([...messages, {
                        id: response.data.messageId,
                        text: input, // 使用 input 作为消息内容
                        userId: selectedUser.id,
                        from: 'You' // 假设当前用户为“You”
                    }]);
                    setInput(''); // 清空输入框
                }
            });
    };*/

    return (
        <ChatWrapper>
            <UserListContainer>
                <List component="nav">
                    {users.map((user, index) => (
                        <StyledListItem
                            button
                            key={index}
                            onClick={() => setSelectedUser(user)}
                            style={{
                                backgroundColor: selectedUser && selectedUser.id === user.id ? '#333' : '#f7f7f7',  // 选中的用户背景色为黑色，其他为灰色
                                color: selectedUser && selectedUser.id === user.id ? '#fff' : '#000',  // 选中的用户字体颜色为白色，其他为黑色
                            }}
                        >
                            <ListItemText primary={user.name} />
                        </StyledListItem>
                    ))}
                </List>
            </UserListContainer>

            <ChatContainer>
                {/* <Messages>
                    {messages.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </Messages> */}
                <MessageContainer>
                    {messages.map(message => (
                        <Message align={message.from === 'You' ? 'right' : 'left'} key={message.id}>
                            {message.text}
                        </Message>
                    ))}
                </MessageContainer>
                <InputContainer>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        fullWidth
                    />
                    <Button color="primary" onClick={handleSendMessage}>
                        <SendIcon />
                    </Button>
                </InputContainer>
            </ChatContainer>
        </ChatWrapper>
    );
};

export default ChatWindow;