import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Chart } from "chart.js/auto";
import Summary from "../Components/Overview/Context/summary/components/Summary" 

// import spawn from 'child_process'

function Item() {
  // const data = 'testing data'
  // const child = spawn('python', ['./Test.py', data])
  // const db = getFirestore();
  const [isLoaded, setIsLoaded] = useState(false);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const labels = month.filter((_, i) => i < 7);
  let data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 82, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  useEffect(() => {
    const mychart = document.querySelector("#myChart")
    if (!mychart) return;
    let chart = new Chart(mychart as HTMLCanvasElement, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "My First Dataset",
            data: [65, 59, 80, 82, 56, 55, 40],
            borderColor: "rgb(75, 192, 192)",
          },
        ],
      },
    });
  }, []);

  return (
    <ItemWrapper>
      <h1>Test</h1>
      <canvas id="myChart"></canvas>
    </ItemWrapper>
  );
}

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* outline: 1px solid red; */
  width: 100%;
  height: 80%;
  border-radius: 0.5rem;
  canvas {
    width: 100%;
    height: 100%;
  }
`;


function Item2() {

  return (
    <ItemWrapper2>
      <div className="speed">
        <div className="div1">1</div>
        <div className="innerspeed">
          <div>2</div>
          <div>3</div>
        </div>
      </div>
    </ItemWrapper2>
  );
}



const ItemWrapper2 = styled.div`
  outline: 1px solid red;
  width: 100%;
  height: 40%;
  .speed{
    display: flex;
    justify-content: center;
  }
  .speed div{
    display: flex;
    width: 5rem;
    height: 5rem;
  }
  .speed .innerspeed{
    width: 15rem;
  }
  .speed .innerspeed div{
    margin: 0 1rem;
    background-color: grey;
  }
  .speed .div1{
    width: 10rem;
    background-color: grey;
  }
`

function Item3() {
  return (
    <ItemWrapper3>

    </ItemWrapper3>
  );
}

const ItemWrapper3 = styled.div`
  button{
    width: 5rem;
    height: 1rem;
  }
`

function Test() {
  return (
    <Wrapper>
      <Item3 />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 60vw;
  height: 80vh;
  /* background-color: #000000; */
`;

export default Test;

