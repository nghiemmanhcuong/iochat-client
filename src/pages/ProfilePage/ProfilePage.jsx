import './profile-page.css';
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import Feed from '../../components/Feed/Feed';
import RightSide from '../../components/RightSide/RightSide';

const ProfilePage = () => {
    return (
        <div className='profile-page'>
            <ProfileLeft />
            <div className='profile-page_center'>
                <ProfileCard ProfilePage={true}/>
                <Feed />
            </div>
            <RightSide />
        </div>
    );
};

export default ProfilePage;
