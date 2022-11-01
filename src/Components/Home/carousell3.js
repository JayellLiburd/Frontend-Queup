import React, {useContext, useEffect} from 'react'
import styled from 'styled-components'
import { usersContext } from '../../Connections/user'
import { shuffle } from '../../Functions/Arrayhelpers'

function Carousell3 (props) {

  let RowCount = 5
  if (window.innerWidth > 1400) { RowCount = 7}

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
        console.log(RowCount)
        return( 
          <>
          <h2>{catagory.Header}</h2>
          <div>
          {shuffle(catagory.results).filter((_, index) => index < RowCount).map(item => {
            return (
              <div className="carousellcard" onClick={e => Displaymedia(item)} key={item.name}>
                <div>
                  <img src={item.Image} alt="" />
                  <h3 className='h3'>{item.name}</h3>
                  <p>{'20 in Queue'}</p>
                </div>
                <h4>{item.date}</h4>
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
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  h2{
    justify-content: space-between;
    margin: 0.5rem 1rem;
    padding: 0;
    color: #686767;
    font-size: 1rem;
    font-family: 'Cinzel',serif;
    font-weight: 600;
  }
  .carousellcard{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: .8rem;
    padding: 0 1.5rem;
    min-width: 95%;
    max-width: 15rem;
    min-height: 5rem;
    color: white;
    border-radius: .8rem;
    background-color: #5c5c5c;
    cursor: pointer;
    &:nth-child(2n){background-color: saddlebrown;}
    img{
      width: 4.5rem;
      height: 4rem;
      object-fit: cover;
    }
    div{
      display: flex;
      justify-content: center;
      align-items: center;
      .h3{ margin: unset; color: white; margin: 0 2rem;  min-width: 15rem;}
      p{ margin: 0; font-size: .8rem;}
    }
  }
  @media (max-width: 1400px) {
    width: 95vw;
    .carousellcard{
      padding: 0 0.5rem;
      min-width: 93%;
      max-width: 93%;
      div{
        .h3{ margin: unset; color: white; margin: 0 .5rem; min-width: unset; font-size: .9rem;}
      }
      h4{font-size: .9rem; margin-right: .5rem;}
    }
  }
`

export default Carousell3 