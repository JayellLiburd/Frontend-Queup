import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

import { sendRegistation } from '../Connections/Cookies';
import { usersContext } from '../Connections/user';


function Reg() {

    const nav = useNavigate();

    const {setOpenReg} = useContext(usersContext);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [email, setEmail] = useState('')

    //Connections
        //sign up
    const userRegister = () => {sendRegistation(username, password, first, last, email); nav('/', {replace: true}); setOpenReg(false)}


    // redirect after reload
    useEffect(()=>{if(window.location.hash) {nav('/');}})

    const unFocus = (e) => {setOpenReg(false)}

  return (
    <Wrapper>
        <div id='reg'>
            <label htmlFor="Register">Register</label>
            <div>
                <input className='inputinfo'
                    type="text" 
                    placeholder='First Name' 
                    name='First' 
                    onChange={(e) => {setFirst(e.target.value)}}/>

                <input className='inputinfo'
                    type="text" 
                    placeholder='Last Name' 
                    name='Last' 
                    onChange={(e) => {setLast(e.target.value)}}/>
            </div>
            <input className='inputreg'
                    type="text" 
                    placeholder='Email' 
                    name='Email' 
                    onChange={(e) => {setEmail(e.target.value)}}/>

            <input className='inputreg'
                type="text" 
                placeholder='Create Username' 
                name='username' 
                onChange={(e) => {setUsername(e.target.value)}}/>

            <input className='inputreg' type="text" placeholder='Create Password'/>

            <input className='inputreg'
                type="text"
                placeholder='Re-type Password' 
                name='password' 
                onChange={(e) => {setPassword(e.target.value)}}
            />
            <button id='btn' onClick={userRegister}>Register</button>
        </div>
        <button id='unfocus' onClick={unFocus}></button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    all: unset;
    position: absolute;
    top: 3.6rem;
    left: -17.8rem;

    width: 25rem;
    min-height: 25rem;
    font-size: 1.3rem;

    background-color: #694b24f0;

    #unfocus{all: unset; position: absolute; top: -4rem; left: -118rem;  height: 200vh; width: 200vw; z-index: -1;}

    #reg{
        all: unset;
        display: flex;
        flex-direction: column;
        align-items: center;

        color: white;
        font-size: 1.5rem;
        width: 20rem;
        height: 20rem;

        label{margin-top: -1rem}
        .inputreg{
            all: unset; 
            margin: .5rem 0;
            padding: .7rem;

            width: 20rem;
            height: 1rem;
            font-size: .9rem;
            font-family: 'Roboto Mono', monospace;
            
            background-color: grey;
            border: 1px solid #d3d3d3;
            border-radius: .4rem;

            &::placeholder{color: black;}
            &:focus { border: 2px solid white; background-color: grey; color: white; &::placeholder{color: white;}}
            }}
            
        .inputinfo{
            all: unset; 
            margin: 1rem 1rem;
            margin-left: .1rem;
            padding: .7rem;

            width: 8.6rem;
            height: 1rem;
            font-size: .9rem;
            font-family: 'Roboto Mono', monospace;
            
            background-color: grey;
            border: 1px solid #d3d3d3;
            border-radius: .4rem;

            &::placeholder{color: black;}
            &:focus { border: 2px solid white; background-color: grey; color: white; &::placeholder{color: white;}}
        }

    #btn{ padding: .2rem; background-color: #ac9787cf; color: white; text-decoration: unset; }
`



export default Reg