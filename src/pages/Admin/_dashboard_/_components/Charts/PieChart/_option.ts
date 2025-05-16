import { ApexOptions } from 'apexcharts';

const optionsPieChart: ApexOptions = {
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        type: 'donut',
    },
    colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
    labels: ['Desktop', 'Tablet', 'Mobile', 'Unknown'],
    legend: {
        show: false,
        position: 'bottom',
    },

    plotOptions: {
        pie: {
            donut: {
                size: '65%',
                background: 'transparent',
                labels: {
                    show: true,
                    name: {
                        show: false,
                    },
                    value: {
                        show: true,
                        fontSize: '20px',
                        fontFamily: 'Satoshi, sans-serif',
                        fontWeight: 600,
                        color: '#000',
                        formatter: (val) => val,
                    },
                    total: {
                        show: true,
                        showAlways: true,
                        fontWeight: 600,
                        color: '#000',
                        formatter: (w) => '$100000000000',
                    },
                },
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    responsive: [
        {
            breakpoint: 2600,
            options: {
                chart: {
                    width: 380,
                },
            },
        },
        {
            breakpoint: 640,
            options: {
                chart: {
                    width: 200,
                },
            },
        },
    ],
};

export default optionsPieChart;
