import React from 'react'
import styled from 'styled-components'
import {usersContext} from 'Helpers/Context'
import { NavLink } from 'react-router-dom'

function Account({navSize}: {navSize: number}) {
  const {auth} = React.useContext(usersContext)

  return (
    <Wrapper property={`${navSize}`}>
      <div className="TopNav_Account_column" style={{display: auth ? 'none' : ''}}>
        <h3>Login</h3>
        <h3>Sign Up</h3>
      </div>
      <div className="TopNav_Account_column" style={{display: auth ? '' : 'none'}}>
        <h1>Profile</h1>
        <NavLink className='Topnav_Account_item' to='/'>Account</NavLink>
        <NavLink className='Topnav_Account_item' to='/'>Notifications</NavLink>
        <NavLink className='Topnav_Account_item' to='/'>Settings</NavLink>
      </div>
      <div className="TopNav_Account_column" style={{display: auth ? '' : 'none'}}>
        <h1>Vendors</h1>
        <NavLink className='Topnav_Account_item' to='/Overview'>Dashboard</NavLink>
        <NavLink className='Topnav_Account_item' to='/'>My Queues</NavLink>
        <NavLink className='Topnav_Account_item' to='/Test'>Stats</NavLink>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs({id: 'TopNav_Account'})`
  display: flex;
  margin: 0 auto;
  width: ${props => props.property}px;
  .TopNav_Account_column{
    display: flex;
    flex-direction: column;
    margin: 0 1.5rem;
    &:first-child{
      margin: 0 1.5rem;
      background-color: #5c3030;
      h1{
        font-size: .9rem;
      }
      .Topnav_Account_item{
        font-size: 1.2rem;
      }
    }
    overflow: hidden;
    h3{
      font-size: 1rem;
      font-weight: normal;
      color: #555;
      cursor: pointer;
    }
    h1{
      font-size: .8rem;
      font-weight: normal;
      color: #555;
      cursor: default;
    }
    .Topnav_Account_item{
      color: black;
      margin: .5rem 0;
      font-size: 1rem;
      font-weight: 400;
      text-decoration: none;
      cursor: pointer;
    }
  }
`

export default Account