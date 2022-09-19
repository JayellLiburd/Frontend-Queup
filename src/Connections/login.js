import axios from 'axios';

export function setAbclogin(response) {
    axios.post(process.env.REACT_APP_Server + '/login',{ user: response.credential}, {withCredentials: true}).then((result) => {
        //get prefrences
        if (result.data[1]) { 
            localStorage.setItem('prfs', result.data[1])
            window.location.assign('/')
        }
        else { alert(response.data.message) }
        //Otherwise register
    })
}

export function standardLogin(checkUsername, checkPassword) {
    axios.post(process.env.REACT_APP_Server + '/login', {
        username: checkUsername, 
        password: checkPassword,
    },{withCredentials: true}).then((response) => {
        // get prefrences
        if (response.data[1]) {
            localStorage.setItem('prfs', response.data[1]);
            window.location.assign('/')
        }
        else { alert(response.data.message)}
    })
}

export default setAbclogin
