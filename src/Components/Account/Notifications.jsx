import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

function Notifications() {

  const getSubsriptions = [
    {type: 'Email', desc: 'Subsribe to getting newsletters, updates and offers from QueupNext', status: 'some'},
    {type: 'Text', desc: 'Allow QueupNext to text you important time sensitive notifications', status: true},
    {type: 'Website', desc: "Allow QueupNext to send you notifications through your current browser", status: true},
  ]
  
  const [subsriptions, setSubsriptions] = useState(getSubsriptions)

  let i = 0
  return (
    <Wrapper>
      <h1>Notification Prefrences</h1>
      <div>
        {subsriptions.map(_ => {
          let color = 'unset'
          if (_.status === true) {color = '#50e25c'} else {
            if (_.status === 'some') { color = 'yellow'}
          }
          let index = i++
          let object = getSubsriptions.slice(index)
          return (
            <div style={{backgroundColor: color}} key={index} onClick={e => _.status === true ? (setSubsriptions(args => [...args, object[0]]), console.log(index)) : setSubsriptions(...args => [args[index].status = true])}>
              <div>
                <h4>{_.type}</h4>
                <p>{_.desc}</p>
              </div>
            <p>{_.status === true ? 'Subscribed' : _.status === 'some' ? 'Subscribed to a few' : 'Not Subscribed'}</p>
          </div>
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  h1{display: flex; justify-content: center; width: 100%; margin: 3rem 0; margin-top: -8rem; color: #5e5d5d}
  div{
    display: flex;
    margin-top: -1rem;
    div{
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      align-items: center;
      padding: 0 1rem;
      margin: .5rem;
      width: 10rem;
      height: 12rem;
      background-color: white;
      border-radius: .5rem;
      box-shadow: 0px 0px 5px 1px #00000010;
      cursor: pointer;
      div{  flex-direction: column; top: -.5rem; text-align: center; border-radius: .5rem .5rem 0 0; cursor: default;}
      h4{ margin-left: .5rem;}
      p{margin-top: -.5rem; font-size: .8rem;}
    }
  }
`

export default Notifications