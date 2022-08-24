import axios from 'axios'
import React from 'react'

export default function Createque(a,b,c,d,e,f,g,  h,i,j,k,l,m, n,o) {
    console.log(a,b,c,d,e,f,g,  h,i,j,k,l,m, n, o)
    axios.post('http://localhost:4000/createque',  new URLSearchParams({ 
    busname: a === '' ? 0 : a,

    img: n,
    img2: o,

    withCredentials: true
    }))
}
