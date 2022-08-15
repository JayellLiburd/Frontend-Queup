import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

import { GoogleLogin } from '@react-oauth/google';

import { usersContext } from '../Connections/user';
import { setAbclogin, standardLogin } from '../Connections/login';


function Log() {

    const nav = useNavigate();

    const { setOpenLog } = useContext(usersContext);

    const [checkUsername, setCheckusername] = useState('')
    const [checkPassword, setCheckpassword] = useState('')
    
    //unmount login UI
    const unFocus = (e) => {setOpenLog(false)}

    //login
    const setUserLogin = () => {standardLogin(checkUsername, checkPassword)}

    const responseGoogle = (response) => { setAbclogin(response) } 

  return (
    <Wrapper>
            <GoogleLogin 
                onSuccess={responseGoogle}
                size='medium' 
                width='350'
            />
        <div id='log'>
            <label htmlFor="Login"> -------------- or -------------- </label>
            <input className='inputreg'
                type="text"
                placeholder='Username or Email' 
                name='username' 
                onChange={(e) => {
                    setCheckusername(e.target.value)}}
            />
            <input className='inputreg'
                type="text"
                placeholder='Password' 
                name='password' 
                onChange={(e) => {
                    setCheckpassword(e.target.value)}}
            />
            <button id='btn' onClick={setUserLogin}>login</button>
        </div>
        <button id='unfocus' onClick={unFocus}></button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    all: unset;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 3.4rem;
    left: -17.8rem;

    color: white;
    width: 25rem;
    min-height: 22rem;
    font-size: 1.5rem;

    background-color: #694b24f0;

    #unfocus{all: unset; position: absolute; top: -4rem; left: -118rem;  height: 200vh; width: 200vw; z-index: -1;}
    #log{
        all: unset;
        display: flex;
        flex-direction: column;
        align-items: center;

        label{margin: .5rem; font-size: 1rem;}
        input{
            all: unset; 
            margin: 1rem 0;
            padding: .8rem;

            width: 20rem;
            height: 1rem;
            font-size: 1rem;
            font-family: 'Roboto Mono', monospace;
            
            background-color: grey;
            border: 1px solid #d3d3d3;
            border-radius: .4rem;

            &::placeholder{color: black;}
            &:focus { border: 2px solid white; background-color: grey; color: white; &::placeholder{color: white;}}

            }}

    div{margin-left: -.5rem; margin-bottom: .5rem;}
    #btn{ padding: .5rem; background-color: #ac9787cf; color: white; text-decoration: unset; }
`



export default Log