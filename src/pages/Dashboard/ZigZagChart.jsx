import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ZigZagChart = () => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    setChartOptions({
      chart: {
        type: 'line',
        height: 350,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false  
        }
      },
      title: {
        text: 'Sales Details',
        align: 'left',
        style: {
            fontSize: '24px',  
            fontWeight: 'bold',
            color: '#263238'   
          }
      },
      xaxis: {
        categories: [
          '5k', '10k', '15k', '20k', '25k', '30k', '35k', 
          '40k', '45k', '50k', '55k', '60k'
        ]
      },
      yaxis: {
        min: 20,
        max: 100,
        tickAmount: 4,
        labels: {
          formatter: (val) => `${val}%`
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      markers: {
        size: 5,
        colors: ['#1E90FF'],
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `${val.toFixed(2)}%`;
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.2,
          stops: [0, 90, 100]
        }
      }
    });

    setChartSeries([
      {
        name: 'Sales',
        data: [
          22.5, 25.8, 40.2, 64.36, 38.7, 42.4, 21.6,
          55.8, 60.2, 52.4, 49.8, 55.6
        ]
      }
    ]);
  }, []);

  return (
    <div id="chart" className='sale_chart bg-white rounded-2xl p-4 shadow-sm'>
      <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={350} />
    </div>
  );
};

export default ZigZagChart;
