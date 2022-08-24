import './info-card.css';
import {useState, useEffect} from 'react';
import {BsPencil} from 'react-icons/bs';
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';

import ProfileModal from '../ProfileModal/ProfileModal';

import * as userApi from '../../api/userApi.js';
import {logout} from '../../store/actions/authAction.js';

const InfoCard = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [profileUser, setProfileUser] = useState({});

    const {user} = useSelector((state) => state.authReducer.authData);

    useEffect(() => {
        const fetchProfileUser = async () => {
            if (user.id === id) {
                setProfileUser(user);
            } else {
                const response = await userApi.getUserById(id);
                setProfileUser(response.data.user);
            }
        };
        fetchProfileUser();
    }, [id]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className='info-card'>
            <div className='info-card_head'>
                <h4>Thông tin cá nhân</h4>
                {user.id == id ? (
                    <>
                        <BsPencil size={20} onClick={() => setOpenModal(true)} />
                        <ProfileModal
                            openModal={openModal}
                            onSetOpenModal={setOpenModal}
                            data={user}
                        />
                    </>
                ) : null}
            </div>
            <div className='info-card_item'>
                <span>
                    <b>Mối quan hệ:</b>
                </span>
                <span>
                    {profileUser.relationships
                        ? profileUser.relationships
                        : 'Chưa có mối quan hệ nào'}
                </span>
            </div>
            <div className='info-card_item'>
                <span>
                    <b>Địa chỉ:</b>
                </span>
                <span>
                    {profileUser.address ? profileUser.address : 'Chưa có thông tin địa chỉ'}
                </span>
            </div>
            <div className='info-card_item'>
                <span>
                    <b>Đang sống tại:</b>
                </span>
                <span>
                    <span>
                        {profileUser.livesIn
                            ? profileUser.livesIn
                            : 'Chưa có thông tin nơi đang sống'}
                    </span>
                </span>
            </div>
            <div className='info-card_item'>
                <span>
                    <b>Công việc:</b>
                </span>
                <span>
                    {profileUser.worksAt ? profileUser.worksAt : 'Chưa có thông tin về công việc'}
                </span>
            </div>
            {user.id == id && (
                <button className='button logout-button' onClick={handleLogout}>
                    Đăng xuất
                </button>
            )}
        </div>
    );
};

export default InfoCard;
