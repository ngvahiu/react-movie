import React from 'react'
import { Modal } from "antd";
import './ModalTrailer.scss'
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_TRAILER } from '../../redux/reducers/TrailerUrlReducer/TrailerUrlTypes';

function ModalTrailer({ isModalOpen, handleSetModalOpen }) {
    const { trailerUrl } = useSelector(state => state.TrailerUrlReducer);
    const dispatch = useDispatch()

    const handleOk = async () => {
        await dispatch({
            type: HIDE_TRAILER
        })
        handleSetModalOpen(false);
    };

    const handleCancel = async () => {
        await dispatch({
            type: HIDE_TRAILER
        })
        handleSetModalOpen(false);
    };

    const idURL = getId(trailerUrl);

    return (
        <Modal width={'70%'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <iframe
                className='lg:h-[400px] md:h-[350px] h-[250px] video'
                width={'100%'}
                src={idURL ? `https://www.youtube.com/embed/${idURL}` : ''}
                title="YouTube video player"
            ></iframe>
        </Modal>
    )
}

export default ModalTrailer

function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}