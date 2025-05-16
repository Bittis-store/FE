import { ApexOptions } from 'apexcharts';

export const optionsLineChart = (timeline: string[], showRevenue: boolean, showOrders: boolean): ApexOptions => {
  return {
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 0,
      offsetY: 0,
      markers: {
        width: 8,
        height: 8,
        strokeWidth: 0,
        radius: 12,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    colors: ['#3C50E0', '#10B981'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    grid: {
      show: true,
      borderColor: '#E2E8F0',
      strokeDashArray: 4,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: ['#fff'],
      strokeColors: ['#3C50E0', '#10B981'],
      strokeWidth: 3,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      type: 'category',
      categories: timeline,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px',
          fontWeight: 400,
        },
      },
    },
    yaxis: [
      {
        show: showRevenue,
        title: {
          text: 'Doanh thu',
          style: {
            color: '#3C50E0',
            fontSize: '14px',
            fontWeight: 500,
          },
        },
        labels: {
          style: {
            colors: '#64748B',
            fontSize: '12px',
            fontWeight: 400,
          },
          formatter: (value: number) => (value !== undefined ? `${value.toLocaleString()} đ` : ''),
        },
      },
      {
        show: showOrders,
        opposite: true,
        title: {
          text: 'Đơn hàng',
          style: {
            color: '#10B981',
            fontSize: '14px',
            fontWeight: 500,
          },
          offsetX: -2,
        },
        labels: {
          style: {
            colors: '#64748B',
            fontSize: '12px',
            fontWeight: 400,
          },
          formatter: (value: number) => (value !== undefined ? Math.round(value).toString() : ''),
          offsetX: -10,
        },
        axisBorder: {
          show: true,
          color: '#E2E8F0',
          offsetX: 8,
        },
        axisTicks: {
          show: true,
          color: '#E2E8F0',
          offsetX: 15,
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: [
        {
          formatter: (value: number | undefined) =>
            value !== undefined ? `${value.toLocaleString()} đ` : 'N/A',
        },
        {
          formatter: (value: number | undefined) =>
            value !== undefined ? Math.round(value).toString() : 'N/A',
        },
      ],
    },
  };
};
