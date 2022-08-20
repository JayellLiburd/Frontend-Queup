import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'

function Lineoverview() {

    const user = [
        {id: 1, 'Name': 'McDonalds', address: '132 Westhimer st 77023 Houston Tx', currentline: 32, max: 100, rate: 67, promo: 'Yes'},
        {id: 2, 'Name': 'Shoe Palace', address: '11323 sheperd st 77023 Houston Tx', currentline: 62, max: 100, rate: 12, promo: 'No'}
      ]


  return (
    <Wrapper>
      <input type="text" placeholder='Search for specific line...' />
      <div id='main'>
        {/* {user.map((item) => {
          return(
          <div className='businesses' key={item.id}>
            <NavLink to={'/line/' + {}} style={{color: 'black'}}><h3>{item.Name}:</h3></NavLink>
            <p id='description' style={{fontWeight: '600'}}>{item.address}</p>
            <p>Currently in line: {item.currentline}</p>
            <p>Rate Served per hour: {item.rate}</p>
            <p>Maxed: {item.max}</p>
            <p>Running Promo's: {item.promo}</p>
          </div>
        )})} */}
      </div>
    </Wrapper>

  )
}


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 10rem;

  width: 50vw;

  #main{margin-top: 2rem;}
  .businesses{
    display: flex; 
    align-items: baseline;
    margin: 1rem 0;

    h3{margin: unset; font-size: 1.3rem;}
    p{ margin: unset; padding: .5rem;}}
  
  input{ 
      all: unset; 
      height: 1.8rem;
      padding-left: 1rem;

      border: 2px solid #2e2e2e75; 
      border-radius: 1rem;

      font-family: sans-serif;
      color: grey;

      &:hover { border: 2px solid #00000050; transition: all 0.2s ease-in-out; }
      &:focus { border: 2px solid #181818a6; color: black; &::placeholder{color: #646464;}};}

  //showing on small screen//
  @media (max-width: 1800px) {
    align-items: center;
    width: unset;
    .businesses{flex-direction: column; width: 80vw; border-top: 1px dashed; h3{margin-top: 1rem;}}
    input{width: 80vw;}
  }
`


export default Lineoverview


