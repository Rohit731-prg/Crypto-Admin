import axios from 'axios'
import React, { useState } from 'react'

function TransactionTest() {
    const [transactionDetails, setTransactionDetails] = useState({
        buyerId: "",
        type: '',
        transactionProof: '',
        amount: '',
        coin: '',
    });

    const [image, setImage] = useState('');

    const handleSubmit = async () => {
        
        const data = {
            buyer: transactionDetails.buyerId,
            type: transactionDetails.type,
            transactionProof: transactionDetails.transactionProof,
            amount: transactionDetails.amount,
            coin: transactionDetails.coin,
            image: image
        };
        console.log(data.image);

        try {
            const res = await axios.post('http://localhost:4000/transactions/insert', data);
            console.log(res.data);
        } catch (error) {
            console.error("Error submitting transaction:", error);
        }
    }

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center gap-3'>
            <input 
                value={transactionDetails.buyerId}
                onChange={(e) => setTransactionDetails({...transactionDetails, buyerId: e.target.value})}
                placeholder='Buyer ID'
                type="text"
            />
            <input 
                value={transactionDetails.type}
                onChange={(e) => setTransactionDetails({...transactionDetails, type: e.target.value})}
                placeholder='Type'
                type="text"
            />
            <input 
                value={transactionDetails.transactionProof}
                onChange={(e) => setTransactionDetails({...transactionDetails, transactionProof: e.target.value})}
                placeholder='Transaction Proof'
                type="text"
            />
            <input 
                value={transactionDetails.amount}
                onChange={(e) => setTransactionDetails({...transactionDetails, amount: e.target.value})}
                placeholder='Amount'
                type="number"
            />
            <input 
                value={transactionDetails.coin}
                onChange={(e) => setTransactionDetails({...transactionDetails, coin: e.target.value})}
                placeholder='Coin'
                type="number"
            />
            <input 
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setImage(reader.result);
                        };
                        reader.readAsDataURL(file);
                    }
                }}
                type="file"
            />

            <button onClick={handleSubmit}>
                Submit
            </button>
        </div>
    )
}

export default TransactionTest;
