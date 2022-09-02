import axios from 'axios';

export function setAbclogin(response) {

    axios.post('http://localhost:4000/verify',  new URLSearchParams({ user: response.credential, withCredentials: true})).then((result) => {

        if (result.data[0].user) { axios.get('http://localhost:4000/set/' + (result.data[0].user) + '/login', {withCredentials: true}).then((response) => {

                console.log(response)
                //get prefrences
                if (response.data[1]) { localStorage.setItem('prfs', response.data); window.location.assign('/')}
        })}

        else { 
            try {axios.post('http://localhost:4000/reg',  new URLSearchParams({ user: response.credential, withCredentials: true})).then((response) => {

                if (response.data.ssuid) { axios.get('http://localhost:4000/set/' + (response.data.ssuid) + '/login', {withCredentials: true}).then((response) => {
                    
                    //get prefrences
                    if (result.data[1]) { localStorage.setItem('prfs', response.data); window.location.assign('/')}
        
                })}
                else {console.log(response)}
            })}
            catch (err) {console.log(response.data.err)}
        }}
    )
}

export function standardLogin(checkUsername, checkPassword) {
    axios.post('http://localhost:4000/login', new URLSearchParams({
        username: checkUsername, 
        password: checkPassword,
        withCredentials: true,
    })).then((response) => {
        //Sign in Wrong or Error

        if (response.data[0]) { 

            console.log(response)
            //set backend cookies with url
            axios.get('http://localhost:4000/set/' + (response.data[1]) + '/login', {withCredentials: true}).then((result) => {
                
                //get prefrences
                if (result.data[1]) { localStorage.setItem('prfs', result.data); ; window.location.assign('/') }
            })
        } 
        else { alert(response.data.message)}
    })
}

export default setAbclogin