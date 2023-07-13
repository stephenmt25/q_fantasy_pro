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
  Filler,
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
  Legend,
  Filler
);

function createGradient(ctx, area) {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, 'blue');
  // gradient.addColorStop(0.5, 'black');
  gradient.addColorStop(0.8, 'white');

  return gradient;
}

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
  elements: {
    point: {
      pointStyle: false
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
};

function HeroCard({allManagerData, focusedManager}) {
  const [ managerData, setManagerData ] = useState(oldData)
  const [ chart, setChart ] = useState('line')
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const chartRef = React.useRef(null) ;

  useEffect(() => {
    const chart1 = chartRef.current;

    if (!chart1) {
      return;
    }

    const chartData2 = {
      ...data2,
      datasets: data2.datasets.map(dataset => ({
        ...dataset,
        borderColor: 'white',
        backgroundColor: createGradient(chart1.ctx, chart1.chartArea),
        color: 'white'
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
        // backgroundColor: createGradient(chart1.ctx, chart1.chartArea),
        fill: true
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

  const plugins = [{
    afterDraw: chart => {
        if (chart.tooltip?._active?.length) {
            let y = chart.tooltip._active[0].element.y;
            let x = chart.tooltip._active[0].element.x;
            let yAxis = chart.scales.y;
            let xAxis = chart.scales.x;
            let ctx = chart.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(xAxis.left, y);
            ctx.lineTo(x, y);
            ctx.moveTo(x, y);
            ctx.lineTo(x, yAxis.bottom);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.restore();
        }
    }
  }]


  const Cards = ({chartType}) => {
    let chartComponent;
    let cardTitle;

    switch (chartType) {
      case 'bar':
        chartComponent = <Bar options={options} data={data} />;
        cardTitle = 'Points By Gameweek';
        break;
      case 'line':
        chartComponent = <Line ref={chartRef} options={options} data={chartData} plugins={plugins} />;
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