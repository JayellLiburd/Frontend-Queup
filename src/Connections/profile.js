import axios from "axios"

export function updateprofile(a,b,c,d,e) {

    axios.get('https://app.queueupnext.com/verify/pro', {withCredentials: true}).then((response) => {

        if (!response.data.message) {
        axios.post('https://app.queueupnext.com/auth/' + (response.data[0].user_id) + "/profile",  new URLSearchParams({
            first_name: a === undefined ? (response.data[0].first_name) : a,
            last_name: b === undefined ? (response.data[0].last_name) : b,
            email: c === undefined ? (response.data[0].email) : c,
            address: d === undefined ? (response.data[0].address_1) : d,
            phone: e === undefined ? (response.data[0].phone) : e,
            withCredentials: true,
            })
        ).then((response) => {window.location.reload()})}
    })
}

export default updateprofile