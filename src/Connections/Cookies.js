import React, { useContext } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"

import { useNavigate } from "react-router-dom"
import { usersContext } from "./user"



export async function setUserLogin(checkUsername, checkPassword) {
    axios.post(process.env.REACT_APP_Server + '/login',  new URLSearchParams({
        username: checkUsername, 
        password: checkPassword,
        withCredentials: true,
    })).then((response) => {

        console.log(response)
        //Sign in Wrong or Error
        if (response.data.message) {console.log(response.data.message)} 

        else {
            //set backend cookies with url
            axios.get(process.env.REACT_APP_Server + '/' + (response.data[1]) + '/login', {withCredentials: true,})}
})}


export function sendRegistation(first, last, email, username, password) {
    axios.post(process.env.REACT_APP_Server + '/reg',  new URLSearchParams({
        withCredentials: true,
        Credentials: 'include',
        username: username, 
        password: password,
        first_name: first,
        last_name: last,
        email: email,
    })).then(alert('User Created Please Head back and Log in'))
}

export function setCookies(response) {
    axios.get(process.env.REACT_APP_Server + '/set/' + (response.data[1]) + '/login', {withCredentials: true}).then((result) => {
    let nav = useNavigate()
    console.log(result)
    //get prefrences
    if (result.data[1]) {
        localStorage.setItem('prfs', result.data);

        if (!window.location.hash) {
            nav('/', {replace: true})
            window.location.reload();
        }
    }
    else { alert(response.data.message)}
})}

export function Logout() {
    axios.get(process.env.REACT_APP_Server + '/logout', {withCredentials: true}).then((response) => {
        window.location.assign('/')
        window.location.reload()
    })
}

export function VerifyAuth() {
    let nav = useNavigate()
    const {setAuth} = useContext(usersContext)
    axios.get(process.env.REACT_APP_Server + '/verify', {withCredentials: true}).then((response) => {
        console.log(response)
        if (response.data.message) {setAuth(false)
             nav('/Home', {replace: true})
                alert('Please Sign In')}

        if (response.data[0]) {setAuth(true)}
    })
}

export default sendRegistation

