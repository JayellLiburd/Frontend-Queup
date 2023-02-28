import {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

interface LineProps {
  options: ChartOptions<'line'>;
  data: ChartData<'line'>;
}
function ReportChart({data: propData}: {data: LineProps}) {
  const [data, setData] = useState<LineProps>({
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  } as LineProps);


  useEffect(() => {
    setData(propData);
  }, [propData]);

  return (
    <Wrapper>
      <h2 style={{color: '#5e5d5d', fontFamily: 'serif', fontSize: '1.4rem', margin: '0.5rem 1.5rem'}}>Performance</h2>
      <Line className='reportChart' {...data} />
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs({id: 'reportChart', className: 'Overview_modals'})`
  margin: .5rem auto;
  margin-left: 0;
  width: 100%;
  height: 15rem;
  background-color: white;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.2);
  .reportChart{
    padding: .5rem;
    height: 80% !important;
  }
`

export default ReportChart