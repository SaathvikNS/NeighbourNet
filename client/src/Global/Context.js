import React, {useState} from 'react';

const MyContext = React.createContext();

const ContextProvider = ({children}) => {
    const [dark, setdark] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    return(
        <MyContext.Provider value={{dark, setdark, loggedIn, setLoggedIn}}>
            {children}
        </MyContext.Provider>
    )
}

export {ContextProvider, MyContext}