import React, { useContext } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"

import { useNavigate } from "react-router-dom"
import { usersContext } from "./user"



export async function setUserLogin(checkUsername, checkPassword) {
    axios.post('http://localhost:4000/login',  new URLSearchParams({
        username: checkUsername, 
        password: checkPassword,
        withCredentials: true,
    })).then((response) => {

        console.log(response)
        //Sign in Wrong or Error
        if (response.data.message) {console.log(response.data.message)} 

        else {
            //set backend cookies with url
            axios.get('http://localhost:4000/' + (response.data[1]) + '/login', {withCredentials: true,})}
})}


export function sendRegistation(username, password, first, last, email) {
    axios.post('http://localhost:4000/reg',  new URLSearchParams({
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
    axios.get('http://localhost:4000/set/' + (response.data[1]) + '/login', {withCredentials: true}).then((result) => {
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


export function VerifyAuth() {
    let nav = useNavigate()
    const {setAuth} = useContext(usersContext)
    axios.get('http://localhost:4000/verify', {withCredentials: true}).then((response) => {
        console.log(response)
        if (response.data.message) {setAuth(false)
             nav('/Home', {replace: true})
                alert('Please Sign In')}

        if (response.data[0]) {setAuth(true)}
    })
}

export default sendRegistation

