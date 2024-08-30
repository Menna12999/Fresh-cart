import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export  let userContext = createContext(null);

export default function UserContextProvider({children}){
    const [isLogin,setLogin] =useState(null)
    //handle refresh
    useEffect(()=>{
        if(localStorage.getItem('userToken')){
            setLogin(jwtDecode(localStorage.getItem('userToken')))
        }
    },[])
    return(
        <userContext.Provider value={{isLogin,setLogin}}>
            {children}
        </userContext.Provider>
    )
}

