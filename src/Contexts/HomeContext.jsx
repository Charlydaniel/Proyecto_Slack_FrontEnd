import { createContext, useEffect, useState } from "react";


export const HomeContext = createContext({isLoading:true})


const HomeProvider = ({children})=>{

    const [isLoading,setLoading]=useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [])

    return(
        <HomeContext.Provider value={{isLoading}}>
            {children}
        </HomeContext.Provider>
    )
}
export default HomeProvider