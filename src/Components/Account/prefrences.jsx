import React from 'react'
import styled from 'styled-components'

function Prefrences() {
  return (
    <Wrapper>
      <h3>Prefrences</h3>
      <label>
          <select>
              <option value="">Hobbying</option>
              <option value="">Just Testing</option>
              <option value="">Corporation</option>
              <option value="">Startup</option>  
          </select>
      </label>
      <div><input type="checkbox" name='Darkmode'/><label htmlFor="">Dark Mode</label></div>
      <div><input type="checkbox" name='Darkmode'/><label htmlFor="">Weather on/off</label></div>
      <div><input type="checkbox" name='Darkmode'/><label htmlFor="">Favorites on/off</label></div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div{margin: 1rem 0; font-weight: bold; font-family: 'Cinzel', serif;  }
  select{height: 2rem; border-radius: 1rem; margin-top: .2rem; padding: 0 1rem; font-weight: 600;}
`

export default Prefrences