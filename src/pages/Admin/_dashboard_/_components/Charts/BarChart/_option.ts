import { ApexOptions } from 'apexcharts';

export const optionsBarChart = (timeline?: string[]): ApexOptions => {
    return {
        colors: ['#2563EB', '#84CC16'],
        chart: {
            fontFamily: '"Inter", sans-serif',
            type: 'bar',
            height: 400,
            width: '100%',
            stacked: false,
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false,
                },
            },
            background: '#ffffff',
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '60%',
                barHeight: '70%',
                borderRadius: 6,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: false,
            formatter(val: any) {
                return val != null ? val.toLocaleString() : '0';
            },
            style: {
                fontSize: '12px',
                fontWeight: 600,
                colors: ['#333'],
            },
            offsetY: -20,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
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
                    fontSize: '10px',
                    fontWeight: 400,
                },
            },
        },
        yaxis: [
            {
                title: {
                    text: 'Đơn hàng',
                    style: {
                        color: '#2563EB',
                        fontSize: '14px',
                        fontWeight: 600,
                    },
                },
                labels: {
                    formatter(value: any) {
                        return value != null ? value.toLocaleString() : '0';
                    },
                    style: {
                        colors: '#64748B',
                    },
                },
            },
            {
                opposite: true,
                title: {
                    text: 'Doanh thu',
                    style: {
                        color: '#84CC16',
                        fontSize: '14px',
                        fontWeight: 600,
                    },
                },
                labels: {
                    formatter(value: any) {
                        return value != null ? `${value.toLocaleString()} đ` : '0 đ';
                    },
                    style: {
                        colors: '#64748B',
                    },
                },
            },
        ],
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            markers: {radius: 99}
        },
        fill: {
            opacity: 1,
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 0.85,
                stops: [50, 100],
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter(val: any) {
                    return val != null ? `${val.toLocaleString()}` : '0';
                },
            },
        },
        grid: {
            borderColor: '#E2E8F0',
            strokeDashArray: 4,
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        theme: {
            mode: 'light',
            palette: 'palette1',
            monochrome: {
                enabled: false,
                color: '#255aee',
                shadeTo: 'light',
                shadeIntensity: 0.65,
            },
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    chart: {
                        height: 350,
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '60%',
                        },
                    },
                },
            },
        ],
    };
};
