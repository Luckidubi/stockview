import { createContext, useContext, useState } from "react";

export const WatchListContext = createContext()

export const useWatchList = () =>  useContext(WatchListContext)

export const WatchListProvider = ({children}) =>{
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

    const addStock = (stock) => {
        
    }
    return(
        <WatchListContext.Provider value={{watchList}}>
            {children}
        </WatchListContext.Provider>
    )
}