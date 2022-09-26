import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'

import sendRegistation from '../Connections/Cookies';


function Regmobile() {

    //sign up
    const userRegister = (e) => {
        e.preventDefault()
        let form = []
        const formdata = new FormData(document.getElementById('mobilereg'))
        for (let data of formdata.entries()) {form.push(data[1])}
        if (form[4] === form[5]) {
            sendRegistation(form[0], form[1], form[2], form[3], form[5])
        } else { alert('Please make sure passwords are same')}
    }


  return (

    <Wrapper>
        <form id='mobilereg' onSubmit={userRegister}>
            <label htmlFor="Register">Register</label>
            <div>
                <input className='inputinfo' type="text" placeholder='First Name' name='First' required/>
                <input className='inputinfo'type="text" placeholder='Last Name' name='Last' required/>
            </div>
            <input className='inputreg'type="email" placeholder='Email' name='Email' 
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required/>
            <input className='inputreg'type="text" placeholder='Create Username' name='username' required/>
            <input className='inputreg' type="password" placeholder='Create Password' name='createpassword' 
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters" required/>
            <input className='inputreg'type="password"placeholder='Re-type Password' name='password' 
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required/>
            <h3 style={{ fontSize: '.9rem', margin: '1rem' }}>{'If alreay have an account go to '}
                <NavLink to='/auth' style={{color: 'brown'}}>login page</NavLink>
            </h3>
            <button>Register</button>
        </form>

    </Wrapper>

  )
}

const Wrapper = styled.div`
  padding: 6rem 0;

  width: 100vw;
  height: 80vh;
  font-size: 1.5rem;

  #mobilereg{
        all: unset;
        display: flex;
        flex-direction: column;
        align-items: center;

        font-size: 1.5rem;

        label{margin-top: -2rem; font-weight: bold;}
        .inputreg{
            display: flex;
            justify-content: start;
            align-items: center;
            position: relative;
            margin: .5rem 0;
            padding-left: 1rem;
            width: 80vw;
            height: 3rem;
            border: unset;
            background-color: #80808045;
            border-radius: .5rem;
            font-size: 1rem;
            font-weight: bold;
            font-family: sans-serif;
            color: #000000;
            transition: all 0.2s ease-in-out;
            &::placeholder{color: #424242da;}
            &input:focus{ border: 2px solid #c5323250;}
        }

        button{
            all: unset;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: .5rem;
            aspect-ratio: 3/1;
            width: 6rem;
            color: white;
            font-size: 1rem;
            font-weight: bold;
            background-color: #58370b;
            border-radius: 0.5rem;
            cursor: pointer;
        }
        .inputinfo{
            all: unset; 
            margin: 1rem .5rem;
            padding: 0.5rem;
            width: 36vw;
            height: 2rem;
            border: unset;
            background-color: #80808045;
            border-radius: .5rem;
            font-size: 1rem;
            font-weight: bold;
            font-family: sans-serif;
            color: #000000;
            transition: all 0.2s ease-in-out;
            &::placeholder{color: #424242da;}
            &input:focus{ border: 2px solid #c5323250;}
        }
  }

 @media screen and (min-width: 800px) {
  padding-bottom: 50rem;
 }

`


export default Regmobile