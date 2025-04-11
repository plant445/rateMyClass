import React, { useState } from 'react'
import '../index.css';
import Header from '../components/Header.jsx'
import LoginModal from '../components/LoginModal.jsx';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    return (
        <div>
            <div class='mb-10'><Header /></div>
            <div><LoginModal/> </div>
        </div>

        
    )
}

export default RegisterUser