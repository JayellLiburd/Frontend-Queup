import React, { useContext } from 'react'
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BsPersonFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi'

import { usersContext } from '../Connections/user';

import Reg from './Register';
import Log from './Login'
import { useState } from 'react';


function Topnav() {

    const {auth, openL, setOpenLog, openR, setOpenReg, setMenu} = useContext(usersContext);

    const openLogModal = () => {setOpenLog(true); setOpenReg(false)}
    const openRegModal = () => {setOpenLog(false); setOpenReg(true)}

    const [sidenav, setSidenav] = useState(false)

    const nav = useNavigate()

    const OpenNav = () => {setSidenav(true)}
    const  CloseNav = () => {setSidenav(false)}

    //button animation
    const menubg = document.querySelector('.burger')
    const openmenu = document.querySelector('.sidenav')
    let menuOpen = false;
    function menu(e) {
        if(!menuOpen) {
            menubg.classList.add('open')
            openmenu.classList.add('open')
            menuOpen = true;
        }
        else {
            menubg.classList.remove('open');
            openmenu.classList.remove('open')
            menuOpen = false
        }
    }



    const logout = () => { 
        axios.get('https://app.queueupnext.com/logout', {withCredentials: true}).then((response) => {
            nav('/', {replace: true})
            window.location.reload()
            CloseNav()
        })}

    return (

    <Nav>
        <section>
            <div>
                <NavLink to='' className="nav-link" id='brand' style={{ textDecoration: 'none' }}>
                        <h1 id='Queup'>Queup</h1>
                </NavLink>
                <button id='burger' onClick={menu}> <div className='burger'/> </button>
            </div>
            <a id='mobile-q' href='/'><h3>queup</h3></a>

            <input type="text" placeholder='Search...' />

            <NavLink to={auth  ? 'account ' : 'auth'} onClick={() => setMenu(false)} id='icon'><BsPersonFill id='acc-small' size='1.5rem' color='#242424'/></NavLink>
            
            <div className='sidenav'>
                <NavLink onClick={sidenav === false ? OpenNav : CloseNav} to='/' id='logbutton' className='routes'>Homepage</NavLink>

                {auth  ? <NavLink onClick={sidenav === false ? OpenNav : CloseNav} to='account' className='routes'>Account</NavLink>
                :<NavLink onClick={sidenav === false ? OpenNav : CloseNav} to='auth' id='logbutton' className='routes'>Login</NavLink>}

                {auth  ? <NavLink onClick={sidenav === false ? OpenNav : CloseNav} to='Overview' className='routes'>Business</NavLink>
                :<NavLink onClick={sidenav === false ? OpenNav : CloseNav} to='/reg' className='routes' id='regbutton'>Sign Up</NavLink>}

                <NavLink onClick={sidenav === false ? OpenNav : CloseNav} to='/' className='routes'>Rewards</NavLink>

                {auth  ? <button style={{color: '#865c3ace'}} onClick={logout} className='routes'>Log Out</button>
                :<NavLink onClick={sidenav === false ? OpenNav : CloseNav} to='/' className='routes' id='regbutton'>Contact</NavLink>}
            </div>
            
            <div id='links'>
                {auth  ? <NavLink to='account' id='account'><button className='routes'>Account</button></NavLink>
                : <><button id='logbutton' className='routes' style={openL  ? {backgroundColor: "#523a26cf", color: 'white'} : {} } onClick={openLogModal}>Login</button> {openL  ? <div id='login'><Log/></div> : <></>}</>}

                {auth  ? <NavLink to='Overview' ><button className='routes'>Business</button></NavLink>
                :<><button className='routes' id='regbutton' style={openR  ? {backgroundColor: "#523a26cf", color: 'white'} : {} } onClick={openRegModal}>Sign Up</button> {openR  ? <div id='reg'><Reg/></div> : <></>}</>}

                <button className='routes'>Rewards</button>

                {auth  ? <button className='routes' onClick={logout}>Log Out</button>
                :<><button className='routes' id='regbutton' >Contact</button></>}
            </div>

        </section>
    </Nav>
    )
}



const Nav = styled.nav`
    all: unset;

    display: flex;
    @media (min-width: 1800px){justify-content: center}
    align-items: center;
    position: fixed;
    top: 0rem;
    left: 0;
    margin-bottom: 4rem;

    width: 100vw;
    height: 4rem;

    font-family: 'Cinzel', serif; 
    background-color: #ffffffa6;
    backdrop-filter: blur(15px);

    z-index: 3;


    // ------ menu animation ------
    
    #burger{
        all: unset;
        display: flex; 
        justify-content: center;
        align-items: center;
        height: 2rem;
        width: 2rem;
    }

    .burger{
        all:unset;
        height: .2rem;
        width: 1.5rem;
        border-radius: 1rem;
        background-color: black;
        transition: all .2s ease-in-out;

        &::before, ::after{
            content: '';
            position: absolute;
            height: .2rem;
            width: 1.5rem;
            border-radius: 1rem;
            background-color: black;
            transition: all .5s ease-in-out;}
        &::before{transform: translateY(-6px)}
        &::after{transform: translateY(6px) rotate(180deg)}
    }

    .burger.open{
        background-color: transparent;
        &::before {transform: rotate(45deg)}
        &::after{transform: rotate(-45deg)}
    }

    // ----------------------------

    #login { position: absolute;}
    #reg { position: absolute;}

    section{
        display: flex;
        position: fixed;
        justify-content: space-between;
        align-items: center;
        margin-left: 1rem;

        width: 90vw;}

    #icon{
        display: none;
        margin-right: 1.8rem;
        justify-content: center;
        align-items: center;}

    .nav-link{
        h1{ color: black; font-size: 1.8rem; }
        h2{ font-size: 1.3rem; color: #383838ce; }}


    .user{ display: flex; 
            margin: 0;
            margin-left: 12rem; }

    button{ all: unset; display: flex; justify-content: center; align-items: center; margin: 0px 1rem; cursor: pointer; font-weight: 600; text-decoration: 1px underline solid grey; color: #865c3ace; border-radius: 8px;}

    div{ 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        margin-left: 1rem; 
        padding: 0 1rem;

        height: 3rem;

        .routes{ 
            all: unset; 
            margin: 0px 1rem;
            padding: .2rem 1rem;

            
            font-weight: 600; 
            text-decoration: 1px underline solid grey; 
            color: #383838ce; 

            cursor: pointer; 
            border-radius: 8px;

            &:hover{border: 1px solid #c2c2c2; margin: 0rem .94rem; transition-delay: 0.05s;}}
        a{ display: flex; justify-content: center; align-items: center; height: 3rem;}}


    input{ 
        all: unset; 
        height: 1.8rem;
        width: 60vh;
        padding-left: 1rem;

        border: 2px solid #2e2e2e37; 
        border-radius: .5rem;

        font-weight: bold;
        font-family: sans-serif;
        color: grey;

        &:hover { border: 2px solid #00000050; transition: all 0.2s ease-in-out; }
        &:focus { border: 2px solid #2e2e2e50; color: #4b4b4b; &::placeholder{color: #646464;}};}

    
    // menu for mobile
    @media (max-width: 1800px) {
        .sidenav{
            display: flex;
            flex-direction: column;
            justify-content: unset;
            position: absolute;
            top: 3.95rem;
            left: -3rem;
            padding: 1rem 0;

            color: transparent;

            width: 20rem;
            height: 100rem;

            transform: translateX(-100%);
            background-color: #000000f4;

            .routes{padding: 1rem;}
            a{color: white; &:active{background-color: #ffffff29}} 

            transition: all .5s ease;
        &.open{ transform: translateX(0%); }}
    }
    
    //what not to show on big screens
    @media (min-width: 1800px){
        border-bottom: 1px solid #cfcfcf;
        #burger{display: none;}
        .user{display: none;}
        #mobile-q{display: none}
        .sidenav{display: none;}
    }

    //small screens showning
    @media (max-width: 1800px) {
        #icon {display: flex}
        #nav-link{h1{display: none;}}
        #links{display: none;}
        .routes{display: none;}
        form{display: none;}
        #Queup{display: none;}
        input{display: none;}
        #mobile-q{all: unset; margin-left: -.5rem;}
    }


`


export default Topnav