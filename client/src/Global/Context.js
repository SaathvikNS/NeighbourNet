import React, {useState} from 'react';

const MyContext = React.createContext();

const ContextProvider = ({children}) => {
    const [dark, setdark] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userid, setUserId] = useState();

    return(
        <MyContext.Provider value={{dark, setdark, loggedIn, setLoggedIn, userid, setUserId}}>
            {children}
        </MyContext.Provider>
    )
}

export {ContextProvider, MyContext}