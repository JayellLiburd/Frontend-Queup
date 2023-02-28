import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import { Testwords } from '../Helpers/words';

type Props = {
    value: string
}
function Results(props: Props) {

    const [results, setResults] = useState([] as Array<string>)
    useEffect(() => {
        const handler = setTimeout(() => props.value != '' || null || undefined ? filterItems(Testwords, props.value) : '', 500)
        if (props.value == '' || null || undefined) {setResults(['CheeseCake Factory', 'Trusted Kicks', 'Micro Center', 'Nike', 'Turkey Leg Hut'])}
        return () => {clearTimeout(handler)}
    },[props.value])

    function menu() {
        const menubg = document.querySelector('.burger')
        const openmenu = document.querySelector('.sidenav')
        const topnavcolor = document.querySelector('.topnav')
        const login = document.querySelector('.login_modal')
        const resultslist = document.querySelector('.resultslist')
        if (!menubg || !openmenu || !topnavcolor || !login || !resultslist) return;
        menubg.classList.remove('open')
        openmenu.classList.remove('open')
        topnavcolor.classList.remove('open')
        login.classList.remove('open')
        resultslist.classList.remove('open')
    }

    function filterItems(arr: Array<string>, query: string) {
        const filtered =  arr.filter((el) => el.toLowerCase().match(query.toLowerCase())).slice(0, 5);
        if (filtered.length < 0) { setResults([])} else {setResults(filtered)}
    }

    const close = () => {
        const searchbar = document.getElementById('searchbar') as HTMLInputElement;
        if (!searchbar) return;
        searchbar.value = ''
        setResults(['CheeseCake Factory', 'Trusted Kicks', 'Micro Center', 'Nike', 'Turkey Leg Hut'])
        menu(); 
    }

    return (
      <Wrapper>
        <div className="results">
            <form className='results' name='Login' onSubmit={e => e.preventDefault()}>
                <h2 className='close' onClick={e => close()}>X</h2>
                {props.value == '' || null || undefined ? <h3 style={{color: 'white', width: '100%',}}>Quick Links</h3> : <></>}
                {results.map(searches => {
                    return (
                        <NavLink onClick={menu} to={'/store/' + searches} className='routes' key={searches}>{searches}</NavLink>
                    )
                })}
                {results.length <= 0 || null || undefined ? <h3 style={{color: 'white'}}>no results were found</h3> : <></>}
            </form>
        </div>
      </Wrapper>
    )
  }
  
  const Wrapper = styled.div.attrs({className: 'resultslist'})`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 0vh;
    background-color: #000000ae;
    z-index: 1;
    .results{
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        color: white;
        width: 50vw;
        height: 0rem;
        overflow: hidden;
        background-color: #050505f8;
        border-radius: 0 0 1rem 1rem;
        z-index: 2;
        transition: all 0.15s ease-in-out;
        .routes{
            all: unset;
            display: flex; 
            align-items: center;
            position: relative;
            width: 100%;
            height: 2.5rem;
            text-indent: 1.5rem;
            font-size: 1rem;
            cursor: pointer;
            &:hover{background-color: #865c3a24; transition-delay: .1s}
            &:nth-child(2){margin-top: 3rem;}
        }
        .close{
            position: absolute;
            right: 2rem; 
            top: 0rem;
            cursor: pointer;
        }
    }
    &.open{
        height: 100vh;
        .results{
            padding: 3rem;
            padding-top: 2rem;
            padding-bottom: 5rem;
            width: 50vw;
            height: 15rem;
            input{display: block;}
        }
    }
    @media (max-width: 1400px) {
        display: none;
    }
  `



export default Results