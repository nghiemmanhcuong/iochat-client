import './profile.css';

import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileCard from '../ProfileCard/ProfileCard';
import FollowersCard from '../FollowersCard/FollowersCard';

const Profile = () => {
    return (
        <div className='profile'>
            <LogoSearch />
            <ProfileCard />
            <FollowersCard />
        </div>
    );
};

export default Profile;
