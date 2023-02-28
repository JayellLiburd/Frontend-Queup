import { useEffect, useState } from "react"
import styled from "styled-components"
import { ChartData, ChartOptions } from 'chart.js';
import { currentTime } from "Functions/time"

import ReportChart from "./reportChart"
import { BusinessTypes } from "Connections/lib/@Types";
import { BsSearch } from "react-icons/bs";
import axios from "axios";


interface LineProps {
  options: ChartOptions<'line'>;
  data: ChartData<'line'>;
}
let storedData: BusinessTypes[] = []
function Dashboard() {

  // set the current time into the DOM
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  useEffect(() => {
    const timeElement = document.getElementById('PD_currentTime') as HTMLElement
    if (!timeElement) return
    setInterval(() => {
      const time = currentTime()
      timeElement.innerHTML = time
    }, 1000)
  }, [])

  // get the data from the server and use functions to control state of the data such as search and favorite
  let favoriteBusinesses: BusinessTypes[] = Array(6).fill({name: 'Click to add Favorite', street: '', street_number: ''})
  const 
    [businesses, setBusinesses] = useState<BusinessTypes[]>([]),
    [favorite, setFavorite] = useState<BusinessTypes[]>(favoriteBusinesses),
    [search, setSearch] = useState<string>('');
  useEffect(() => {
    gatherData()
  }, [])
  useEffect(() => {
    setTimeout(() => {
      if (search.length < 1) return setBusinesses(storedData)
      const filtered = JSON.parse(JSON.stringify(storedData)).filter((business: BusinessTypes) => business.name?.toLowerCase().includes(search.toLowerCase()))
      setBusinesses(filtered)
    }, 500)
  }, [search])


  return (
    <Wrapper>
      <div className="PD_Overview">
        <div className="PD_time">
          <div>
            <h1>Todays News</h1>
            <p>{months[new Date().getMonth()]} {new Date().getDate()} {new Date().getFullYear()}</p>
          </div>
          <p id="PD_currentTime">{currentTime()}</p>
        </div>
        <ReportChart data={getChartData()}/>
      </div>
      <div className="PD_Overview_Right">
        <h1 style={{'fontWeight': 'normal', 'fontSize': '1.2rem'}}>My Queues</h1>
        <div className="PD_favorites">
          {favorite.map((business, index) => {
            return (
              <div key={index} className="PD_favoriteBusiness">
                <h4>{business.name}</h4>
                <p>{business.street_number} {business.street}</p>
              </div>
            )
          })}
        </div>
        <div className="PD_inputBox">
          <BsSearch className="PD_Search_icon" />
          <input type="text" placeholder="Search Queue's" onChange={e => setSearch(e.target.value)}/>
        </div>
        <div className="PD_MyQueues">
          {businesses.map((business, index) => {
            return (
              <div key={index} className="PD_MyQueue">
                <h4>{business.name}</h4>
                <p>{business.street_number} {business.street}</p>
              </div>
            )
          })
          }
        </div>
      </div>
    </Wrapper>
  );

  function getChartData(){
    const Chart: LineProps = {
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Views',
            data: [157, 279, 340, 278, 300],
            backgroundColor: '#ffbd675c',
            borderColor: '#ffbd67',
            borderWidth: 1,
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Visitors',
            data: [109, 179, 300, 209, 192],
            backgroundColor: '#00ff557f',
            borderColor: '#00ff55',
            borderWidth: 1,
            tension: 0.4,
            fill: true,
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    }
    return Chart
  }

  function gatherData(){
    if (storedData.length > 0) {
      setBusinesses(storedData);
      storedData.map((business) => {
        if (business.favorite !== null) {
          favoriteBusinesses[business.favorite] = business
        }
      })
      setFavorite(favoriteBusinesses)
    }
    else {
      axios.get(process.env.REACT_APP_Server + '/management').then((res: {data: BusinessTypes[]}) => {
        storedData = res.data
        res.data.map((business) => {
          if (business.favorite !== null) {
            favoriteBusinesses[business.favorite] = business
          }
        })
        setBusinesses(res.data)
        setFavorite(favoriteBusinesses)
      })
    }
  }
}

const Wrapper = styled.div.attrs({id: 'Profile_Dashboard'})`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  .PD_Overview{
    display: flex;
    flex-direction: column;
    margin: 1% 1rem;
    padding: 1rem;
    width: 25rem;
    height: calc(95% - 1rem);
    background-color: #ffffff41;
    backdrop-filter: blur(5px);
    .PD_time{
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      width: 100%;
      h1{
        margin: 0;
        font-size: 1.5rem;
      }
      p{
        margin: 0;
        font-size: .7rem;
        color: #525252;
      }
      #PD_currentTime{
        margin-top: .5rem;
      }
    }
  }
  .PD_Overview_Right{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1% 1rem;
    padding: 1rem;
    width: 40rem;
    height: calc(95% - 1rem);
    background-color: #f5eedc79;
    h1{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0;
      margin-top: 0;
      width: 95%;
      height: min-content;
      font-size: 1.5rem;
    }
    .PD_favorites{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-gap: 1rem;
      padding-bottom: 1rem;
      width: 95%;
      height: min-content;
      border-bottom: 3px double #525252;
      .PD_favoriteBusiness{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 4rem;
        background-color: #ffffff41;
        backdrop-filter: blur(5px);
        overflow: hidden;
        cursor: pointer;
        h4{
          margin: 0;
          text-align: center;
          font-size: .9rem;
        }
        p{
          margin: 0;
          text-align: center;
          font-size: .7rem;
          color: #525252;
        }
        &:hover{
          background-color: #ffffff7d;
        }
      }
    }
    .PD_inputBox{
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1rem 0;
      width: 95%;

      .PD_Search_icon{
        position: absolute;
        left: .5rem;
      }
      input{
        width: 100%;
        height: 3rem;
        font-size: 1.2rem;
        text-indent: 2rem;
        border: none;
        border-bottom: 1px solid #525252;
        background-color: transparent;
        &:focus{
          outline: none;
          border-bottom: 1px solid #915d19;
        }
      }
    }
    .PD_MyQueues{
      display: flex;
      flex-direction: column;
      width: 95%;
      height: 100%;
      overflow-y: scroll;
      .PD_MyQueue{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 4rem;
        background-color: #ffffff41;
        backdrop-filter: blur(5px);
        overflow: hidden;
        cursor: pointer;
        h4{
          margin: 0 1rem;
          text-align: center;
          font-size: .9rem;
        }
        p{
          margin: 0;
          text-align: center;
          font-size: .7rem;
          color: #525252;
        }
        &:hover{
          background-color: #ffffff7d;
        }
      }
    }
  }
    
`

export default Dashboard