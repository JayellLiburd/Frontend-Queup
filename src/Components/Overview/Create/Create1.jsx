import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import countryList from '../../../Helpers/Countries'
import { abbrState, State, States } from '../../../Helpers/States'
import { validSchema } from '../../../Helpers/Validation'

import { createbusContext } from './Create'


function Create() {

  const {setAdd, setAdd2, setCity, setCountry, setName, setZip, setStates, setNext} = useContext(createbusContext)
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [c, setC] = useState(0)
  const [d, setD] = useState(0)
  const [e, setE] = useState(0)
  const [f, setF] = useState(0)
  const [g, setG] = useState(0)

  let List = []

  function handelSubmit(e){
    e.preventDefault()
    var i, s
    const len = e.target
    for (i=0; i<7; ++i) {s = {data: {len: len[i].value.length, val: len[i].value}}; List.push(s)}
    setA(List[0].data.len)
    setB(List[1].data.len)
    setC(List[2].data.len)
    setD(List[3].data.len)
    setE(List[4].data.len)
    setF(List[5].data.len)
    setG(List[6].data.len)
  }

  const submit = (e) => {
    List = []
    handelSubmit(e)
    console.log(List)
  }
  const submitbutton = () => {setNext(true)}

  return (
    <Wrapper>
        <h3>Create Business Queue</h3>
        <form onSubmit={(e) => submit(e)}>
            <label>Business Name
              <input 
                type="text" 
                placeholder="ex: John's Cafe" />
              {a < 3 ? <p>Please input more than 3 Characters</p> : <></>}
            </label>
            <label>Address 
              <input 
                type="text" 
                placeholder="ex: Lakewater Path Lane"
                onChange={(e) => setAdd(e.target.value)}/>
                {a < 3 ? <p>Please enter a Valid Street Address</p> : <></>}
            </label>
            <label>Address 2
              <input 
                type="text" 
                placeholder="ex: #Unit, Postal Office, etc" 
                onChange={(e) => setAdd2(e.target.value)}/>
            </label>
            <label>City
              <input 
                type="text" 
                placeholder="ex: Dallas" 
                onChange={(e) => setCity(e.target.value)}/>
            </label>
            <div className='input2' >
                <label>Zip Code
                  <input 
                    type="text" 
                    placeholder="ex: 77056" 
                    onChange={(e) => setZip(e.target.value)}/>
                  </label>
              <label>State
                <select onClick={(e) => setStates(e.target.value)}>
                {States.map((item) => {
                      return(
                        <option key={item.abbreviation} value={item.abbreviation}>{item.name}</option>
                      )
                  })}
                </select>
              </label>
            </div>
            <label>Counrty
              <select onClick={(e) => setCountry(e.target.value)}>
              {countryList.map((item) => {
                return(
                  <option key={item} value={item}>{item}</option>
                )
              })}
              </select>
            </label>
            <button onClick={submitbutton}>Next</button>
        </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form{
  display: flex;
  flex-direction: column;

  width: 40vw;

  border-top: 2px solid black;
    input{border-radius: .5rem; border: unset; height: 2rem; margin-top: .3rem; padding: 0 1rem; background-color: #eeeeee9b;}
    label{
        display: flex; 
        flex-direction: column; 
        font-family: sans-serif; 
        font-weight: bold;
        margin-top: 1rem;

        text-indent: .5rem;
        &:first-child{ margin-top: 2rem; }}
    select{height: 2rem; border-radius: .5rem; margin-top: .2rem; padding: 0 1rem; font-weight: 600;}
    .input2{margin-top: -1rem; display: flex; flex-direction: row; align-items: baseline;
        label{width: 49%; &:first-child{ margin-right: 2rem;}}}
  }
  p{ color: #758a8b; font-size: .8rem;}

  @media screen and (max-width: 1400px) {
    form{ width: 80vw;}
    .input2{label{&:first-child{ margin-right: .2rem !important;}}}
  }


`

export default Create