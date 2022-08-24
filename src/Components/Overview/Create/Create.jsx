import React, { useState, createContext } from 'react'
import styled from 'styled-components'
import Createque from '../../../Connections/Createque'

import Create1 from './Create1'
import Create2 from './Create2'
import Modeling from './Modeling'
import Temp from './temp.png'


export const createbusContext = createContext()

function Create() {

  //Form create business queue States from Create1 and Create2
  const [name, setName] = useState('')
  const [add, setAdd] = useState('')
  const [add2, setAdd2] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [states, setStates] = useState('')
  const [country, setCountry] = useState('')
  const [small, setSmall] = useState('')
  const [rate, setRate] = useState('')
  const [Category, setCategory] = useState('')
  const [raffles, setRaffles] = useState('')
  const [promos, setPromos] = useState('')
  const [host, setHost] = useState('')

  const [preview, setPreview] = useState([true])
  const [preview2, setPreview2] = useState([true])

  const [next, setNext] = useState(false)

  const createbutton = () => {Createque(name, add, add2, city, zip, states, country, small, rate, Category, raffles, promos, host, preview, preview2)}


  return (
    <createbusContext.Provider value={{preview, setPreview, preview2, setPreview2, setName, setAdd, setAdd2, setCity, setZip, setStates, setCountry, setSmall, setRate, setCategory, setRaffles, setPromos, setHost, add, add2, city, country, name, zip, states, setNext}}>
    <Wrapper>
      <Modeling/>
      <section>
        {!next ? 
          <div id='c-1'><Create1/></div>
        : 
          <><div id='c-2'><Create2/></div><button onClick={createbutton}>Create Queue</button></>
        }
      </section>
    </Wrapper>
    </createbusContext.Provider>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: top;
  position: relative;
  margin-left: -10rem;

  button{
    width: 80vw; 
    margin-top: 1.5rem;
    margin-bottom: 10rem;
    padding: 1rem; 

    font-weight: bold; 
    color: black;
    
    border-radius: 1rem; 
    border: none; 
    background-color: #865c3ace; }


  @media screen and (min-width: 1400px) {
      button{width: 40vw;}
  }
  @media (max-width: 1400px) {
    flex-direction: column;
    justify-content: center;
    margin-top: 2rem;
    margin-left: 0rem;
  }

`

export default Create;