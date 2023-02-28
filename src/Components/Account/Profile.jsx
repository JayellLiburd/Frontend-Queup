import { React, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

import { BsPersonFill } from 'react-icons/bs';
import updateprofile from '../../Connections/profile';
import { usersContext } from '../..Helpers/Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Profile() {

    //profile
    const { setAuth, auth } = useContext(usersContext)

    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        phone: '',
    })

    useEffect(() => {   
        if (auth) {
            axios.get(process.env.REACT_APP_Server + '/verify/pro', {withCredentials: true}).then((response) => {
                if (response.data[0]) {
                    setUser(response.data[0])
                    setName(response.data[0].first_name)
                    setLast(response.data[0].last_name)
                    setEmail(response.data[0].email)
                    setPhone(response.data[0].phone)
                    setAddress(response.data[0].address)
                }
                else {
                    alert('Please reverify with your login credentials')
                    signin()
                }
            })
        }
    }, [auth])

    function signin() {
        const menubg = document.querySelector('.burger')
        const openmenu = document.querySelector('.sidenav')
        const topnavcolor = document.querySelector('.topnav')
        const login = document.querySelector('.login_modal')
        menubg.classList.add('open');
        openmenu.classList.add('open')
        topnavcolor.classList.add('open')
        login.classList.add('open')
    }

    //inputs variables
    const [name, setName] = useState('')
    const [last, setLast] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    let nav = useNavigate()

    const update = () => {axios.get(process.env.REACT_APP_Server + '/verify/pro', {withCredentials: true}).then((response) => {

        if (!response.data[0]) {
            setAuth(false) 
            nav('/', {replace: true})
            window.location.reload()
            alert(response.data.message = 'Please Log back in')
        } 
        if (response.data[0]) {
          setAuth(true) 
          setUser(response.data[0])
          updateprofile(name, last, email, address, phone)
        }}
    )}

  return (
    <Wrapper>
        <div id='pic'><BsPersonFill size='35'/></div>
        <h1>Profile</h1>
        <div id='info'>
            <div id='name'>
                <div>
                    <label htmlFor="Firstname">First Name</label>
                    <input type="text" placeholder='Ex: John' defaultValue={user.first_name} onInput={(e) => {setName(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="Lastname">Lastname</label>
                    <input type="text" placeholder='Ex: Smith' defaultValue={user.last_name} onInput={(e) => {setLast(e.target.value)}}/>
                </div>
            </div>
            <label htmlFor="Email">Email</label>
            <input type="text" placeholder='Ex: John@gmail.com' defaultValue={user.email} onInput={(e) => {setEmail(e.target.value)}}/>
            <label htmlFor="Address">Address</label>
            <input type="text" placeholder='Ex: 904 Kennedy Lane' defaultValue={user.address} onInput={(e) => {setAddress(e.target.value)}}/>
            <label htmlFor="PhoneNumber">Phone Number</label>
            <input type="text" placeholder='Ex: 123-456-7890' defaultValue={user.phone} name='password' onInput={(e) => {setPhone(e.target.value)}}/>
        </div>
        <button onClick={e => update()}>Save Changes</button>
    </Wrapper>
    
  )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: -5rem;
    margin: 2rem 0;
    form{*all: unset;}
    #pic{ 
        padding: 1.5rem;
        border-radius: 50%;
        background-color: #f3f3f3;
    }
    #info{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50rem;
    }
    label{text-indent: .6rem;}
    input{
        margin: .2rem 0; 
        padding: 0 1rem;
        height: 2rem; 
        width: 20rem; 
        font-weight: bold;
        border-radius: .5rem; 
        border: none;
        box-shadow: 0px 0px 5px 1px #00000010;
    }
    #name{
        display: flex;
        width: 100%;
        justify-content: space-around;
        margin: 2rem;
        div{  
        display: flex;
        flex-direction: column;
        }
    }
    button{
        position: absolute;
        bottom: -5rem;
        right: 0;
        padding: .5rem;
        background-color: #cbeaff;
        border: 1px #cecece solid;
        border-radius: 1rem;
        cursor: pointer;
    }

    @media (max-width: 1400px) {
    label{color: grey; margin-top: 1rem;}
    #info{width: 95vw; top: 3rem;}
    #name{margin: 1rem;}
    input{margin: 0 0.5rem; width: 75%; border: 1px black solid; border-radius: .5rem;}
    #pic{z-index: 2;}
    h1{z-index: 2;}
    button{right: 1rem;}
    }
    
`

export default Profile