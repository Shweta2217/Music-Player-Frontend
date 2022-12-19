import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Css from './Player.module.css';
import { UserContext } from '../../Context/Context';
import Image from "../../Asset/music.png";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

export default function MusicPlayer() {
  const { id } = useParams();
  const navigator = useNavigate();
  const [isPlay, setPlay] = useState(true);
  const [isSound, setSound] = useState(true);
  const { songId, setSongId } = useContext(UserContext);
  const [ data, setData ] = useState([]);

  useEffect(() => {
    try {

      let song = document.getElementById("song");
      song.src = `http://localhost:8080/song/${id}`;
      song.play();
      setPlay(true);

      let url = `http://localhost:8080/song-details/${id}`;
      fetch(url, {
        method: "GET"
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setData(data.data);
        }
        )

    } catch (error) {
      console.log("error : ", error);
    }
  }, [id]);

  useEffect(() => { }, [isPlay]);

  const handlePlayPause = () => {
    try {
      let song = document.getElementById("song");
      setPlay(!isPlay);
      if (!isPlay) {
        song.play();
      } else {
        song.pause();
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  const handleSound = () => {
    try {
      let song = document.getElementById("song");
      setSound(!isSound);
      if (!isSound) {
        song.volume = 1.0;
      } else {
        song.volume = 0.0;
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  const handlePrev = (e) => {
    try {
      let newSongIndex;
      let newSongId;
      let songArr = JSON.parse(sessionStorage.getItem("ids"));
      let songIndex = songArr.indexOf(songId);
      if (songIndex === 0) {
        newSongIndex = songArr.length - 1;
      } else {
        newSongIndex = songIndex - 1;
      }
      newSongId = songArr[newSongIndex];
      setSongId(newSongId);
      navigator("/play/" + newSongId);

    } catch (error) {
      console.log("error : ", error);
    }
  }

  const handleNext = (e) => {
    try {

      let newSongIndex;
      let newSongId;
      let songArr = JSON.parse(sessionStorage.getItem("ids"));
      let songIndex = songArr.indexOf(songId);

      if (songIndex === songArr.length - 1) {
        newSongIndex = 0;
      } else {
        newSongIndex = songIndex + 1;
      }
      newSongId = songArr[newSongIndex];
      setSongId(newSongId);
      navigator("/play/" + newSongId);

    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <>
      <div className={Css.container}>
        <div className={Css.text}>{data.name} | {data.singer}</div>
        <img className={Css.image} alt="music" src={Image} />
        <audio preload="metadata" id="song" autoPlay></audio>

        <div className={Css.btnContainer}>
          <button type='text' name="previous" onClick={handlePrev} className={Css.playNext}>
            <SkipPreviousIcon fontSize={"inherit"} />
          </button>

          <button onClick={handlePlayPause} className={Css.playNext}>
            {isPlay ?
              < PauseCircleFilledIcon fontSize={"inherit"} />
              :
              <PlayCircleIcon fontSize={"inherit"} />}
          </button>

          <button onClick={handleNext} className={Css.playNext}>
            <SkipNextIcon fontSize={"inherit"} />
          </button>

          <button onClick={handleSound} className={Css.soundBtn}>
            {
              isSound ?
                < VolumeUpIcon fontSize={"inherit"} />
                :
                < VolumeOffIcon fontSize={"inherit"} />
            }
          </button>

        </div>

      </div>
    </>
  )
}
