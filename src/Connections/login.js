import axios from 'axios';

export function setAbclogin(response) {

    axios.post('https://app.queueupnext.com/verify', { user: response.credential, withCredentials: true}).then((result) => {

        if (result.data[0].user) { axios.get('https://app.queueupnext.com/set/' + (result.data[0].user) + '/login', {withCredentials: true}).then((response) => {

                console.log(response)
                //get prefrences
                if (response.data[1]) { localStorage.setItem('prfs', response.data); window.location.assign('/')}
        })}

        else { 
            try {axios.post('https://app.queueupnext.com/reg', { user: response.credential, withCredentials: true}).then((response) => {

                if (response.data.ssuid) { axios.get('https://app.queueupnext.com/set/' + (response.data.ssuid) + '/login', {withCredentials: true}).then((response) => {
                    
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
    axios.post('https://app.queueupnext.com/login', {
        username: checkUsername, 
        password: checkPassword,
        withCredentials: true,
    }).then((response) => {
        //Sign in Wrong or Error

        if (response.data[0]) { 

            console.log(response)
            //set backend cookies with url
            axios.get('https://app.queueupnext.com/set/' + (response.data[1]) + '/login', {withCredentials: true}).then((result) => {
                
                //get prefrences
                if (result.data[1]) { localStorage.setItem('prfs', result.data); ; window.location.assign('/') }
            })
        } 
        else { alert(response.data.message)}
    })
}

export default setAbclogin