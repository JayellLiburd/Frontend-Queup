import React, { useContext, useEffect, } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios';

import { BusinessTypes } from 'Connections/lib/@Types';
import { usersContext } from '../Helpers/Context'
import { session } from 'Connections';
import Navigation from 'Components/Profile/Navigation';

import { BsEye, BsGearWideConnected } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import Dashboard from 'Components/Profile/Dashboard/Dashboard';

const PageViews = [
  {
    name: 'Dashboard',
    icon: <MdOutlineSpaceDashboard size={25}/>,
    jsx: <Dashboard />,
    viewing: true
  },
  {
    name: 'Viewer',
    icon: <BsEye size={25}/>,
    jsx: <>Viewer</>,
    viewing: false
  },
  {
    name: 'Manage',
    icon: <FiUser size={25}/>,
    jsx: <>Management</>,
    viewing: false
  },
  {
    name: 'Settings',
    icon: <BsGearWideConnected size={23}/>,
    jsx: <>Settings</>,
    viewing: false
  }
];

//todo: add href between pages to make it easier to navigate
function Overview() {

  const nav = useNavigate();
  const {setAuth, auth} = useContext(usersContext);
  
  const [views, setViews] = React.useState<typeof PageViews>(PageViews)

  useEffect(() => {
    fetchData()
  }, [auth])

  return (
    <Wrapper>
      <Navigation views={views} setState={setViews}/>
      {views.map((view, index) => {
        if (!view.viewing) return null
        return (
          <div key={index} className='Profile_Views'>
            {view.jsx}
          </div>
        )
      })}
    </Wrapper>
  )

  function fetchData(){
    session.verify({}).then(response => {
      if (response.data.messageAuth) {
        setAuth(false)
        nav('/')
        alert('Please Sign In')
        menu()
      } else {
        axios.get<Array<BusinessTypes>>(process.env.REACT_APP_Server + '/management', {withCredentials: true}).then(response => {
          
        })
      }
    })
  }

  function menu() {
    const menubg = document.querySelector('.burger')
    const openmenu = document.querySelector('.sidenav')
    const topnavcolor = document.querySelector('.topnav')
    const login = document.querySelector('.login_modal')
    if (!menubg || !openmenu || !topnavcolor || !login) return
    menubg.classList.add('open');
    openmenu.classList.add('open')
    topnavcolor.classList.add('open')
    login.classList.add('open')
  }
}

const Wrapper = styled.div`
  display: flex;
  height: min-content;
  position: relative;
  width: 100vw;
  height: 85vh;
  background: radial-gradient(circle, #cebcaa 0%, #d7eff27b 75%, #cef8ffc1 100%);
`

export default Overview