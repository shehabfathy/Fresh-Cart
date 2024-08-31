import  { createContext, useState } from "react";

// Create a context object
export const userToken = createContext();

export default function TokenContextProvider(props) {
    const [token, setToken] = useState(null);

    return (
        <userToken.Provider value={{ token, setToken }}>
            {props.children}
        </userToken.Provider>
    );
}
