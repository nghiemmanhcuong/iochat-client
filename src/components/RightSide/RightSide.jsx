import './rightSide.css';
import {useState} from 'react';
import {AiOutlineSetting} from 'react-icons/ai';
import {Link, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../ShareModal/ShareModal';

import noti from '../../images/noti.png';
import home from '../../images/home.png';
import chat from '../../images/comment.png';

const RightSide = () => {
    const [openModal, setOpenModal] = useState(false);
    const {id} = useParams();
    const {user} = useSelector((state) => state.authReducer.authData);

    return (
        <div className='right-side'>
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
            <TrendCard />
            {!id || user.id == id ? (
                <button className='button r-button' onClick={() => setOpenModal(true)}>
                    Chia sẻ
                </button>
            ) : null}
            <ShareModal openModal={openModal} onSetOpenModal={setOpenModal} />
        </div>
    );
};

export default RightSide;
