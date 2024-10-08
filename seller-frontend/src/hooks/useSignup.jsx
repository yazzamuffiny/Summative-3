//react imports
import { useState } from 'react';

//package imports
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

//context imports
import { useAuthContext } from './useAuthContext';

//base url
const baseURL = import.meta.env.VITE_API_BASE_URL

export const useSignup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(true)

        try {
            const response = await axios.post(`${baseURL}/api/user/signup`,
                {email, password},
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status !== 200) {
                setIsLoading(false)
                setError(error.response.data.error)
            }

            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data))
                dispatch({type: 'LOGIN', payload: response.data})

                setIsLoading(false);
                navigate('/seller-home');
            }

            console.log(response);
        } catch (error) {
            console.error(error.response.data.error)
            setError(error.response.data.error)
            setIsLoading(false); 
        }
    }

    return {signup, isLoading, error}
}