import React, { useContext } from 'react'
import styled from 'styled-components'

import { settingsContext } from '../../Connections/settings'




function SettingsNav() {

    const {active, setActive, setMenu} = useContext(settingsContext);

    const clicked1 = (e) => {setActive([{prof: true, con: false, not: false, pref: false, acc: false}]); setMenu(false)}
    const clicked2 = (e) => {setActive([{prof: false, con: true, not: false, pref: false, acc: false}]); setMenu(false)}
    const clicked3 = (e) => {setActive([{prof: false, con: false, not: true, pref: false, acc: false}]); setMenu(false)}
    const clicked4 = (e) => {setActive([{prof: false, con: false, not: false, pref: true, acc: false}]); setMenu(false)}
    const clicked5 = (e) => {setActive([{prof: false, con: false, not: false, pref: false, acc: true}]); setMenu(false)}

    return (
        <Wrapper>
            <ul>
                <h2>Settings</h2>
                <button onClick={clicked1} style={active[0].prof  ? {'backgroundColor' : '#b6b6b6b1', color: '#000'} : {  }}>Profile</button>
                <button onClick={clicked2} style={active[0].con  ? {'backgroundColor' : '#b6b6b6b1', color: '#000'} : {  }}>Connections</button>
                <button onClick={clicked3} style={active[0].not  ? {'backgroundColor' : '#b6b6b6b1', color: '#000'} : {  }}>Notifications</button>
                <button onClick={clicked4} style={active[0].pref  ? {'backgroundColor' : '#b6b6b6b1', color: '#000'} : {  }}>Preferences</button>
                <button onClick={clicked5} style={active[0].acc  ? {'backgroundColor' : '#b6b6b6b1', color: '#000'} : {  }}>Account</button>
            </ul>
        </Wrapper>
      )
    }
    
    const Wrapper = styled.div`
    

    position: relative;
    top: 0rem;

    width: 15rem;
    height: 50rem;

    ul{
        padding: .01% 3rem;;
        button{
            padding: 1rem 0;
            margin: .5rem 0 ;

            color: #3f3f3f;
            width: 10rem;
            font-weight: bold;
            font-size: 1rem;

            background-color: white;
            border-radius: .5rem;;
            border: unset;

            &:hover{background-color: #afafaf; transition-delay: .08s}
            }}






    @media (max-width: 1400px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        top: 3rem;
    }
    ul{display: flex;
        flex-direction: column;
        align-items: center;}


    

    `
    
export default SettingsNav