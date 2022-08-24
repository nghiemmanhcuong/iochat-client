import './profile-left.css';

import LogoSearch from '../LogoSearch/LogoSearch';
import InfoCard from '../InfoCard/InfoCard';
import FollowersCard from '../FollowersCard/FollowersCard';

const ProfileLeft = () => {
    return (
        <div className='profile-left'>
            <LogoSearch />
            <InfoCard />
            <FollowersCard />
        </div>
    );
};

export default ProfileLeft;
