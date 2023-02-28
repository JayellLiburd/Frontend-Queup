import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BusinessTypes } from 'Connections/lib/@Types';
import { ChartData, ChartOptions } from 'chart.js';

import MyQues from './myQues';
import ReportChart from '../../../Profile/Dashboard/reportChart';
import Stats from './Stats';
import Loading from '../../../Loading';
import QueOverview from './QueOverview';



interface LineProps {
  options: ChartOptions<'line'>;
  data: ChartData<'line'>;
}

function Lineoverview(props: {data: Array<BusinessTypes>}) {
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);
    setIsloading(false);
  }, [props.data]);

  const Chart: LineProps = {
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Views',
          data: [157, 279, 340, 278, 300],
          backgroundColor: 'rgba(103, 176, 255, 0.125)',
          borderColor: '#67b0ff',
          borderWidth: 1,
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Visitors',
          data: [109, 179, 300, 209, 192],
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          borderColor: '#ff0000',
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

  return (
    <Wrapper>
      {!isloading ? 
        <>
          <div className='Overview_rows'>
            <ReportChart data={Chart} />
            <Stats data={props.data}/>
          </div>
          <MyQues data={props.data}/>
        </>
      : 
        <>
          <div className="loadingarea">
            <Loading />
          </div>
        </>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs({id: 'mainOverview'})`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 0rem;
  margin-bottom: 1rem;
  width: 100%;
  .Overview_rows{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  input{
    all: unset; 
    height: 1.8rem;
    padding-left: 1rem;
    margin: 0 1.8rem;
    width: 92%;
    border: 2px solid #2e2e2e75; 
    border-radius: .5rem;
    font-family: sans-serif;
    color: grey;
    &:hover { border: 2px solid #00000050; transition: all 0.2s ease-in-out; }
    &:focus { border: 2px solid #181818a6; color: black; &::placeholder{color: #646464;}};
  }
  .favorites{
    display: flex;
    section{
      width: 100%;
      margin: 0;
      .favitems{
        display: grid;
        margin: .5rem 2rem;
        grid-template-columns: auto auto auto;
        column-gap: 15px;
        row-gap: 15px;
        .favbox{
          display: flex;
          position: relative;
          flex-direction: column;
          justify-content: center;
          padding: .2rem .3rem;
          width: 15rem;
          height: 4rem;
          border: 2px solid #AD8C5A;
          border-radius: .5rem;
          overflow: clip;
          span{all: unset; position: absolute; right: 10px; top: 5px; cursor: pointer; font-weight: 600; transition: all .5s ease; &:hover{color: red;}}
          h4{ margin: 0; transition: all .2s ease;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            line-clamp: 1; 
            -webkit-box-orient: vertical;
            &:hover{color: #62b7c2;}}
          p{ display: flex; align-items: center; margin: 0; font-size: .7rem; height: 5rem; cursor: pointer;}
        }
        .favbox:has(span){ h4{cursor: pointer; height: 1rem; width: 13rem;} p{background-color: unset; height: unset;}}
      }
    }
  }
  .favDialog{
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100vw; 
    height: 100vh;
    z-index: 9;
    .background{
      top: 0; 
      left: 0; 
      width: 100vw; 
      height: 100vh;
      position: fixed;
      background-color: #3b3b3bb2; 
      backdrop-filter: blur(15px);
      z-index: 5;
    }
    .favselector{
      position: relative;
      width: 40rem;
      height: 25rem;
      top: 0rem;
      translate: 0% 0%;
      border: 3px solid grey;
      border-radius: .5rem;
      padding: 1rem;
      background-color: white;
      z-index: 10;
      transition: all .5s;
      overflow: auto;
      h2 { margin: 0;}
      input{
        margin: .5rem 0rem;
        width: 85%;
      }
    }
  }
  .loadingarea{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20rem;
  }

  //showing on small screen//
  @media (max-width: 1200px) {
    margin-top: 0;
    align-items: center;
    width: unset;
    #main{display: flex; flex-direction: column; align-items: center;}
    img{
      width: 150px;
      height: 150px;
    }
    .linesheader{ flex-direction: column; align-items: center; }
    .favorites{ 
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      section{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: unset;
        .favitems{
          column-gap: 5px;
          row-gap: 0;
          width: 90%;
          height: 12rem;
          margin: unset;
          .favbox{ width: 90%; margin: 0;}
        }
      } 
      input{width: 90vw; margin: 1rem;}
    }
    h2{margin: 1rem auto; width: 90%;}
    .businesses{
      margin: 0 auto;
      flex-direction: column; 
      border-top: 1px dashed; 
      h3{margin-top: 1rem;}
    }
    .favselector{
      position: absolute;
      top: 0;
      padding: 0;
      width: 90vw;
      height: 100vh;
      translate: unset;
      z-index: 10;
      h2{ margin: 1rem auto;}
      input{ margin: .5rem 1.2rem; }
      .businesses{
        margin: 0 auto;
        flex-direction: row; 
        border-top: 1px dashed;
        h3{margin-top: 1rem;}
      }
    }
  }
`


export default Lineoverview


