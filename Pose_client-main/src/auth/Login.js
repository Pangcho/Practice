import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import axios from "axios";
import {LOGIN, NEW_USER} from '../api'
import {login} from "../state/userState";


import {Container, Input, Button, Loading} from '../UI/UIPackage';


function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [isLoginErrorMessage, setIsLoginErrorMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const dispatch = useDispatch();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const setLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(LOGIN, {
                email: email,
                password: password,
            });

            if (response.data.token) {
                sessionStorage.setItem('jwt', response.data.token);
                dispatch(login({token: response.data.token}));
                setIsLoginErrorMessage(false);
                setIsLoading(false);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            setError('Invalid email or password');
            setLoginErrorMessage('Invalid email or password!!');
            setIsLoginErrorMessage(true);
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <h1>로그인</h1>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '90%'}}>
                <form onSubmit={setLogin}>

                    <Input type="email" placeholder='Email' value={email} onChange={handleEmailChange}/>
                    <Input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange}/>
                    <Button type='submit'>
                        로그인
                    </Button>
                    <p style={{display: 'flex', justifyContent: 'center'}}>
                        {isLoading && (<Loading/>)}
                    </p>
                </form>
                {isLoginErrorMessage && <p style={{
                    color: 'red',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '-5px 0 -19px 0'
                }}>{loginErrorMessage}</p>}
            </div>
            <br/>
            <h5>계정이 없으신가요?&nbsp;&nbsp;<Link to={NEW_USER} style={{textDecoration: 'none'}}>회원가입</Link></h5>
        </Container>
    );
}

export default Login;