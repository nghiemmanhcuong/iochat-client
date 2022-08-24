import './post.css';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {likePost} from '../../api/postApi.js';
import {Link} from 'react-router-dom';

import comment from '../../images/comment.png';
import like from '../../images/like.png';
import notlike from '../../images/notlike.png';
import share from '../../images/share.png';
import noAvatar from '../../images/no-avatar.jpeg';

import * as userApi from '../../api/userApi';

const Post = (props) => {
    const post = props.post;
    const {user} = useSelector((state) => state.authReducer.authData);
    const [liked, setLiked] = useState(post.liked.includes(user.id));
    const [likes, setLikes] = useState(post.liked.length);
    const [postUser, setPostUser] = useState({});

    const handleLike = (postId) => {
        setLiked((prev) => !prev);
        likePost(postId, user.id);
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
    };

    useEffect(() => {
        const fetchPostUser = async () => {
            try {
                const response = await userApi.getUserById(post.userId);
                setPostUser(response.data.user);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPostUser();
    }, [post]);

    return (
        <div className='post'>
            <div className='post_detail'>
                {postUser ? (
                    <div className='post_detail_header'>
                        <Link to={`/profile/${postUser._id}`}>
                            <img
                                src={
                                    postUser.profilePicture
                                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                                          postUser.profilePicture
                                        : noAvatar
                                }
                                alt='profile image'
                            />
                            <h4>
                                <b>
                                    {postUser.firstname &&
                                        postUser.lastname &&
                                        postUser.firstname + ' ' + postUser.lastname}
                                </b>
                            </h4>
                        </Link>
                    </div>
                ) : (
                    'loading...'
                )}
                <span>{post.description}</span>
            </div>
            {post.image && <img
                src={post.image ? process.env.REACT_APP_PUBLIC_FOLDER + post.image : ''}
                alt='post image'
            />}
            <div className='post_react'>
                <img src={liked ? like : notlike} alt='like' onClick={() => handleLike(post._id)} />
                <img src={comment} alt='comment' />
                <img src={share} alt='share' />
            </div>
            <span>{likes} Lượt thích</span>
        </div>
    );
};

Post.propTypes = {
    post: PropTypes.object.isRequired,
};

export default Post;
