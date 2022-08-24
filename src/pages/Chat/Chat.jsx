import './chat.css';
import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AiOutlineSetting} from 'react-icons/ai';
import io from 'socket.io-client';

import {getUserChats} from '../../api/chatApi.js';

import LogoSearch from '../../components/LogoSearch/LogoSearch';
import Conversation from '../../components/Conversation/Conversation';
import ChatBox from '../../components/ChatBox/ChatBox';

import noti from '../../images/noti.png';
import home from '../../images/home.png';
import chat from '../../images/comment.png';

const Chat = () => {
    const {user} = useSelector((state) => state.authReducer.authData);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [recieveMessage, setRecieveMessage] = useState(null);
    const socket = useRef();

    // Get the chat in chat section
    useEffect(() => {
        const getChats = async () => {
            try {
                const {data} = await getUserChats(user.id);
                setChats(data.chat);
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
    }, [user.id]);

    // Connect to Socket.io
    useEffect(() => {
        socket.current = io('https://frozen-basin-68891.herokuapp.com/', {
            transports: ['websocket', 'polling', 'flashsocket'],
        });
        socket.current.emit('new-user-add', user.id);
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users);
        });
    }, [user]);

    // sending message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage);
        }
    }, [sendMessage]);

    // recieve message to socket server
    useEffect(() => {
        socket.current.on('recieve-message', (data) => {
            setRecieveMessage(data);
        });
    }, []);

    // check online status
    const checkOnlineStatus = (chat) => {
        const chatMember = chat?.members?.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
      };

    return (
        <div className='chat'>
            <div className='left-side-chat'>
                <LogoSearch />
                <div className='chat-container'>
                    <h2>Chats</h2>
                    <div className='chat-list'>
                        {chats.map((chat, index) => (
                            <div key={index} onClick={() => setCurrentChat(chat)}>
                                <Conversation data={chat} currentUser={user.id} online={checkOnlineStatus(chat)}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='right-side-chat'>
                <div style={{width: '20rem', alignSelf: 'flex-end'}}>
                    <div className='right-side_nav'>
                        <Link to='/'>
                            <img src={home} alt='home icon' />
                        </Link>
                        <Link to='/chat'>
                            <img src={chat} alt='chat icon' />
                        </Link>
                        <img src={noti} alt='noti icon' />
                        <AiOutlineSetting size={28} />
                    </div>
                </div>
                {/* chat body */}
                <ChatBox
                    chat={currentChat}
                    currentUser={user.id}
                    onSetSendMessage={setSendMessage}
                    recieveMessage={recieveMessage}
                    online={checkOnlineStatus(currentChat)}
                />
            </div>
        </div>
    );
};

export default Chat;
