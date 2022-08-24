import PropTypes from 'prop-types';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {followUser, unfollowUser} from '../../store/actions/userAction.js';

import noAvatar from '../../images/no-avatar.jpeg';

const User = ({person}) => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.authReducer.authData);
    const [following, setFollowing] = useState(person && person.followers.includes(user.id));

    const handleFollow = () => {
        following
            ? dispatch(unfollowUser(person._id, user.id))
            : dispatch(followUser(person._id, user.id));
        setFollowing((prev) => !prev);
    };

    return (
        <div className='followers-card_item'>
            <div>
                <div className='followers-card_item_img'>
                    <Link to={`/profile/${person._id}`}>
                        <img
                            src={
                                person.profilePicture
                                    ? process.env.REACT_APP_PUBLIC_FOLDER + person.profilePicture
                                    : noAvatar
                            }
                            alt='follower image'
                        />
                    </Link>
                </div>
                <div className='followers-card_item_name'>
                    <Link to={`/profile/${person._id}`}>
                        <span>{person.name}</span>
                        <span>{person.username}</span>
                    </Link>
                </div>
            </div>
            <button className={`button fc-button ${following && 'fc-unfollow'}`} onClick={handleFollow}>
                {following ? 'Bỏ theo dõi' : 'Theo dõi'}
            </button>
        </div>
    );
};

User.propTypes = {
    person: PropTypes.object.isRequired,
};

export default User;
