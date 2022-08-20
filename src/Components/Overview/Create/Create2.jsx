import React, { useContext } from 'react'
import styled from 'styled-components'

import { createbusContext } from './Create'

function Create() {
    
    const {setSmall, setRate, setCatagory, setRaffles, setPromos, setHost} = useContext(createbusContext)
    
  return (
    <Wrapper>
        <h3>Create Business Queue</h3>
        <form>
            <label>Small Business?
                <select onClick={(e) => setSmall(e.target.value)}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </label>
            <label>Typical rate of people in a Day?
                <select onClick={(e) => setRate(e.target.value)}>
                    <option value='0'>Testing</option>
                    <option value="10">{'<10/day'}</option>
                    <option value="50">{'<50/day'}</option>
                    <option value="100">{'<100/day'}</option>
                    <option value="200">{'<200/day'}</option>
                </select>
            </label>
            <label>Catagory                
                <select onClick={(e) => setCatagory(e.target.value)}>
                    <option value="H">Hobby Hosting</option>
                    <option value="Mgr">Major Event</option>
                    <option value="FF">Fast Dinning</option>
                    <option value="RR">Resturant</option>
                    <option value="MG">Merchant Goods</option>
                    <option value="Min">Minor Event</option>
                    <option value="DS">Dealership</option>
                </select>
            </label>
            <div className='input2' >
                <label>Raffles?
                    <select onClick={(e) => setRaffles(e.target.value)}>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </label>
                <label>Promos?
                    <select onClick={(e) => setPromos(e.target.value)}>
                        <option value='0'>Choose an Avalibale Option</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </label>
            </div>
            <label>Name of Host<input type="text" placeholder="ex: John Doe" onChange={(e) => setHost(e.target.value)}/></label>
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