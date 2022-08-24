import './profile-card.css';
import {useSelector} from 'react-redux';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

import * as userApi from '../../api/userApi';
import {createChat} from '../../api/chatApi.js';

import cover from '../../images/cover.jpeg';
import noAvatar from '../../images/no-avatar.jpeg';
import chat from '../../images/comment.png';

const ProfileCard = (props) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {user} = useSelector((state) => state.authReducer.authData);
    const {posts} = useSelector((state) => state.postReducer);

    const [profileUser, setProfileUser] = useState({});

    useEffect(() => {
        if (id) {
            const fetchPostUser = async () => {
                try {
                    const response = await userApi.getUserById(id);
                    setProfileUser(response.data.user);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchPostUser();
        } else {
            setProfileUser(user);
        }
    }, [id]);

    const hanldeCreateChat = async () => {
        try {
            if (profileUser._id) {
                const {data} = await createChat(user.id, profileUser._id);
                if (data.success) {
                    navigate('/chat');
                }
                console.log(data);
                if (data.isChat) {
                    navigate('/chat');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='profile-card'>
            <div className='profile-card_images'>
                <img
                    src={
                        profileUser.coverPicture
                            ? process.env.REACT_APP_PUBLIC_FOLDER + profileUser.coverPicture
                            : cover
                    }
                    style={{maxHeight: props.ProfilePage ? '20rem' : '10rem'}}
                    alt='cover image'
                />
                <img
                    src={
                        profileUser.profilePicture
                            ? process.env.REACT_APP_PUBLIC_FOLDER + profileUser.profilePicture
                            : noAvatar
                    }
                    alt='profile image'
                />
            </div>
            <div className='profile-card_name'>
                <span>{profileUser.firstname + ' ' + profileUser.lastname}</span>
                <span>
                    {profileUser.worksAt ? profileUser.worksAt : 'Chưa có thông tin về việc làm'}
                </span>
            </div>
            <div className='profile-card_follow'>
                <hr />
                <div>
                    <div className='profile-card_follow_item'>
                        <span>{profileUser.followings && profileUser.followings.length}</span>
                        <span>Followings</span>
                    </div>
                    <div className='profile-card_follow_hr'></div>
                    <div className='profile-card_follow_item'>
                        <span>{profileUser.followers && profileUser.followers.length}</span>
                        <span>Followers</span>
                    </div>
                    {props.ProfilePage && (
                        <>
                            <div className='profile-card_follow_hr'></div>
                            <div className='profile-card_follow_item'>
                                <span>
                                    {posts.filter((post) => post.userId === profileUser._id).length}
                                </span>
                                <span>Bài viết</span>
                            </div>
                        </>
                    )}
                    {id && user.id !== profileUser._id && (
                        <>
                            <div className='profile-card_follow_hr'></div>
                            <div
                                className='profile-card_follow_item'
                                onClick={hanldeCreateChat}
                                style={{cursor: 'pointer'}}
                            >
                                <img src={chat} alt='chat icon' />
                            </div>
                        </>
                    )}
                </div>
                {!props.ProfilePage ? <hr /> : <div style={{padding: '0.5rem 0'}}></div>}
            </div>
            {!props.ProfilePage && (
                <div className='profile-card_link'>
                    <Link to={`/profile/${user.id}`}>Trang Cá Nhân</Link>
                </div>
            )}
        </div>
    );
};

export default ProfileCard;
