import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import styled from 'styled-components'
import { Links } from '../../Helpers/Context';


function Lineoverview() {

  const {buttonactive, setLink} = useContext(Links)
  
  const [lines, setLines] = useState(false)
  const [isloading, setIsloading] = useState(false)
  
  useEffect(() => {
    setIsloading(true)
    axios.get(process.env.REACT_APP_Server + '/MyQueues', {withCredentials: true}).then(response => {
      if ( response.data[0] ) { setLines(response.data) }
      setIsloading(false)
      setLink(response.data[0].line_id)
    })
  },[setLink])

  const SwitchTabs = (id) => { setLink(id); buttonactive(); }

  return (
    <Wrapper>
      <input type="text" placeholder='Search for specific line...' />
      <div id='main'>
      {!isloading && lines ? <>
        {lines.map((item) => {
          return(
          <div className='businesses' key={item.line_id}>
            <h3 onClick={e => SwitchTabs(item.line_id)}>{item.bus_name}:</h3>
            <p id='description' style={{fontWeight: '600'}}>{item.address_1}</p>
            {/* <p>Currently in line: {item.currentline}</p> */}
            <p>Rate Served per hour: {item.rate}</p>
            {/* <p>Max: {item.max}</p> */}
            <p>Running Promo's: {item.promo}</p>
            <p>Current Manager: {item.host}</p>
          </div>
        )})}
      </> : <></>}
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
    width: max-content;
    overflow: hidden;
    overflow-x: auto;
    h3{margin: unset; font-size: 1.3rem; min-width: 12rem; text-decoration: underline; cursor: pointer;}
    p{ margin: unset; padding: .5rem; width: max-content;}}
  
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


