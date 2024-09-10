import React, {useState} from 'react';

const MyContext = React.createContext();

const ContextProvider = ({children}) => {
    const [dark, setdark] = useState(true);

    return(
        <MyContext.Provider value={{dark, setdark}}>
            {children}
        </MyContext.Provider>
    )
}

export {ContextProvider, MyContext}