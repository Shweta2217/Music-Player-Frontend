import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Css from './Upload.module.css';
import { UserContext } from '../../Context/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Upload() {
    const { setUpload } = useContext(UserContext);
    const [data, setData] = useState({
        lastModified: "",
        name: "",
        size: "",
        type: "",
        webkitRelativePath: ""
    })
    const [otherData, setOtherData] = useState({ name: "", singer: "", description: "" });


    useEffect(() => {
        setUpload(false);
    }, [])

    const handleChange = (e) => {

        setOtherData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleClick = () => {
        let formData = new FormData();

        if (otherData && otherData.name && otherData.description && otherData.singer && data) {
            formData.append(
                "name",
                otherData.name
            );
            formData.append(
                "description",
                otherData.description
            );
            formData.append(
                "singer",
                otherData.singer
            );

            formData.append(
                "file",
                data,
                data.name
            );

            axios({
                url: "http://localhost:8080/insert-data",
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                data: formData,

            })
                .then((res) => {
                    console.log(res);
                    toast.success('Data uploaded!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    });
                    setData("");
                    setOtherData({ name: "", singer: "", description: "" })
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    });
                });
        }
        else {
            toast.error('Please enter all details correctly!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onFileChange = (e) => {
        let song = e.target.files[0]
        setData(song);
    }

    return (
        <div className={Css.container}>
            <center>
                <h1>
                    Upload File
                </h1>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <label className={Css.common} htmlFor="name">Enter name of song : </label>
                    <input name="name" value={otherData.name} className={Css.common} onChange={handleChange} type="text" />
                    <br />
                    <br />
                    <label className={Css.common} htmlFor="description">Enter description for song : </label>
                    <input name="description" value={otherData.description} className={Css.common} onChange={handleChange} type="text" />
                    <br />
                    <br />
                    <label className={Css.common} htmlFor="singer">Enter singer for song : </label>
                    <input name="singer" value={otherData.singer} className={Css.common} onChange={handleChange} type="text" />
                    <br />
                    <br />
                    <label className={Css.common} htmlFor="singer">Upload song file : </label>
                    <input className={Css.common} name="file" onChange={onFileChange} type="file" />
                    <br />
                    <br />
                    <button className={Css.btn} onClick={handleClick} type="submit">Upload</button>
                </form>
            </center>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>

    )
}
