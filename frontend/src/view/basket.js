import React, { useContext} from 'react';
import { UserContext } from "../component/context/userContext";



export function Basket(){
    const msg = useContext(UserContext);

    return (
        <div>
            <h2>Basket</h2>
            <div>{msg}</div>
        </div>
    );
}
