import  { useState, useEffect} from 'react';

function useTransaction() {
    const [ transactionData, setTransactionData ] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/transactions")
          .then(response => response.json())
              .then((data) =>  {
              setTransactionData(data)
            })
        }, [])
    return transactionData
}

export default useTransaction;