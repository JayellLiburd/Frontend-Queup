import axios from "axios"

export function updateprofile(a,b,c,d,e) {

    axios.get(process.env.REACT_APP_Server + '/verify/pro', {withCredentials: true}).then((response) => {
        try {
            if (response.data[0]) {
            axios.post(process.env.REACT_APP_Server + "/reg/profile", {
                first_name: a === undefined || null ? (response.data[0].first_name) : a,
                last_name: b === undefined || null ? (response.data[0].last_name) : b,
                email: c === undefined || null ? (response.data[0].email) : c,
                address: d === undefined || null ? (response.data[0].address) : d,
                phone: e === undefined || null ? (response.data[0].phone) : e,
            },{withCredentials: true}).then((response) => {window.location.reload()})}
            else { alert('Technical Error Lets try again later'); window.location.assign('/') }
        } catch {
            alert('Technical Error Lets try again later')
        } 
    })
}

export default updateprofile