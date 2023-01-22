import {createContext, useState, useEffect} from 'react'
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils'

interface contextState 
{ currentUser: any, setCurrentUser: React.Dispatch<React.SetStateAction<any>> }

export const UserContext = createContext<contextState>({
  currentUser: null,
  setCurrentUser:()=> null,
})

export const UserProvider = ({children}:any) => {
    const[currentUser,setCurrentUser] = useState(null);
    const value = {currentUser,setCurrentUser}
   
    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user:any) =>{
           if(user) {
           createUserDocumentFromAuth(user)
           }
           setCurrentUser(user);
        })
        return unsubscribe;
    },[])
   
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
