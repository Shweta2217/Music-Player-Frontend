import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Upload from './components/UploadFile/Upload';
import Header from "./components/Header/Header.jsx";
import MusicPlayer from './components/MusicPlayer/Player';
import Footer from './components/Footer/Footer.jsx';
import MusicList from './components/Music List/Music-list';
import UploadBtn from './components/UploadBtn';
import { UserContext } from './Context/Context';
import { useContext } from 'react'


function App() {
  const { upload } = useContext(UserContext);
  return (<>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<MusicList />} />
        <Route path={"/play/:id"} exect element={<MusicPlayer />} />
        <Route path={"/upload"} exect element={<Upload />} />
      </Routes >
      {
        upload &&
        <UploadBtn />
      }
      <Footer />
    </BrowserRouter>

  </>
  );
}

export default App;
