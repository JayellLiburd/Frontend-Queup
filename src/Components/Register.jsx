import React from 'react';
import styled from 'styled-components'
import { GoogleLogin } from '@react-oauth/google';
import sendRegistation from '../Connections/Cookies';
import setAbclogin from '../Connections/login';


function Reg() {

    function menu(e) {
        const menubg = document.querySelector('.burger')
        const openmenu = document.querySelector('.sidenav')
        const topnavcolor = document.querySelector('.topnav')
        const signup = document.querySelector('.signup')
        menubg.classList.remove('open');
        openmenu.classList.remove('open')
        topnavcolor.classList.remove('open')
        signup.classList.remove('open')
    }

    function Switchform() {
        const login = document.querySelector('.login_modal')
        const signup = document.querySelector('.signup')
        login.classList.add('open')
        signup.classList.remove('open')
    }

    let form = []
    const submit = (e) => {
        form = []
        e.preventDefault()
        const formData = new FormData(document.querySelector('.reg'))
        for (var data of formData.entries()) {
          form.push(data[1]);
        }
        sendRegistation(form[0], form[1], form[2], form[3], form[4])
    }

    const responseGoogle = (response) => { setAbclogin(response) } 

    return (
      <Wrapper>
          <form className='reg'>
            <div className='socials'>
                    <GoogleLogin 
                        onSuccess={responseGoogle}
                        size='medium' 
                        width='350'
                    />
            </div>
            <h2 className='close' onClick={menu}>X</h2>
                <h2>Sign Up for Queup</h2>
                <div className='name'>
                    <input className='inputinfo'
                        type="text" 
                        placeholder='First Name' 
                        name='First' />

                    <input className='inputinfo'
                        type="text" 
                        placeholder='Last Name' 
                        name='Last' />
                </div>
                <input className='inputreg'
                        type="text" 
                        placeholder='Email' 
                        name='Email' />

                <input className='inputreg'
                    type="text" 
                    placeholder='Create Username' 
                    name='username' />

                <input className='inputreg' type="password" placeholder='Create Password'/>

                <input className='inputreg'
                    type="password"
                    placeholder='Re-type Password' 
                    name='password'/>
                <h3 style={{ fontSize: '1rem', fontFamily: 'serif' }}>{'If you do have an account go to '}
                    <p onClick={Switchform} style={{color: 'brown'}}>{' Login Page'}</p>
                </h3>
                <button id='btn' onClick={submit}>Register</button>
            </form>
      </Wrapper>
    )
  }
  
  const Wrapper = styled.div.attrs({className: 'signup'})`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 0vh;
    background-color: #000000ae;
    .reg{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 30vw;
        height: 0vh;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI';
        overflow: hidden;
        background-color: white;
        border-radius: 0 0 .5rem .5rem;
        transition: all 0.2s ease-in-out;
        .close{
            position: absolute;
            right: 2rem; 
            top: 0rem;
            cursor: pointer;
        }
        .socials{
            padding: 1rem 1vw;
            border-bottom: 2px solid black;
        }
        h2{color: #72460c;}
        input{
            all: unset;
            display: none;
            margin: .5rem 0; 
            padding: .5rem;
            padding-left: 1rem;
            width: 20vw;
            height: 1.5rem;
            font-weight: bold;
            background-color: #8d8d8d;
            border-radius: .5rem;
            cursor: pointer;
            &::placeholder{color: white;}
        }
        h3{display: flex; justify-content: center; align-items: center; p{text-indent: .3rem; font-size: .8rem; cursor: pointer;}}
        button{
            all: unset;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            bottom: 2rem;
            aspect-ratio: 3/1;
            width: 6rem;
            color: white;
            font-weight: bold;
            background-color: #58370b;
            border-radius: .5rem;
            &:hover{
                border: 1px solid black;
                color: #e0e0e0;
            }
        }
        .name{
            display: flex;
            justify-content: center;
            margin: 0;
            width: 30vw;
            margin: .5rem 0;
            input{
                width: 8.9vw; 
                margin: 0 1rem;
            }
        }
      }
      &.open{
        height: 100vh;
        .reg{
            padding: 3rem;
            padding-top: 2rem;
            padding-bottom: 5rem;
            height: max-content;
            input{display: block;}
        }
    }
    @media (max-width: 1400px) {
        display: none;
    }
  `



export default Reg