import React from 'react'
import styled from 'styled-components'

function Loading() {
  return (
    <Wrapper>
        <span className="loader">loading...</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    pointer-events: none;
    .loader {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 11.5rem;
        max-width: 6rem;
        margin-top: 3rem;
        margin-bottom: 3rem;
        aspect-ratio: 2/1.35;
        width: 12rem;
        font-size: .8rem;
    }
    .loader:before,
    .loader:after {
      content: "";
      position: absolute;
      border-radius: 50%;
      animation: pulsOut 1.8s ease-in-out infinite;
      filter: drop-shadow(0 0 1rem rgba(255, 255, 255, 0.75));
    }
    .loader:before {
      width: 100%;
      padding-bottom: 100%;
      box-shadow: inset 0 0 0 1rem #fff;
      animation-name: pulsIn;
    }
    .loader:after {
      width: calc(100% - 2rem);
      padding-bottom: calc(100% - 2rem);
      box-shadow: 0 0 0 0 #fff;
    }
  
    @keyframes pulsIn {
      0% {
        box-shadow: inset 0 0 0 1rem #fcf6ef;
        opacity: 1;
      }
      50%, 100% {
        box-shadow: inset 0 0 0 0 #fcf6ef77;
        opacity: 0;
      }
    }
  
    @keyframes pulsOut {
      0%, 50% {
        box-shadow: 0 0 0 0 #fcf6ef;
        opacity: 0;
      }
      100% {
        box-shadow: 0 0 0 1rem #fcf6ef77;
        opacity: 1;
      }
    }
`

export default Loading