import React, { useEffect, useState, useContext } from 'react';
import Css from './Music-list.module.css';
import MusicCard from '../MusicCard/MusicCard';
import { UserContext } from '../../Context/Context';

export default function MusicList() {
    let [data, setData] = useState([]);
    let [songData, setSongData] = useState([]);
    const { searchText, setUpload} = useContext(UserContext);


    useEffect(() => {
        setUpload(true)
        fetch("http://localhost:8080/music-data", {
            method: "GET"
        }).then((res) => res.json()).then((data) => {
            console.log("Data : ", data.data);

            let arr = data.data.map((e) => {
                return (e.songId);
            });
            console.log("Arr : ",arr);
            sessionStorage.setItem("ids", JSON.stringify(arr));
            setData(data.data);
            setSongData(data.data);
        })
    }, []);

    useEffect(() => {
        if (searchText === "" || searchText === null || searchText === undefined) {
            setSongData(data);
        };

        if (searchText !== "") {

            let filteredData = data.filter((e) => {
                // console.log(e.name.includes(searchText));
                return e.name.toLowerCase().includes(searchText.toLowerCase());
            });
            setSongData(filteredData);
        }

    }, [searchText, data]);

    return (
        <div className={Css.cardContainer}>
            {songData.map((e) => {
                return <MusicCard data={e} key={e.songId} />
            })}
        </div>
    )
}
