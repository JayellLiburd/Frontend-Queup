// import axios from 'axios'
import React from 'react'
// import { useEffect } from 'react'
import styled from 'styled-components'




function Connections() {


    const Socials = [
        {name: 'Google', img: ''},
        {name: 'Facebook', img: ''},
        {name: 'Twitter', img: ''},
        {name: 'Apple', img: ''},
    ]

    return (
        <Wrapper>
            {Socials.map((item) => {
                return (
                    <div>
                        <img src={item.img} alt="" />
                        <h2>{item.name}</h2>
                    </div>
            )})}
        </Wrapper>
      )
    }
    
    const Wrapper = styled.div`
        display: flex;
        align-items: center;
        position: relative;
        top: -5rem;
        margin: 2rem 0;

        div{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20rem;
        }

        @media (max-width: 1400px) {
            position: relative;
            top: 2rem;
            flex-direction: column;

        }




    `
   



export default Connections