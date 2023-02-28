import axios from 'axios';
import { initializeApp } from 'firebase/app';
import {getDatabase, ref, set, onValue} from 'firebase/database'

export async function writeUserData(user: string, line: string) {
  const promise = new Promise<void>((resolve, reject) => {
    axios.post(process.env.REACT_APP_Server + '/Queup', {user, line}, {withCredentials: true})
    .then(res => {
      resolve(res.data)
    })
  })
  const result = await promise
  return result
}

export async function Call(user: string, line: string) {
  const promise = new Promise<void>((resolve, reject) => {
    axios.post(process.env.REACT_APP_Server + '/Queup', {user, line}, {withCredentials: true})
    .then(res => {
      resolve(res.data)
    })
  })
  const result = await promise
  return result
}