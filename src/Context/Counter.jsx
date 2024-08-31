import { createContext, useState } from 'react';
export let AgeContext = createContext()
export default function AgeContextProvider(props) {

    const [count, setCounter] = useState(0);
    const[cartId,setCartId] = useState(null)


    return (
        <AgeContext.Provider value={{count, setCounter, cartId,setCartId }}>
            {props.children}
        </AgeContext.Provider>
    );
}
