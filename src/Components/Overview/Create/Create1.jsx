import React, { useContext } from 'react'
import styled from 'styled-components'
import countryList from '../../../Helpers/Countries'

import { createbusContext } from './Create'



function Create() {

  const {setAdd, setAdd2, setCity, setCountry, setName, setZip, setStates} = useContext(createbusContext)

  return (
    <Wrapper>
        <h3>Create Business Queue</h3>
        <form>
            <label>Business Name<input type="text" placeholder="ex: John's Cafe" onChange={(e) => setName(e.target.value)}/></label>
            <label>Address 1<input type="text" placeholder="ex: Lakewater Path Lane" onChange={(e) => setAdd(e.target.value)}/></label>
            <label>Address 2<input type="text" placeholder="ex: #Unit, Postal Office, etc" onChange={(e) => setAdd2(e.target.value)}/></label>
            <label>City<input type="text" placeholder="ex: Dallas" onChange={(e) => setCity(e.target.value)}/></label>
            <div className='input2' >
                <label>Zip Code<input type="text" placeholder="ex: 77056" onChange={(e) => setZip(e.target.value)}/></label>
                <label>State<input type="text" placeholder="ex: TX" onChange={(e) => setStates(e.target.value)}/></label>
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
    input{border-radius: 1rem; border: 1px solid; height: 1.5rem; margin-top: .2rem; padding: 0 1rem ;
        &:focus{border: 1px solid #865c3ace;}}
    label{
        display: flex; 
        flex-direction: column; 
        font-family: sans-serif; 
        font-weight: bold;
        margin-top: 1rem;

        text-indent: .5rem;
        &:first-child{ margin-top: 2rem; }}
    select{height: 2rem; border-radius: 1rem; margin-top: .2rem; padding: 0 1rem; font-weight: 600;}
    .input2{margin-top: -1rem; display: flex; flex-direction: row; align-items: baseline;
        label{width: 50%; &:first-child{ margin-right: 2rem;}}}
  }

  @media screen and (max-width: 1400px) {
    form{ width: 80vw;}
  }


`

export default Create