import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { usersContext } from '../../Connections/user'
import { shuffle } from '../../Functions/Arrayhelpers'

function Carousell (props) {

  useEffect(() => {
    const outofbounds = document.querySelector('.card')
  })

  const {setMedia} =  useContext(usersContext)
  function Displaymedia(item) {
    setMedia(item)
    const outofbounds = document.querySelector('.card')
    outofbounds.classList.add('open')
  }

  return (
    <Wrapper>
      {props.array.map(catagory => {
        return( 
          <>
          <h2>{catagory.Header}</h2>
          <div>
          {shuffle(catagory.results).filter((_, index) => index < 5).map(item => {
            return (
              <div className="carousellcard" onClick={e => Displaymedia(item)}>
                <div>
                  <img src={item.Image} alt="" />
                  <h4>{'Open'}</h4>
                </div>
                <h3 className='h3'>{item.name}</h3>
                <p>{'20 in Queue'}</p>
              </div>
            )
          })}
          </div>
        </>
      )})}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 100%;
  margin-bottom: 1rem;
  h2{
    justify-content: space-between;
    margin: 0.5rem 1rem;
    padding: 0;
    color: #686767;
    font-size: 1rem;
    font-family: 'Cinzel',serif;
    font-weight: 600;
  }
  div{
    display: flex; 
    overflow: auto;   
    &::-webkit-scrollbar{ width: 8px; height: 8px}
    &::-webkit-scrollbar-track{background-color: rgba(167, 167, 167, 0); margin: 0;}
    &::-webkit-scrollbar-thumb{ background-color: rgba(157, 123, 96, 0.252); border-radius: 12px;}
    &:hover{::-webkit-scrollbar-thumb{ background-color: rgba(157, 123, 96, 0.752)}}
  }
  .carousellcard{
    display: block;
    margin: .8rem;
    padding: 0 1.5rem;
    min-width: 15rem;
    max-width: 15rem;
    height: 10rem;
    color: white;
    border-radius: .8rem;
    background-color: #5c5c5c;
    cursor: pointer;
    &:first-child{margin-left: .5rem;}
    &:nth-child(2n){background-color: saddlebrown;}
    div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      img{
        margin-top: .5rem;
        width: 4.5rem;
        height: 4rem;
        object-fit: cover;
      }
    }
    .h3{ margin: unset; color: white; margin-top: 1rem; margin-bottom: .2rem;}
    p{ margin: 0; font-size: .8rem;}
  }
  @media (max-width: 1400px) {
    width: 95vw;
    .carousellcard{
      min-width: 13rem;
      max-width: 13rem;
    }
  }
`

export default Carousell 