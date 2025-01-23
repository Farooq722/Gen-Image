import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios  from 'axios'
import { useNavigate } from 'react-router-dom';


export const AppContext = createContext();


const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(false);
    const navigate = useNavigate();

    const backend_url = import.meta.env.VITE_BACKEND_URL;

    const getCredits = async () => {
        try {
            /* get credits */
            const { data } = await axios.get(`${backend_url}/api/user/credits`, {
                headers: {
                    "Content-Type": "application/json",
                    token, // Add the token in headers
                },
            });
            
            if(data.success){
                setCredit(data.credits);
                setUser(data.user)
            }
            

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const generateImage = async(prompt) => {
        try {
            const { data } = await axios.post(`${backend_url}/api/image/gen-image`, {prompt},{headers:{token}})
            if(data.success) {
                getCredits()
                return data.resultImage
            } else {
                toast.error(data.message)
                getCredits()
                if(data.creditBalance === 0) {
                    navigate('/buy')
                }
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken("")
        setUser(null)
    }

    useEffect(() => {
        if(token) {
            getCredits()
        }
    },[token])

    const value = {
        user, setUser, showLogin, setShowLogin, backend_url, token, setToken, credit, setCredit, getCredits, logout, generateImage
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;