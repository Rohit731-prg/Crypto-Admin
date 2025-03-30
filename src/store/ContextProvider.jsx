import React, { useState } from 'react'
import { APIContext } from './APIContext'

function ContextProvider({ children }) {  // Fixed typo
    const [transactionDetails, setTransactionDetails] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    return (
        <APIContext.Provider value={{ transactionDetails, setTransactionDetails, isShow, setIsShow, userDetails, setUserDetails }}>
            {children}
        </APIContext.Provider>
    )
}

export default ContextProvider;
