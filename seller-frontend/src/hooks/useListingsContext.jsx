import { ListingsContext } from "../context/ListingsContext";
import { useContext } from "react";

export const useListingsContext = () => {
    const context = useContext (ListingsContext)  // provides both state and dispatch

    if (!context) {
        throw Error('useListingsContext hook must be used inside ListingsContextProvider'); 
    }// There is only context when this is invoked inside ProjectsContextProvider

    return context
}