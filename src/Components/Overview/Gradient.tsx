import React, { useContext } from 'react'
import styled from 'styled-components'
import { Links } from '../../Helpers/Context'

function GradientPicker() {

  const { color, setColor } = useContext(Links)
    
  const gradients = [
    {background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)'},
    {background: 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)'},
    {background: 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)'},
    {background: 'linear-gradient(-45deg, #d299c2 0%, #fef9d7 100%)'},
    {background: 'linear-gradient(45deg, #a8edea 30%, #fed6e3 100%)'},
    {background: 'linear-gradient(-355deg, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #c2ce9c 64%, #7edbdc 100%)'},
    {background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)'},
    {background: 'linear-gradient(to right, #659999, #f4791f)'},
    {background: 'linear-gradient(to right, #f0c27b, #4b1248)'},
    {background: 'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)'},
    {background: 'linear-gradient(70deg, #d05aa2 0%, #e7627d 10%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%)'},
    {background: 'linear-gradient(to right, #403a3e, #be5869)'},
    {background: 'linear-gradient(290deg, #1e130c, #9a8478)'},
    {background: 'linear-gradient(to left, #ffffff26 0%, #00000026 100%), radial-gradient(at top center, #ffffff66 0%, #00000066 120%) #989898', backgroundBlendMode: 'multiply,multiply'},
    {background: 'linear-gradient(-45deg, #3e5151, #decba4)'},
    {background: 'linear-gradient(-20deg, #616161 0%, #9bc5c3 100%)'},
    {background: 'linear-gradient(to right, #d7d2cc 0%, #304352 100%)'},
    {background: 'linear-gradient(260deg, #2c3e50, #4ca1af)'},
  ]
  const classGrad = document.querySelector('.gradientPicker') as HTMLElement
  return (
    <Wrapper>
        <div className="gradcontainer" style={color}>
            <h1>Choose a Gradient</h1>
            {gradients.map((gradient, index) => {
                return (
                    <div className="gradcard" key={index} onClick={() => {setColor(gradient)}}>
                        <h4>{index + 1}</h4>
                        <div className="thegradient" style={gradient} key={index}></div>
                    </div>
                )
            })}
            <button className='exitgrad' onClick={e => classGrad.classList.remove('open')}>Select</button>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 0.5rem;
    h1{width: 100%; text-align: center;}
    .gradcontainer{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 5rem;
        width: 40rem;
        border-radius: .5rem;
        z-index: 1;
        .gradcard{
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            margin: .2rem;
            width: 4rem;
            height: 6rem;
            background-color: #fff;
            border-radius: .5rem;
            cursor: pointer;
            div{
              position: relative;
              top: -1rem;
              aspect-ratio: 1/1;
              width: 2rem;
              border-radius: 50%;
            }
        }
        .exitgrad{
            all: unset;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 1rem 0;
            width: 100%;
            height: 2rem;
            border-radius: .5rem;
            background-color: white;
            z-index: 1;
        }
    }
`

export default GradientPicker