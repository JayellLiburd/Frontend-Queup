import { useEffect, useRef, useState, } from 'react'
import styled from 'styled-components'

import Queue from './Queue'
import Search from './Search'

import { BsSearch } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import Auth from './Account'
import Account from './Account'


function TopNavigation() {
  const TopNavContainer = useRef<HTMLDivElement>(null)

  const [navSize, setNavSize] = useState(0)
  useEffect(() => {
    if(TopNavContainer.current){
      setNavSize(TopNavContainer?.current?.clientWidth)
    }
  }, [TopNavContainer])

  const NavigationItems = [
    {
      name: "Queues",
      path: '/',
      jsx: <Queue navSize={navSize}/>
    },
    {
      name: 'In Queues',
      path: '/cart',
      jsx: <div>Cart</div>
    },
    {
      name: 'Rewards',
      path: '/rewards',
      jsx: <div>Contact</div>
    },
    {
      name: 'Support',
      path: '/support',
      jsx: <div>Support</div>
    },
    {
      name: 'About',
      path: '/about',
      jsx: <div>About</div>
    }
  ];

  //todo: Nick says think about already intergrated back buttons
  return (
    <Wrapper>
      <div className="TopNavContainer" ref={TopNavContainer}>
        <div className="TopNav_item">
          <img src='/images/logo.png' />
        </div>
        {NavigationItems.map((item, index) => {
          return (
            <>
              <div key={index} className="TopNav_item">
                <NavLink
                  className='TopNav_item_link'
                  to={item.path}
                >
                  <p className='TopNav_item_link_Name'>{item.name}</p>
                  <div className="extendedTopNav">
                    {item.jsx}
                  </div>
                </NavLink>
              </div>
            </>
          )
        })}
        <div className="TopNav_item">
          <div className='TopNav_item_link'>
            <BsSearch size={14}/>
            <div className="extendedTopNav">
              <Search navSize={navSize}/>
            </div>
          </div>
        </div>
        <div className="TopNav_item">
          <div className='TopNav_item_link'>
            <FiUser size={18}/>
            <div className="extendedTopNav">
              <Account navSize={navSize}/>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}



const Wrapper = styled.nav.attrs({className: 'topnavigation'})`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  height: 3rem;
  background-color: white;
  z-index: 100;
  .TopNavContainer{
    display: flex;
    align-items: center;
    .TopNav_item{
      display: flex;
      width: min-content;
      margin: 0 1rem;
      img{
        aspect-ratio: 1/1;
        height: 3rem;
        object-fit: cover;
      }
      .TopNav_item_link{
        display: flex;
        text-decoration: none;
        width: max-content;
        color: black;
        &::before{
          content: '';
          position: absolute;
          top: calc(40vh + 3rem);
          left: 0;
          width: 100%;
          height: 0;
          pointer-events: none;
        }
        .TopNav_item_link_Name{
          font-size: .8rem;
        }
        .extendedTopNav{
          height: 0;
          position: absolute;
          top: 3rem;
          left: 0;
          width: 100%;
          color: transparent;
          background-color: white;
          overflow: hidden;
          transition: all .5s ease;
          cursor: default;
        }
        &:hover{
          ::before{
            height: calc(60vh - 3rem);
            backdrop-filter: blur(5px);
          }
          .extendedTopNav{
            color: black;
            height: 40vh;
          }
        }
      }
    }
  }
`


export default TopNavigation