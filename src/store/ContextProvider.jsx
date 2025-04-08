import React, { useState } from 'react';
import { APIContext } from './APIContext';

function ContextProvider({ children }) {
    const [transactionDetails, setTransactionDetails] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    
    const [adminDetails, setAdminDetails] = useState({});
    const [isAdminCreate, setIsAdminCreate] = useState(false);
    const [adminID, setAdminID] = useState(null);

    return (
        <APIContext.Provider value={{ 
            transactionDetails, setTransactionDetails,
            isShow, setIsShow,
            userDetails, setUserDetails,
            adminDetails, setAdminDetails,
            isAdminCreate, setIsAdminCreate,
            adminID, setAdminID
        }}>
            {children}
        </APIContext.Provider>
    );
}

export default ContextProvider;
