import React from 'react'
import styled from 'styled-components'

function Test() {

    const Bigbootybitch = (e) => document.querySelector('#carissadiv').innerHTML = e.target.value

  return (
    <Wrapper>
        <div id='carissadiv'></div>
        <input type="text" onChange={Bigbootybitch}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    input{
        border: 1px solid blue;
        border-radius: 1rem;
    }
`

export default Test