// import axios from 'axios'
import React from 'react'
// import { useEffect } from 'react'
import styled from 'styled-components'
import {FcGoogle} from 'react-icons/fc'
import {AiFillApple, AiOutlineTwitter} from 'react-icons/ai'
import {FaFacebookF} from 'react-icons/fa'

function Connections() {

    const Socials = [
        {name: 'Gmail', img: FcGoogle, status: 'Not Connected'},
        {name: 'Facebook', img: FaFacebookF, status: 'Not Connected'},
        {name: 'Twitter', img: AiOutlineTwitter, status: 'Connected'},
        {name: 'Apple', img: AiFillApple, status: 'Not Connected'}
    ]

    return (
        <Wrapper>
            <h1>Connect Via ... </h1>
            <section id='socials'>
                {Socials.map((item) => {
                    let color = 'unset'
                    if (item.status === 'Connected') {color = '#50e25c'}
                    return (
                        <div key={item.name} style={{backgroundColor: color}}>
                            <div>
                                <item.img/>
                                <h4>{item.name}</h4>
                            </div>
                            <p>{item.status}</p>
                        </div>
                    )
                })}
            </section>
        </Wrapper>
    )
}
    
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 2rem 0;
    h1{margin: 0; margin-top: -10rem; margin-bottom: 8rem; color: #5e5d5d;}
    #socials{
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        div{
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            align-items: center;
            padding: 0 1rem;
            margin: .5rem;
            width: 10rem;
            height: 10rem;
            background-color: white;
            border-radius: .5rem;
            box-shadow: 0px 0px 5px 1px #00000010;
            cursor: pointer;
            div{  flex-direction: row; top: -.5rem; border-radius: .5rem .5rem 0 0;}
            h4{ margin-left: .5rem;}
            p{margin-top: 0rem}
        }
    }
    @media (max-width: 1400px) {
        position: relative;
        top: 2rem;
        flex-direction: column;

    }
`
   



export default Connections