import axios from 'axios'
import React from 'react'

export default function Createque(a,b,c,d,e,f,g,  h,i,j,k,l,m) {
    console.log(a,b,c,d,e,f,g,  h,i,j,k,l,m)
    axios.post('https://api.queueupnext.com/Create', { 
    busname: a,
    add: b,
    add2: c,
    city: d,
    zip: d,
    states: f,
    country: g,
    small: h,
    rate: i,
    catagory: j,
    raffles: k,
    promos: l,
    host: m,
    withCredentials: true
    })
}
