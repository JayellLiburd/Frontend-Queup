import axios from "axios"
import { standardLogin } from "./login"



export function sendRegistation(first, last, email, username, password) {
    axios.post(process.env.REACT_APP_Server + '/reg',  new URLSearchParams({
        first_name: first,
        last_name: last,
        email: email,
        username: username, 
        password: password
    }), {withCredentials: true}).then(response => {
        if (response.data.username_error || response.data.email_error) {
            alert(response.data?.email_error || response.data?.username_error)
        } else { standardLogin(username, password) }
    })
}

export function Logout() {
    axios.get(process.env.REACT_APP_Server + '/logout',{withCredentials: true}).then((response) => {
        window.location.reload()
    })
}


export default sendRegistation

