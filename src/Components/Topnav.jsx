import React, { useContext } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';

import { BsPersonFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai'
import { AiOutlineUserAdd } from 'react-icons/ai';
import { RiHome2Line } from 'react-icons/ri';
import { RiLoginBoxLine } from 'react-icons/ri';
import { MdManageAccounts } from 'react-icons/md';
import { MdLeakAdd } from 'react-icons/md';
import { IoBusinessOutline } from 'react-icons/io5';
import { IoRibbonOutline } from 'react-icons/io5';
import { CgLogOut } from 'react-icons/cg';

import { usersContext } from '../Connections/user';
import { Testwords } from '../Helpers/words';

import Reg from './Register';
import Log from './Login'
import Results from './Search';
import { Logout } from '../Connections/Cookies';
import { useState } from 'react';
import { useEffect } from 'react';



function Topnav() {

    const {auth} = useContext(usersContext);

    const [value, setValue] = useState('')
    const [results, setResults] = useState([])
    useEffect(() => {
        const handler = setTimeout(() => value != '' || null || undefined ? filterItems(Testwords, value) : '', 500)
        if (value == '' || null || undefined) {setResults(['CheeseCake Factory', 'Trusted Kicks', 'Micro Center', 'Nike', 'Turkey Leg Hut'])}
        return () => {clearTimeout(handler)}
    },[value])

    function filterItems(arr, query) {
        const filtered = arr.filter((el) => el.toLowerCase().match(query.toLowerCase())).slice(0, 5);
        setResults(filtered)
        console.log(results.length)
    }

    // Set Event listeners
    useEffect(() => {
        //Nick says think about already intergrated back buttons
        const login = document.querySelector('.login_modal')
        const signup = document.querySelector('.signup')
        const inputfield = document.getElementById('searchfield')
        const view = document.querySelector('.mobilemenu')
        const searchbar = document.getElementById('searchbar')
        const resultslist = document.querySelector('.resultslist')
        inputfield.addEventListener('focusout', e => { view.classList.remove('opensearch') })
        inputfield.addEventListener('focusin', e => { view.classList.add('opensearch')})
        searchbar.addEventListener('focusin', e => {
            if (resultslist.classList.contains('open') || login.classList.contains('open') || signup.classList.contains('open')) {
                resultslist.classList.add('open')
                login.classList.remove('open')
                signup.classList.remove('open')
            } 
            else {
                menu()
                resultslist.classList.add('open')
                login.classList.remove('open')
                signup.classList.remove('open')
            }
        })
    })


    //button animation
    let menuOpen = false;
    function menu(e) {
        const menubg = document.querySelector('.burger')
        const openmenu = document.querySelector('.sidenav')
        const topnavcolor = document.querySelector('.topnav')
        if(!menuOpen) {
            menubg.classList.add('open')
            openmenu.classList.add('open')
            topnavcolor.classList.add('open')
            menuOpen = true;
        }
        else {
            menubg.classList.remove('open');
            openmenu.classList.remove('open')
            topnavcolor.classList.remove('open')
            menuOpen = false
        }
    }

    function loginmodal() {
        const login = document.querySelector('.login_modal')
        const signup = document.querySelector('.signup')
        const resultslist = document.querySelector('.resultslist')
        if (signup.classList.contains('open') || resultslist.classList.contains('open')) {
            login.classList.add('open')
            signup.classList.remove('open')
            resultslist.classList.remove('open')
        } else {
            if(!menuOpen) {
                menu()
                login.classList.add('open')
                menuOpen = true;
            }
            else {
                menu()
                login.classList.remove('open')
                menuOpen = false
            }
        }
    }

    function signupmodal() {
        const login = document.querySelector('.login_modal')
        const signup = document.querySelector('.signup')
        const resultslist = document.querySelector('.resultslist')
        if (login.classList.contains('open') || resultslist.classList.contains('open')) {
            signup.classList.add('open')
            login.classList.remove('open')
            resultslist.classList.remove('open')
        } else {
            if(!menuOpen) {
                menu()
                signup.classList.add('open')
                menuOpen = true;
            }
            else {
                menu()
                signup.classList.remove('open')
                menuOpen = false
            }
        }
    }

    function Searchicon() {
        const inputfield = document.getElementById('searchfield')
        menu()
        inputfield.focus()
    }

    const logout = () => {Logout()}

    return (
    <Nav>   
        <section className='topnav'>
            <a className='nav large Queup' href="/">Queup</a>
            <input className='searchbar' id='searchbar' type="text" placeholder='Search Queup...' onChange={e => {setValue(e.target.value)}}/>
            <div className='nav large'>
                {auth  ? <NavLink to='account' className='routes'>Account</NavLink>
                :<button onClick={loginmodal} id='logbutton' className='routes'>Login</button>}

                {auth  ? <NavLink  to='Overview' className='routes'>Business</NavLink>
                :<button onClick={signupmodal} className='routes' id='regbutton'>Sign Up</button>}

                <NavLink to='/' className='routes'>Rewards</NavLink>

                {auth  ? <button style={{color: '#865c3ace'}} onClick={logout} className='routes'>Logout</button>
                :<NavLink to='/' className='routes' id='regbutton'>Contact</NavLink>}
            </div>
            <button className='nav mobile'><AiOutlineSearch size='1.5rem' onClick={Searchicon}/></button>
            <a className='nav mobile' href='/' id='Q'><h3>Q</h3></a>
            <button className='nav mobile'><NavLink style={{all: 'unset', display: 'flex', justifyContent: 'center', alignItems: 'center'}} to={auth ? '/account' : '/auth'}><BsPersonFill size='1.5rem'/></NavLink></button> 
        </section>
        <div className="log"><Log/></div>
        <div className="register"><Reg/></div>
        <div className="results"><Results value={value}/></div>
        <section className='mobilemenu'>
            <div/>
            <button id='burger' onClick={menu}> <div className='burger'/> <p>menu</p></button>
            
            <div className='sidenav'>
                <div className='search'>
                    <div><AiOutlineSearch size='1.5rem' color='#ffffffda'/></div>
                    <input type="text" placeholder='Search Queup...' id='searchfield' onChange={e => setValue(e.target.value)}/>
                </div>
                <div className='searches'>
                    {results.map(searches => {
                        return (
                            <NavLink onClick={menu} to={'/store/' + searches} className='routes' key={searches}>{searches}</NavLink>
                        )
                    })}
                    {results.length < 5 ? <p style={{color: 'white', display: 'flex', justifyContent: 'center', width: '100vw', margin: 'auto', fontSize: '.8rem'}}>------ End of Results ------</p> : <></>}
                </div>
                <div className='mobilenav'>

                    <NavLink onClick={menu} to='/' id='logbutton' className='routes'><RiHome2Line color='white' size='1.5rem'/>Homepage</NavLink>

                    {auth  ? <NavLink onClick={menu} to='account' className='routes'><MdManageAccounts color='white' size='1.5rem'/>Account</NavLink>
                    :<NavLink onClick={menu} to='auth' id='logbutton' className='routes'><RiLoginBoxLine color='white' size='1.5rem'/>Login</NavLink>}

                    {auth  ? <NavLink onClick={menu} to='Overview' className='routes'><IoBusinessOutline color='white' size='1.5rem'/>Business</NavLink>
                    :<NavLink onClick={menu} to='/reg' className='routes' id='regbutton'><AiOutlineUserAdd color='white' size='1.5rem'/>Sign Up</NavLink>}

                    <NavLink onClick={menu} to='/' className='routes'><IoRibbonOutline color='white' size='1.5rem'/>Rewards</NavLink>

                    {auth  ? <button style={{color: '#865c3ace', justifyContent: 'unset'}} onClick={logout} className='routes'><CgLogOut color='white' size='1.5rem'/>Logout</button>
                    :<NavLink onClick={menu} to='/' className='routes' id='regbutton'><MdLeakAdd color='white' size='1.5rem'/>Contact</NavLink>}
                </div>
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
    position: sticky;
    min-width: 100vw;
    height: 3rem;

    a{text-decoration: unset !important;}
    
    z-index: 10;
    /* border-bottom: 1px solid #cfcfcf; */
    section{
        display: flex;
        position: fixed;
        justify-content: space-between;
        align-items: center;
        width: 90vw;
        div{
            display: flex;
            justify-content: space-between;
            width: 4rem;
            button{
                all: unset;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
    .topnav{
        display: flex;
        justify-content: space-around;
        align-items: center;
        top: 0;
        margin: 0rem;
        width: 100vw;
        height: 3rem;
        background-color: #ffffffa6;
        backdrop-filter: blur(15px);
        #Q{ all: unset; font-size: 1.1rem; padding: 0 5rem; font-family: 'Cinzel', serif }
        .Queup{position: relative; left: 3rem; font-size: 1.3rem; font-family: 'Cinzel', serif}
        button{
            all: unset;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 2rem;
        }
        a{
            all: unset;
            font-weight: bold;
            font-size: 1.05rem;
            cursor: pointer;
            &:first-child{padding-left: 10vw}
        }
        div{
            width: min-content;
            button{ font-weight: bold;}
            .routes{
                display: flex;
                justify-content: center;
                align-items: center;
                min-width: 5rem; 
                margin: 0 1rem;
                cursor: pointer;
                &:hover{color:#772705 }
            }
            min-height: 2rem;
            font-size: 1.1rem;
        }
        input{
            display: flex;
            justify-content: start;
            align-items: center;
            position: relative;
            right: -2.5vw;
            padding-left: 2.8rem;
            height: 1.8rem;
            width: 40rem;
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
        #Q, .mobile{display: none;}
        transition: all .2s ease-in;
        &.open{
            a{color: white;}
            .routes{color: white;}
            input{background-color: white;}
            #Q{color: white;}
            background-color: #000000f9;
        }
    }

    .log{
        position: fixed; 
        top: 3rem;
    }
    .register{
        position: fixed; 
        top: 3rem;
    }
    .results{
        position: fixed; 
        top: 3rem;
    }

    .mobilemenu{
        display: none;
        width: 80vw;
        margin: 0;
        z-index: 4;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI';
        .mobilenav{
            height: max-content;
            flex-direction: column;
            width: max-content;
            overflow: hidden;
            opacity: 100%;
            transition: opacity 1s ease-in-out, height .5s ease-in-out;
        }
        .searches{
            height: 0rem;
            flex-direction: column;
            width: max-content;
            overflow: hidden;
            transition: opacity 1s ease-in-out, height .5s ease-in-out;
            opacity: 0%;
        }
        &.opensearch{
            .mobilenav{ height: 0%; opacity: 0%;}
            .searches{ height: max-content; opacity: 100%;}
        }
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
        cursor: pointer;
        p{position: absolute; font-size: .8rem; top: 1.1rem;}
    }

    .burger{
        all:unset;
        height: .1rem;
        width: 1.5rem;
        border-radius: 1rem;
        background-color: black;
       //z-index is negative because the small burger visual svg was being pressed rather than the button itself 
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

    .search{
        display: flex;
        justify-content: start;
        align-items: center;
        position: relative;
        height: 1.8rem;
        width: 90vw;
        height: 2.5rem;
        padding: 1rem 0;
        div{
            all: unset;
            position: absolute;
            margin-top: 0.2rem;
            left: .8rem;
        }
        input{ 
        all: unset; 
        width: 100%;
        margin: 1rem 0;
        padding-left: 2.8rem;

        height: 2.5rem;
        border: 2px solid #2e2e2e37; 
        background-color: #80808045;
        border-radius: .5rem;
        font-size: 1rem;
        font-weight: bold;
        font-family: sans-serif;
        color: grey;

        &::placeholder{color: #ffffffda;}}
        &:hover { border: 2px solid #00000050; transition: all 0.2s ease-in-out; }
        &:focus { border: 2px solid #2e2e2e50;}
    }
    
    // menu for mobilemenu nav
    @media (max-width: 1800px) {
        .sidenav{
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
            position: fixed;
            top: 3rem;
            left: 0rem;
            color: transparent;
            font-size: 1.2rem;
            width: 100vw;
            height: 0vh;
            background-color: #000000f9;
            overflow: hidden;
            .routes{
                display: flex;
                align-items: center;
                width: 100vw;
                padding: 1rem 0;
                border-bottom: 1px solid grey;
                svg{padding: 0 2rem;}
                &:nth-child(1){ border-top: 2px solid #ffffff49;}
            }
            a{color: white; &:active{background-color: #ffffff29}}
            transition: all .5s ease-in-out;
        &.open{ height: 100vh; }}
    }

    //small screens showing
    @media (max-width: 1400px) {
        .mobilemenu{display: flex; bottom: 2rem;}
        #icon {display: flex}
        #nav-link{h1{display: none;}}
        .topnav{
            margin-left: 0rem; 
            justify-content: space-between;
            #links{display: none;} 
            input{ 
                margin-left: 1rem;
                /* filter: opacity(0); */
            }
            #Q{margin-right: 0; padding: 0 1rem;} 
            div{padding: 0 1rem;}
            a{display: none;}
            input{display: none;}
            .large{display: none;}
            #Q, .mobile{display: flex;}
        }
        form{display: none;}
        #Queup{display: none;}
        section div{display: flex;}
    }


`

export default Topnav