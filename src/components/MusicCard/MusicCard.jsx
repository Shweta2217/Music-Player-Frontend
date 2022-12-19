import React, { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Css from './MusicCard.module.css';
import Image from '../../Asset/music.png';
import { UserContext } from "../../Context/Context";

export default function MusicCard(props) {
  const navigator = useNavigate();
  const {setSongId} = useContext(UserContext);

  const handleClick = (e) => {  
    navigator("/play/"+e.target.value);
    setSongId(e.target.value);
  }  
  return (
    <div className={Css.cardContainer} >
      <img className={Css.cardImage} src={Image} alt="music" />
      <span >{props.data.name}</span>
      <span>{props.data.singer}</span>
      <button value={props.data.songId} onClick={handleClick} className={Css.playBtn} >Play</button>
    </div>
  );
}
