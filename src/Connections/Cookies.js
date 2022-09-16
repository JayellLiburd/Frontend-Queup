import axios from "axios"



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

export function Logout() {
    axios.get(process.env.REACT_APP_Server + '/logout',{withCredentials: true}).then((response) => {
        window.location.assign('/')
    })
}


export default sendRegistation

