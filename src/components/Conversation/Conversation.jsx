import React from 'react';
import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';

import {getUserById} from '../../api/userApi.js';

import noAvatar from '../../images/no-avatar.jpeg';

const Conversation = ({data, currentUser,online}) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const {data} = await getUserById(userId);
                setUserData(data.user);
            } catch (error) {
                console.log(error);
            }
        };
        getUserData();
    }, []);

    return (
        <>
            <div className='follower conversation'>
                <div>
                    <div className='online-dot' style={{backgroundColor:online ? 'greenyellow' : 'silver'}}></div>
                    <img
                        src={
                            userData?.profilePicture
                                ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
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
            </div>
        </>
    );
};

Conversation.propTypes = {
    data: PropTypes.object.isRequired,
    currentUser: PropTypes.string.isRequired,
};

export default Conversation;
