import React from 'react';
import { useNavigate } from 'react-router-dom';
import Css from './index.module.css';

export default function UploadBtn() {
    const navigator = useNavigate();

    const handleClick = () => {
        navigator("/upload");
    }

    return (
        <div className={Css.btnContainer}>
            <button className={Css.btn} onClick={handleClick}>
                Upload Songs
            </button>
        </div>
    )
}
