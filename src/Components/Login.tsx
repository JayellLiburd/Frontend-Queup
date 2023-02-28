import React from 'react';
import styled from 'styled-components'
import { GoogleLogin } from '@react-oauth/google';
import { session } from 'Connections';

function Log() {

    function menu() {
        const menubg = document.querySelector('.burger')
        const openmenu = document.querySelector('.sidenav')
        const topnavcolor = document.querySelector('.topnav')
        const login = document.querySelector('.login_modal')
        if (!menubg || !openmenu || !topnavcolor || !login) return
        menubg.classList.remove('open');
        openmenu.classList.remove('open')
        topnavcolor.classList.remove('open')
        login.classList.remove('open')
    }

    function Switchform() {
        const login = document.querySelector('.login_modal')
        const signup = document.querySelector('.signup')
        if (!login || !signup) return
        login.classList.remove('open')
        signup.classList.add('open')
    }

    const username = React.useRef<HTMLInputElement>(null)
    const password = React.useRef<HTMLInputElement>(null)
    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!username.current || !password.current) return alert('Please fill in all login credentials')
        session.login( 'standard', {credentials: { username: username.current?.value, password: password.current?.value}})
    }

    const responseGoogle = (response: any) => { session.login('google', {partyData: response}) }

    return (
      <Wrapper>
        <h1>Queup Next
        </h1>
        <div className="glow" />
        <div className="log">
            <form className='login' name='Login' onSubmit={e => submit(e)}>
                <div className='socials'>
                    <GoogleLogin 
                        onSuccess={responseGoogle}
                        size='medium' 
                        width='350'
                    />
                </div>
                <h2 className='close' onClick={menu}>X</h2>
                <h2>Login</h2>
                <input ref={username} type="text" name='user' placeholder='username' autoComplete="on"/>
                <input ref={password} type="password" name='current-password' placeholder='password' autoComplete="on"/>
                <h3 style={{ fontSize: '1rem', marginTop: '2rem', fontFamily: 'serif' }}>{'If you do not have an account go to '}
                    <p onClick={Switchform} style={{color: 'brown'}}>{' Signup Page'}</p>
                </h3>
                <button>Login</button>
            </form>
        </div>
      </Wrapper>
    )
  }
  
  const Wrapper = styled.div.attrs({className: 'login_modal'})`
    display: flex;
    visibility: hidden;
    justify-content: center;
    position: relative;
    width: 100vw;
    height: 0vh;
    overflow: hidden;
    background-image: url('Images/soft-grad.jpg');
    background-size: cover;
    z-index: 1;
    h1{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 1.5rem;
        margin: 0;
        color: #cdc4bb;
        font-family: 'Cinzel', serif;
        font-size: 2rem;
        z-index: 2;
    }
    .glow{
        position: absolute;
        top: 5.6rem;
        width: 30vw;
        height: 6rem;
        border-radius: 50%;
        box-shadow: 0 -25px 30px 0 #ffefde5d;
        z-index: -1;
        animation: glow 2s ease-in-out infinite;
        @keyframes glow {
            0%, 100% {
                box-shadow: 0 -25px 30px 0 #ffefdee1;
            }
            50% {
                box-shadow: 0 -25px 30px 0 #ffefde;
            }
        }
    }
    .login{
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-top: 5.5rem;
        width: 30vw;
        height: 0;
        overflow: hidden;
        background-color: white;
        z-index: 2;
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI';
            background-color: #8d8d8d;
            border-radius: .5rem;
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
            cursor: pointer;
            &:hover{
                border: 1px solid black;
                color: #e0e0e0;
            }
        }
    }
    &.open{
        visibility: visible;
        pointer-events: all;
        height: 100vh;
        .login{
            display: flex;
            padding: 3rem;
            padding-top: 2rem;
            padding-bottom: 5rem;
            height: max-content;
            input{display: block;}
        }
    }
    @media (max-width: 1200px) {
        display: none;
    }
  `



export default Log