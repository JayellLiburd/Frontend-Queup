import React from 'react'
import styled from 'styled-components'

import { MdTouchApp } from 'react-icons/md'

function modeling() {
  return (
    <Wrapper>
        <div className='views'>Mobile
            <div id='mobile'>
                <img src="" alt="" />
                <h3><MdTouchApp size='1.5rem'/></h3>
            </div>
        </div>
        <div className='views'>Website
            <div id='website'>
                <img src="" alt="" />
            </div>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;; 
        position: relative; 
        top: -10rem;
        margin-right: 10rem;

        height: 20rem;

    h3{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        top: 9rem;
        left: 40%;

        width: 2rem;
        height: 2rem;
        
        border: 2px solid #c9c9c9;
        box-shadow: 0 0 10px #636363;
        border-radius: 50%;
    }

    .views{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start; 

        font-weight: bold;
        font-family: serif;
        font-size: 1.2rem; 
        text-decoration: underline solid 2px;

        min-width: 22rem;
        height: 20rem;

        #mobile{
            margin: 1rem 0;
            margin-bottom: 1rem;

            width: 9rem;
            height: 15rem;


            background: linear-gradient(0deg, rgba(182,182,182,1) 0%, rgba(237,237,237,1) 4%, rgba(237,237,237,1) 96%, rgba(182,182,182,1) 100%);
            box-shadow: 0 0 10px #636363;
            border-radius: 1rem;
        }
        #website{
            margin-top: -2rem; 

            width: 11rem;
            height: 25rem;
            transform: rotate(90deg);


            background: linear-gradient(0deg, rgba(182,182,182,1) 0%, rgba(237,237,237,1) 4%, rgba(237,237,237,1) 96%, rgba(182,182,182,1) 100%);
            box-shadow: 0 0 10px #636363;
            border-radius: 1rem;
        }
    }

    @media (max-width: 1400px) {
        display: flex;
        flex-direction: row;
        align-items: top;
        top: 0rem;
        margin-top: 4rem;
        margin-right: 0rem;
        margin-left: -2rem;

        height: 10rem;

        .views{min-width: 10rem; font-size: 1rem;
            h3{top: 4.5rem; left: 33%}
            #mobile{width: 6.5rem; height: 10rem;} #website{width: 6.5rem; height: 10rem; margin-top: 1rem; }
        
        }
    }
`

export default modeling