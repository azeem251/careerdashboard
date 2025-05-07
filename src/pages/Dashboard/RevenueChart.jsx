import React from 'react';
import ReactApexChart from 'react-apexcharts';

const RevenueChart = () => {
  const chartOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false
      }
    },
    colors: ['#FF7F7F', '#C39BFF'], // light red & light purple
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['5k', '10k', '15k', '20k', '25k', '30k', '35k', '40k', '45k', '50k', '55k', '60k']
    },
    yaxis: {
      min: 20,
      max: 100,
      tickAmount: 4,
      labels: {
        formatter: function (val) {
          return val;
        }
      }
    },
    title: {
      text: 'Revenue',
      align: 'left',
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333'
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center'
    },
    fill: {
      type: 'solid',
      opacity: 0.4
    }
  };

  const series = [
    {
      name: 'Sales',
      data: [20, 30, 25, 28, 40, 45, 60, 35, 50, 30, 45, 25]
    },
    {
      name: 'Profit',
      data: [20, 65, 30, 20, 25, 30, 90, 50, 65, 40, 85, 25]
    }
  ];

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md revenue_chart">
      <ReactApexChart options={chartOptions} series={series} type="area" height={350} />
    </div>
  );
};

export default RevenueChart;
