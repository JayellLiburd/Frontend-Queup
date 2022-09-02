import React, { useContext } from 'react'
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BsPersonFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai'

import { usersContext } from '../Connections/user';

import Reg from './Register';
import Log from './Login'
import { useState } from 'react';


function Topnav() {

    const Filters = ['Trending in ' + 'Houston', 'Food', 'Events', 'Hype Gear', 'Unicorns']

    const {auth, openL, setOpenLog, openR, setOpenReg, setMenu} = useContext(usersContext);

    const openLogModal = () => {setOpenLog(true); setOpenReg(false)}
    const openRegModal = () => {setOpenLog(false); setOpenReg(true)}

    const [sidenav, setSidenav] = useState(false)

    const nav = useNavigate()

    const OpenNav = () => {setSidenav(true)}
    const  CloseNav = () => {setSidenav(false)}

    //button animation
    let menuOpen = false;
    function menu(e) {
        const menubg = document.querySelector('.burger')
        const openmenu = document.querySelector('.sidenav')
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
        axios.get('http://localhost:4000/logout', {withCredentials: true}).then((response) => {
            nav('/', {replace: true})
            window.location.reload()
            CloseNav()
        })}


    return (

    <Nav>
        <section className='desktop'>
            
            <a href='/' id='Q'><h3>queup</h3></a>
            <input type="text" placeholder='Search...' />
            <div >
                <button><AiOutlineSearch size='1.5rem'/></button>
                <button><BsPersonFill size='1.5rem'/></button>
            </div>
            
            <div id='links'>
                {auth  ? <NavLink to='account'><button className='routes'>Account</button></NavLink>
                : <><button id='logbutton' className='routes' style={openL  ? {backgroundColor: "#523a26cf", color: 'white'} : {} } onClick={openLogModal}>Login</button> {openL  ? <div id='login'><Log/></div> : <></>}</>}

                {auth  ? <NavLink to='Overview'><button className='routes'>Business</button></NavLink>
                :<><button className='routes' id='regbutton' style={openR  ? {backgroundColor: "#523a26cf", color: 'white'} : {} } onClick={openRegModal}>Sign Up</button> {openR  ? <div id='reg'><Reg/></div> : <></>}</>}

                <button className='routes'>Rewards</button>

                {auth  ? <button className='routes' onClick={logout}>Log Out</button>
                :<><button className='routes' id='regbutton' >Contact</button></>}
            </div>
        </section>
        <section className='mobile'>
            <div/>
            <button id='burger' onClick={menu}> <div className='burger'/> <p>menu</p></button>
            
            <div className='sidenav'>
                <NavLink onClick={menu} to='/' id='logbutton' className='routes'>Homepage</NavLink>

                {auth  ? <NavLink onClick={menu} to='account' className='routes'>Account</NavLink>
                :<NavLink onClick={menu} to='auth' id='logbutton' className='routes'>Login</NavLink>}

                {auth  ? <NavLink onClick={menu} to='Overview' className='routes'>Business</NavLink>
                :<NavLink onClick={menu} to='/reg' className='routes' id='regbutton'>Sign Up</NavLink>}

                <NavLink onClick={menu} to='/' className='routes'>Rewards</NavLink>

                {auth  ? <button style={{color: '#865c3ace'}} onClick={logout} className='routes'>Log Out</button>
                :<NavLink onClick={menu} to='/' className='routes' id='regbutton'>Contact</NavLink>}
            </div>

        </section>
    </Nav>
    )
}



const Nav = styled.nav`
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0rem;
    left: 0;

    width: 100vw;
    height: 4rem;

    font-family: 'Cinzel', serif; 

    z-index: 10;

    border-bottom: 1px solid #cfcfcf;


    section{
        display: flex;
        position: fixed;
        justify-content: space-between;
        align-items: center;
        width: 90vw;
        div{
            display: none;
            justify-content: space-between;
            width: 4rem;
            padding-right: 2rem;
            button{
                all: unset;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

    .desktop{
        display: flex;
        justify-content: space-evenly;
        top: 0;
        margin: 0;
        width: 100vw;
        height: 4rem;
        margin-left: -15rem;
        background-color: #ffffffa6;
        backdrop-filter: blur(15px);
        #Q{ all: unset; font-size: 1.1rem; padding-left: 2rem;}
        #links{
            display: flex;
            .routes{font-size: 1rem; min-width: 5rem;}
            button{ 
                all: unset; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                margin: 0px 1rem; 
                cursor: pointer; 
                font-weight: 600; 
                text-decoration: 1px underline solid grey; 
                color: #865c3ace;
                border-radius: 8px;
            }
        }
    }
    
    .mobile{
        display: none;
        width: 80vw;
        margin: 0;
        z-index: 4;
    }

    // ------ menu animation ------

    #burger{
        all: unset;
        display: flex; 
        justify-content: center;
        align-items: center;
        position: relative;
        height: 2rem;
        width: 2rem;
        z-index: 2;
        padding: .5rem;

        background: #f7f7f7;
        border: 3px solid #2b211850;
        border-radius: .5rem;
        p{position: absolute; font-size: .8rem; top: 1.1rem;}
    }

    .burger{
        all:unset;
        height: .1rem;
        width: 1.5rem;
        border-radius: 1rem;
        background-color: black;
       //z-index is negative because the burger visual was being pressed rather than the button itself 
        z-index: -1;

        &::before, ::after{
            content: '';
            position: absolute;
            height: .1rem;
            width: 1.5rem;
            border-radius: 1rem;
            background-color: black;
            transition: all .8s ease;}
        &::before{transform: translateY(-5px)}
        &::after{transform: translateY(5px) rotate(180deg)}
    }

    .burger.open{
        background-color: transparent;
        &::before {transform: rotate(45deg)}
        &::after{transform: rotate(-45deg)}
    }

    /* #icon{
        display: none;
        justify-content: center;
        align-items: center;
        padding: .7rem;

        background: #f7f7f7;
        border: 3px solid #2b211850;
        border-radius: 50%;
        z-index: 4;
    } */
    
    // ----------------------------

    #login { position: absolute;}
    #reg { position: absolute;}

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
        &:focus { border: 2px solid #2e2e2e50; color: #4b4b4b; &::placeholder{color: #646464;}};
    }

    
    // menu for mobile nav
    @media (max-width: 1800px) {
        .sidenav{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: fixed;
            bottom: 0vh;
            left: 0rem;

            color: transparent;

            width: 100vw;
            height: 105vh;

            transform: translateY(-100%);
            background-color: #000000f4;

            .routes{padding: 1rem;}
            a{color: white; &:active{background-color: #ffffff29}} 

            transition: all .5s ease-in-out;
        &.open{ transform: translateY(0%); }}
    }

    //small screens showing
    @media (max-width: 1200px) {
        .mobile{display: flex; bottom: 2rem;}
        #icon {display: flex}
        #nav-link{h1{display: none;}}
        .desktop{#links{display: none;} input{display: none;} #Q{margin-right: 0;} margin-left: 0rem; justify-content: space-between;}
        form{display: none;}
        #Queup{display: none;}
        input{display: none;}
        section div{display: flex;}
    }


`


export default Topnav