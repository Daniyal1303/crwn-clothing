import { createContext,useState,useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

interface contextState 
{ categoriesMap: any, setProducts?: React.Dispatch<React.SetStateAction<any>> }

export const CategoriesContext = createContext<contextState>({
  categoriesMap: [],
})

export const CategoriesProvider = ({children}:any) => {
    const[categoriesMap,setCategoriesMap] = useState({});

    useEffect(()=>{
      
      const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments();
        setCategoriesMap(categoryMap)
        
      }
      getCategoriesMap();
    },[])
   
    const value = {categoriesMap}
   

   
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
