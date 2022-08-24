import './share.css';
import {useState, useRef} from 'react';
import {MdPhotoSizeSelectActual} from 'react-icons/md';
import {BsFillPlayCircleFill, BsCalendarDate} from 'react-icons/bs';
import {GoLocation} from 'react-icons/go';
import {CgClose} from 'react-icons/cg';
import {useSelector,useDispatch} from 'react-redux';
import {uploadImage,uploadPost} from '../../store/actions/uploadAction.js';

import noAvatar from '../../images/no-avatar.jpeg';

const Share = () => {
    const dispatch = useDispatch();
    const imageRef = useRef(null);
    const [image, setImage] = useState(null);
    const [desc, setDesc] = useState('');

    const uploading = useSelector((state) => state.postReducer.uploading);
    const {user} = useSelector((state) => state.authReducer.authData);

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let image = e.target.files[0];
            setImage(image);
            e.target.value = null;
        }
    };

    const resset = () => {
        setImage(null);
        setDesc('');
    }

    const handleSubmit = () => {
        const newPost = {
            userId: user.id,
            description: desc,
        };

        if (image) {
            const data = new FormData();
            const filename = Date.now() + image.name;
            data.append('name', filename);
            data.append('file', image);
            newPost.image = filename;
            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error);
            }
        }
        dispatch(uploadPost(newPost));
        resset();
    };

    return (
        <div className='share'>
            <img src={user.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture : noAvatar} alt='profile image' />
            <div>
                <input
                    type='text'
                    placeholder='Bạn đang nghĩ gì?'
                    value={desc}
                    required
                    onChange={(e) => setDesc(e.target.value)}
                />
                <div className='share_options'>
                    <div
                        className='share_options_item'
                        style={{color: 'var(--photo)'}}
                        onClick={() => imageRef.current.click()}
                    >
                        <MdPhotoSizeSelectActual />
                        Photo
                    </div>
                    <div className='share_options_item' style={{color: 'var(--video)'}}>
                        <BsFillPlayCircleFill />
                        Video
                    </div>
                    <div className='share_options_item' style={{color: 'var(--location)'}}>
                        <GoLocation />
                        Location
                    </div>
                    <div className='share_options_item' style={{color: 'var(--shedule)'}}>
                        <BsCalendarDate />
                        Shedule
                    </div>
                    <button className='share_options_btn button ps-button' onClick={handleSubmit} disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Share'}
                    </button>
                    <div style={{display: 'none'}}>
                        <input type='file' name='myImage' ref={imageRef} onChange={onImageChange} />
                    </div>
                </div>
                {image && (
                    <div className='share_preview'>
                        <CgClose size={20} onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt='image preview' />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Share;
