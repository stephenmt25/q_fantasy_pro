import React, { useState, useEffect, useContext } from 'react';
import '../styles/HeroCard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  // Title,
  Tooltip,
  // Legend,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { createGradient, options, plugins } from './Charts';
import { UserContext } from '../UserContext';

const { oldData } = require('../constants');

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  // Title,
  Tooltip,
  // Legend,
  // Filler
);

function HeroCard({allManagerData, focusedManager}) {
  const [ managerData, setManagerData ] = useState(oldData)
  const [ chart, setChart ] = useState('bar')
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const chartRef = React.useRef(null) ;
  const { managerObj } = useContext(UserContext)

  useEffect(() => {
    const chart1 = chartRef.current;

    if (!chart1) {
      return;
    }

    const chartData2 = {
      ...data2,
      datasets: data2.datasets.map(dataset => ({
        ...dataset,
        borderColor: 'black',
        // backgroundColor: createGradient(chart1.ctx, chart1.chartArea),
        color: 'black'
      })),
    };

    setChartData(chartData2);
  }, []);

  useEffect(() => {
    if(allManagerData !== []) {
      setManagerData(allManagerData)
    }
  },[allManagerData]);

  function allManGWPoints(gw) {
    let  pts = managerData.map(obj => obj.stats[obj.id].current[gw].points)
    return pts
  }

  function managerPointsAllGW(fpl_id) {
    const all_pts = managerData.map(obj => obj.stats[fpl_id]?.current.map(gw => gw.points));
    const filteredArray = all_pts.filter(element => element !== undefined);
    return filteredArray;
    }

  const allPts = managerPointsAllGW(focusedManager);

  function makePtsByGWDataset() {
    const ptsByGW = allPts[0] !== undefined ? allPts[0].map((pts, index) => ({ 'x': index + 1, 'y': pts })) : '';
    return ptsByGW
  }

  function makeAccaPtsDataset() {
    const array = allPts[0] || [0];
    let gwAcca = [array[0]];
  
    const reducer = (accumulator, currentValue) => {
      const sum = accumulator + currentValue;
      gwAcca.push(sum);
      return sum;
    };
  
    array.reduce(reducer);
    return gwAcca;
  }

  const labels = allPts[0] !== undefined ? makePtsByGWDataset().map(gw => `${gw.x}`) : '';
  const data = {
    labels: labels.slice(-10),
    datasets: [
      {
        label: 'Points',
        data: makePtsByGWDataset().slice(-10),
        backgroundColor: 'black',
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
      },
    ],
  }

  const data2 = {
    labels: labels.slice(-10),
    datasets: [
      {
        label: 'Total Points',
        data: makeAccaPtsDataset().slice(-10),
        borderColor: 'black',
        fill: true,
      },
    ],
  }

  function changeChart(current) {
    switch (current) {
      case 'line':
        setChart('bar')
        break;
      case 'bar':
        setChart('line')
        break;
      default:
        break;
    }
  }

  const Cards = ({chartType}) => {
    let chartComponent;
    let cardTitle;

    switch (chartType) {
      case 'bar':
        chartComponent = <Bar options={options} data={data} />;
        cardTitle = `${managerObj.team_name} - Points By Gameweek`;
        break;
      case 'line':
        chartComponent = <Line ref={chartRef} options={options} data={chartData} plugins={plugins} />;
        cardTitle = `${managerObj.team_name} - Accumulated Points`
        break;
      default:
        chartComponent = null;
        break;
    }

    return (
      <>
        <div className='card-header'>
          {/* <span className='card-title'>
            {cardTitle}
          </span>
          <button className='see-more-bttn' onClick={() => changeChart(chartType)}>
            Next Chart
          </button> */}
        </div>
        <div className='chart-cntr'>
          {chartComponent}
        </div>
      </>  
    )
  }

  return (
    <div className="hero-card">
        <Cards chartType={chart}/>    
    </div>
  );
}

export default HeroCard;