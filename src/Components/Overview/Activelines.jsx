import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom';

function Activelines() {

  return (
    <Wrapper>
      <div id='Partion'>
      <div id='name'>
        <h3>Taqueria Durango</h3>
        <NavLink to='/Currline' id='view'><button>View</button></NavLink>
      </div>
        <section>
            <p>Currently in line: </p>
            <p>Maxed: </p>
            <p>Movement:  Every 30min</p>
            <p>Total Today: </p>
            <p>Views: </p>
            <p>Promotion type: </p>
        </section>
    </div>
  </Wrapper>
  )
}

const Wrapper = styled.div`

  width: 80vw;

  #view{display: flex; margin: 0 1rem; button{ padding: 0.3rem 1rem; border-radius: 1rem; background-color: #ececec; border: unset; cursor: pointer;}}
  #name{
    display: flex;
    align-items: center;
  }

`

export default Activelines