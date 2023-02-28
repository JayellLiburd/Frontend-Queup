import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, onSnapshot, orderBy, query } from 'firebase/firestore'


function Lineup(props: any) {

  const [Que, setQue] = useState([])
  const [counter, setCounter] = useState(0)
  const [counter2, setCounter2] = useState(0)
  const [page, setPage] = useState(1)
  const [isloading, setIsloading] = useState(true)

  let refresh = 0
  useEffect(() => {
    const config = {
      apiKey: "AIzaSyDAICINYSy_X7b0CMDNJkRkJxeWE08x58w",
      authDomain: "queup-358912.firebaseapp.com",
      databaseURL: "https://queup-358912-default-rtdb.firebaseio.com/",
      projectId: "queup-358912",
      storageBucket: "queup-358912.appspot.com",
      messagingSenderId: "606581966610",
      appId: "1:606581966610:web:6c532778a4dc45703d95cb",
      measurementId: "G-NTK8LEJN8N"
    }
    initializeApp(config)
    setIsloading(true)
    axios.post(process.env.REACT_APP_Server + '/MyQueues/Que', {line: props.data.line_id}, {withCredentials: true}).then(res => {
      if (res.data.length > 0) {
        setQue(res.data)
      }
    })
    setIsloading(false)
  }, [refresh])

  let queArray = [] as any
  useEffect(() => {
    const db = getFirestore();
    onSnapshot(query(collection(db, `Queue/${props.data.line_id}/Que`), orderBy('accTime', 'asc')), (snap: any) => {
      setCounter(snap.docs.length)
      setQue(snap.docs.map((doc: any) => ({id: doc.id, value: doc.data()})))
      snap.docChanges().forEach((doc: any) => {
        if (doc.type === 'modified') {
          queArray[doc.newIndex] = {id: doc.doc.id, value: doc.doc.data()}
          setCounter2(counter2 === 0 ? 1 : 0)
          console.log('modified')
          return setQue(queArray)
        }
      })
    });
  }, [counter, counter2])
  
  const CALL = (e: any, user: any) => {
    // for (let users of Que.filter((_,index) => index < user.index)) {
    //   if (!users.value.called) {
    //     alert('The before User Has Not been called yet Please Make sure you call in the correct Order'); return;
    //   }
    // }
    
    if (user.value.called === 0) {
      axios.post(process.env.REACT_APP_Server + '/queup', {line: props.data.line_id, user: user.id, called: user.value.called }, {withCredentials: true})
      .then(_ => {
        if (_.data.message) {
          const progress = document.querySelector(`.progress${user.index}`) as HTMLElement
          console.log(progress)
          const progressBar = e.target.parentElement.parentElement.children[1].children[0] as HTMLElement
          console.log(progressBar)
          progress.style.backgroundColor = 'transparent'
          progressBar.style.border = '1px solid #50505030'
          let width = 100
          const timer = setInterval(() => {
            console.log(width)
            width = width - .5
            progress.innerHTML = `${width}%`
            progressBar.style.background = `rgb(${250 - (width/10) * 25}, 150, ${(width/10) * 25})`
            if (width < 0) {
              clearInterval(timer)
              progress.style.backgroundColor = '#df7000'
              axios.post(process.env.REACT_APP_Server + '/queup', {line: props.data.line_id, user: user.id, called: 1}, {withCredentials: true})
            }
          }, 100);
        }
        else { alert('There was an error calling this user') }
      })
      .catch(err => {console.log(err); alert('There was an error calling this user')})
    }
    else {
      axios.post(process.env.REACT_APP_Server + '/queup', {line: props.data.line_id, user: user.id, called: user.value.called}, {withCredentials: true})
    }
  }

  const remove = (e: any, user: any) => {
    axios.post(process.env.REACT_APP_Server + '/queup', {line: props.data.line_id, user: user.id, remove: true}, {withCredentials: true})
    .then(_ => {
      if (!_.data.message) { alert('There was an error removing this user') }
    })
    .catch(err => {console.log(err); alert('There was an error removing this user')})
  }

  let mapings = 0
  let Viewlimit = 4
  const counteru = () => {
    if (page < Math.ceil(Que.length / Viewlimit)) {
      setPage(page + 1)
    }
  }
  const counterd = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }
  
  return (
    <Wrapper>
      <h1>Guests in Line</h1>
      <p>Current Line Count: {Que.length}</p>
      {/* <button className='Force-Close' onClick={() => { const p = document.querySelectorAll('.progress'); p.style.border = 'unset'; p.style.backgroundColor = 'unset' }}>Force Close Line</button> */}
      {isloading ? <></> : 
        Que.filter((_,index) => index >= (page - 1) * Viewlimit && index < page * Viewlimit).map((holder: any) => {
          holder['index'] = mapings++
          return (
            <div className="spot" key={holder.index}>
              <h2 style={{color: holder.value?.called ? holder.value?.called !== 2 ? '#46bf60f7' :  '#e6d752c5': ''}}>{`${holder.value?.name} ${holder.value?.called ? '*' : ''}`}</h2>
              <div className={'progress' + holder.index}>
                <div className='progress-bar'></div>
              </div>
              <div className='buttons'>
                <button className='CALL' style={{backgroundColor: '#52e672a7'}} onClick={(e) => {CALL(e, holder)}}>{holder.value?.called ? 'Arrived' : 'Ready'}</button>
                <button className='SKIP' disabled={holder.value?.called !== 1} style={{backgroundColor: holder.value?.called === 1 ? '#e6d752c5' : '#b6b6b6'}} >Skip</button>
                <button className='REMOVE' onClick={e => remove(e, holder)} style={{backgroundColor: '#ff0f0fa7'}}>Remove</button>
              </div>
              <p className='time'>{holder.value?.time}</p>
            </div>
          )
        })
      }
      <div className="page-buttons">
        <button disabled={!(page > 1)} onClick={counterd}>Go Back a Page</button>
        <button disabled={!(page < Math.ceil(Que.length / Viewlimit))} onClick={counteru}>Next Page</button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  .spot{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    position: relative;
    h2{ width: 40%; margin: 0; margin-top: -.5rem; text-indent: 1rem; font-size: 1rem;}
    .time{ width: 40%; margin: 0; margin-top: -1rem; text-indent: 1rem; font-size: .6rem;}
    .buttons{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: .5rem;
      button{
        justify-content: center;
        margin: 0rem .5rem;
        padding: 0rem 1rem;
        color: #505050;
        font-weight: bold;
        border-radius: .5rem;
        border: unset;
        cursor: pointer;
      }
    }
    .progress{
      position: absolute;
      top: 1.75rem;
      left: 4.5rem;
      width: 20%;
      height: 5px;
      /* border: 1px solid #50505030; */
      border-radius: 1rem;
      transition: background-color 1s ease-in;
      overflow: hidden;
      div{
        position: relative;
        border: unset;
        transition: width .5s ease;
        height: 100%;
        /* background: skyblue; */
      }
    }

  }
  .page-buttons{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    button{
      margin: .5rem;
    }
  }
  button{
    margin: .5rem 0;
    width: 100%;
    height: 1.5rem;
    background: #DBBB90;
    color: white;
    border: unset;
    border-radius: .5rem;
    box-shadow: 0px 1px 2px 0px #b6b6b6;
    cursor: pointer;
    &:hover{box-shadow: 0px .5px 1px 0px #b6b6b6;}
    &:disabled{background: #b6b6b6 !important; box-shadow: 0px .5px 1px 0px #b6b6b6 !important; cursor: not-allowed !important;}
  }
  .Force-Close{
    position: absolute;
    top: 2.5rem;
    right: 0rem;
    width: 30%; 
    margin: .5rem 1rem;
    margin-Top: -1.5rem;
    font-Weight: bold;
  }

  @media (max-width: 1200px) {
    position: relative;
    width: 95vw;
    p{ margin:0; margin-bottom: 1rem;}
    .spot{
      h2{ width: 100%; font-size: 1.1rem; margin-top: 1rem; margin-left: 1rem;}
      p{ margin:0;}
      .buttons{
        width: 100%;
        button{
          width: 100%;
          padding: .8rem 1.5rem;
        }
      }
    }
  }
    
`
export default Lineup

function objectToArray(obj: any) {
  // Get the keys, values, or key-value pairs of the object
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const entries = Object.entries(obj);

  // Use the map() method to create a new array from the keys, values, or key-value pairs
  const arrayFromKeys = keys.map(key => ({ key, value: obj[key] }));
  const arrayFromValues = values.map(value => ({ key: value, value }));
  const arrayFromEntries = entries.map(([key, value]) => ({ key, value }));

  // Return the resulting array
  // arrayFromKeys.reverse()
  return arrayFromKeys;
}
