import React, { useState, createContext } from 'react'
import styled from 'styled-components'
import Createque from '../../../Connections/Createque'

import Create1 from './Create1'
import Create2 from './Create2'


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
  const [catagory, setCatagory] = useState('')
  const [raffles, setRaffles] = useState('')
  const [promos, setPromos] = useState('')
  const [host, setHost] = useState('')

  const [next, setNext] = useState(false)
  const Nextbutton = () => setNext(true)

  const createbutton = () => {Createque(name, add, add2, city, zip, states, country, small, rate, catagory, raffles, promos, host)}



  return (
    <createbusContext.Provider value={{setName, setAdd, setAdd2, setCity, setZip, setStates, setCountry, setSmall, setRate, setCatagory, setRaffles, setPromos, setHost}}>
    <Wrapper>
        {!next ? 
          <><Create1/><button onClick={Nextbutton}>Next</button></>  
        : 
          <><Create2/><button onClick={createbutton}>Create Queue</button></>
        }
    </Wrapper>
    </createbusContext.Provider>
  )
}

const Wrapper = styled.div`

  button{width: 80vw; margin-top: 1.5rem; padding: 1rem; border-radius: 1rem; border: none; background-color: #865c3ace; font-weight: bold; color: black;}


  @media screen and (min-width: 1400px) {
      button{width: 40vw;}
  }

`

export default Create;