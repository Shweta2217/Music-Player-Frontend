import { useState, createContext, useEffect } from "react";

export const UserContext = createContext()

export function Context(props) {
  const [songId, setSongId] = useState("");
  const [upload, setUpload] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {

  }, [songId]);

  let obj = {
    songId,
    setSongId,
    searchText,
    setSearchText,
    upload,
    setUpload
  }

  return (
    <UserContext.Provider value={obj}>
      {props.children}
    </UserContext.Provider>
  );
}


