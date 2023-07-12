import React, { useState, useEffect } from 'react';
import '../styles/HeroCard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

const { oldData } = require('../constants');

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'GW Points',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      }
    },
    y: {
      grid: {
        display: false
      },
    },
  },
};

function HeroCard({allManagerData, focusedManager}) {
  const [ managerData, setManagerData ] = useState(oldData)
  const [ chart, setChart ] = useState('line')

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
    let  all_pts = managerData.map(obj => {
                      if (obj.stats[fpl_id] !== undefined) {
                        return obj.stats[fpl_id].current.map(gw => gw.points)
                      }
                    })

    const filteredArray = all_pts.filter(function (element) {
      return element !== undefined;
      });
    return filteredArray
  }

  const allPts = managerPointsAllGW(focusedManager);

  function makePtsByGWDataset() {
    const ptsByGW = allPts[0] !== undefined ? allPts[0].map((pts, index) => ({ 'x': index + 1, 'y': pts })) : '';
    return ptsByGW
  }

  function makeAccaPtsDataset() {
    const array =  allPts[0] !== undefined ? allPts[0] : [0];
    let gwAcca = [array[0]]
    function reducer(accumulator, currentValue) {
      const returns = accumulator + currentValue
      gwAcca.push(returns)
      return returns;
    }
    array.reduce(reducer)
    return gwAcca
  }

  const labels = allPts[0] !== undefined ? makePtsByGWDataset().map(gw => gw.x) : '';
  const data = {
    labels: labels.slice(-10),
    datasets: [
      {
        label: '457709 GW Pts',
        data: makePtsByGWDataset().slice(-10),
        backgroundColor: '#fff',
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
        label: '457709 Acca GW Pts',
        data: makeAccaPtsDataset().slice(-10),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }


  // const goRight = () => {
  //   setDirection('goRight')
  //  }
 
  // const goLeft = () => {
  //   setDirection('goLeft')
  // }

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
        cardTitle = 'Points By Gameweek';
        break;
      case 'line':
        chartComponent = <Line options={options} data={data2} />;
        cardTitle = 'Accumulated Points'
        break;
      default:
        chartComponent = null;
        break;
    }

    return (
      <>
        <div className='card-header'>
          <span className='card-title'>
            {cardTitle}
          </span>
          <button className='see-more-bttn' onClick={() => changeChart(chartType)}>
            Next Chart
          </button>
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