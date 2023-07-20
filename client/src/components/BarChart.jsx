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
import { createGradient, plugins } from './Charts';
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
  Filler
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    // legend: {
    //   position: 'bottom',
    // },
    title: {
      // display: true,
      text: 'GW Points',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        color: 'black',
        lineWidth: 2,
      },
      border: {
        dash: [2, 18],
      },
      ticks: {
        display: true,
        font: {
            family: 'Jost', // Your font family
            size: 14,
        },
        color: 'black'
      },
      title: {
        display: false,
        text: 'GW',
        color: 'black',
        font: {
          family: 'Staatliches',
          size: 20,
        },
      }
    },
    y: {
      display: false,
      grid: {
        display: false,
        color: 'black',
        lineWidth: 2,
      },
      border: {
        dash: [2, 21],
      },
      ticks: {
        display: false,
        font: {
            family: 'Jost', // Your font family
            size: 12,
        },
        color: 'black',
      },
      title: {
        display: false,
        text: 'Pts',
        color: 'black',
        font: {
          family: 'Staatliches',
          size: 20,
        },
      }
    },
  },
  elements: {
    point: {
      pointStyle: true
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
};

function BarChart({ showDetails }) {
  const [ managerData, setManagerData ] = useState(oldData)
  const [ chart, setChart ] = useState('line')
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const chartRef = React.useRef(null) ;
  const { managerObj, userId } = useContext(UserContext)

  useEffect(() => {
    fetch("/statsData")
      .then((response) => response.json())
      .then((data) => {
        setManagerData(data);
      });
  }, []);


  function managerPointsAllGW(fpl_id) {
    const all_pts = managerData.map(obj => obj.stats[fpl_id]?.current.map(gw => gw.points));
    const filteredArray = all_pts.filter(element => element !== undefined);
    return filteredArray;
    }

  const allPts = managerPointsAllGW(userId);

  function makePtsByGWDataset() {
    const ptsByGW = allPts[0] !== undefined ? allPts[0].map((pts, index) => ({ 'x': index + 1, 'y': pts })) : '';
    return ptsByGW
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


  const plugins1 = [{
    afterDraw: chart => {
        if (chart.tooltip?._active?.length) {
          showDetails(chart.tooltip.dataPoints[0].label)
        }
    }
  }]

  return (
    <Bar options={options} data={data} plugins={plugins1}/>    
  );
}

export default BarChart;