import React, { useState, useEffect } from 'react';
import { APIContext } from './APIContext';

function ContextProvider({ children }) {
    const [transactionDetails, setTransactionDetails] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    
    const [logInID, setLogInID] = useState(() => {
        // get from localStorage on first render
        const saved = localStorage.getItem("logInID");
        return saved ? JSON.parse(saved) : null;
    });

    // Update localStorage whenever logInID changes
    useEffect(() => {
        if (logInID) {
            localStorage.setItem("logInID", JSON.stringify(logInID));
        } else {
            localStorage.removeItem("logInID"); // optional: clean up when null
        }
    }, [logInID]);

    return (
        <APIContext.Provider value={{ 
            transactionDetails, setTransactionDetails,
            isShow, setIsShow,
            userDetails, setUserDetails,
            logInID, setLogInID
        }}>
            {children}
        </APIContext.Provider>
    );
}

export default ContextProvider;
