//import context
import { AuthContext } from '../context/AuthContext';

//import form react
import { useContext } from 'react';

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error ('useAuthContext must be used inside of the AuthContextProvider')
    }

    return context
}