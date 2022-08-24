import './chatbox.css';
import PropTypes from 'prop-types';
import {useState, useEffect, useRef} from 'react';
import {format} from 'timeago.js';
import InputEmoji from 'react-input-emoji';

import {getUserById} from '../../api/userApi.js';
import {getMessages, sendMessage} from '../../api/messageApi.js';

import noAvatar from '../../images/no-avatar.jpeg';

const ChatBox = ({chat, currentUser, onSetSendMessage, recieveMessage,online}) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const scroll = useRef();

    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const {data} = await getUserById(userId);
                setUserData(data.user);
            } catch (error) {
                console.log(error);
            }
        };
        if (chat !== null && userId) getUserData();
    }, [chat, currentUser]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const {data} = await getMessages(chat._id);
                setMessages(data.messages);
            } catch (error) {
                console.log(error);
            }
        };
        if (chat !== null) fetchMessages();
    }, [chat]);

    useEffect(() => {
        if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
            setMessages([...messages, recieveMessage]);
        }
    }, [recieveMessage]);

    // handle change message input
    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    };

    // handle send message
    const handleSend = async () => {
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        };
        try {
            const {data} = await sendMessage(message);
            setMessages([...messages, data.result]);
            setNewMessage('');
        } catch (error) {
            console.log(error);
        }

        // send message to soket sever
        const receiverId = chat.members.find((id) => id !== currentUser);
        onSetSendMessage({...message, receiverId});
    };

    // allway scroll to end
    useEffect(() => {
        scroll.current?.scrollIntoView({});
    }, [messages]);

    return (
        <>
            <div className='chatbox-container'>
                {chat ? (
                    <>
                        <div className='chat-header'>
                            <div>
                                <div className='online-dot' style={{backgroundColor:online ? 'greenyellow' : 'silver'}}></div>
                                <img
                                    src={
                                        userData?.profilePicture
                                            ? process.env.REACT_APP_PUBLIC_FOLDER +
                                              userData.profilePicture
                                            : noAvatar
                                    }
                                    alt=''
                                    style={{width: '50px', height: '50px'}}
                                    className='followerImage'
                                />
                                <div className='name' style={{fontSize: '0.9rem'}}>
                                    <span>
                                        {userData?.lastname &&
                                            userData?.firstname &&
                                            userData?.firstname + ' ' + userData?.lastname}
                                    </span>
                                    <span>{online ? 'Online' : 'Offline'}</span>
                                </div>
                            </div>
                            <hr style={{width: '100%', border: '0.1px solid #cccccc'}} />
                        </div>
                        <div className='chat-body'>
                            <>
                                {messages.map((message, index) => (
                                    <div
                                        ref={scroll}
                                        className={
                                            message?.senderId && message.senderId === currentUser
                                                ? 'message own'
                                                : 'message'
                                        }
                                        key={index}
                                    >
                                        <span>{message?.text && message.text}</span>
                                        <span>
                                            {format(message?.createdAt && message.createdAt)}
                                        </span>
                                    </div>
                                ))}
                            </>
                        </div>
                        <div className='chat-sender'>
                            <div>+</div>
                            <InputEmoji value={newMessage} onChange={handleChange} />
                            <div className='send-button button' onClick={handleSend}>
                                Gửi
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='chatbox-empty-message'>
                        Bắt đầu cuộc hội thoại của bạn nào...
                    </div>
                )}
            </div>
        </>
    );
};

ChatBox.propTypes = {
    currentUser: PropTypes.string.isRequired,
};

export default ChatBox;
