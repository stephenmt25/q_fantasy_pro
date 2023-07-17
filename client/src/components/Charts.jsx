export function createGradient(ctx, area) {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, 'white');
  // gradient.addColorStop(0.5, 'black');
  gradient.addColorStop(0.99, 'black');

  return gradient;
}

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
        font: {
            family: 'Jost', // Your font family
            size: 14,
        },
        color: 'black'
      },
      title: {
        display: true,
        text: 'GW',
        color: 'black',
        font: {
          family: 'Staatliches',
          size: 20,
        },
      }
    },
    y: {
      // display: false,
      grid: {
        display: true,
        color: 'black',
        lineWidth: 2,
      },
      border: {
        dash: [2, 21],
      },
      ticks: {
        // display: false,
        font: {
            family: 'Jost', // Your font family
            size: 12,
        },
        color: 'black',
      },
      title: {
        display: true,
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

export const plugins = [{
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
            ctx.lineTo(xAxis.right, y);
            ctx.moveTo(x, yAxis.top);
            ctx.lineTo(x, yAxis.bottom);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.restore();
        }
    }
  }]